"use client";
import { useEffect, useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import {
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  ArrowBigRightDash,
  Loader,
  Loader2,
  RefreshCw,
  RotateCcw,
  UploadCloud,
  GripVertical,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getAllUserTokenSlots,
  getTokenSlots,
  updatePoints,
  updateTokenSlotsOrder, // Add this utility for order updates (implement in @/lib/utilityFunction)
} from "@/lib/utilityFunction";
import { formatKST } from "@/lib/formatKST";
import LoadingSpinner from "../LoadingSpinner";
import { useLanguage } from "@/contexts/language-context";

const initialSlots = [
  {
    _id: "1",
    id: 1,
    tokenName: "GLM",
    pointRatio: "$GLM",
    isConfigured: true,
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png",
    order: 1,
  },
  ...Array.from({ length: 49 }, (_, i) => ({
    _id: (i + 2).toString(),
    id: i + 2,
    tokenName: "BTC",
    pointRatio: "$???",
    isConfigured: false, // Default to false for unconfigured slots
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png",
    order: i + 2,
  })),
];

export default function PointExchangeManagement() {
  const { t } = useLanguage();
  const [tokenSlots, setTokenSlots] = useState(initialSlots);
  const [submitting, setSubmitting] = useState(false);
  const [rawFile, setRawFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [, setAllTokenSlots] = useState([]);
  const [points, setPoints] = useState(1000);
  const [tokensAmount, setTokensAmount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [sortedUsers, setSortedUsers] = useState([]);
  const [activeSort, setActiveSort] = useState(t("default"));
  const [configData, setConfigData] = useState({
    link: "",
    tokenName: "",
    pointRatio: "",
    logoFile: null,
  });

  // Determine if drag mode is enabled (price or popularity)
  const isDraggableMode = activeSort !== t("default");

  // dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Prevents accidental drags
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  const getUserProfileDetails = async () => {
    try {
      setIsLoading(true);
      const userInfo = JSON.parse(localStorage.getItem("user"));
      let userSlots = await getTokenSlots(userInfo._id);
      const allUserSlots = await getAllUserTokenSlots();

      // Ensure all slots have _id and order; fallback if not
      userSlots = userSlots.map((slot, index) => ({
        ...slot,
        _id: slot._id || slot.id?.toString() || `slot-${index}`,
        order: slot.order !== undefined ? slot.order : index + 1,
      })).sort((a, b) => a.order - b.order);

      setAllTokenSlots(allUserSlots);
      setTokenSlots(userSlots);

      const sorted = [...allUserSlots].sort(
        (a, b) =>
          new Date(b.createdAt ?? b.joinDate) -
          new Date(a.createdAt ?? a.joinDate)
      );
      setSortedUsers(sorted);
    } catch (error) {
      console.error("Failed to fetch user profile details", error);
    } finally {
      setIsLoading(false);
    }
  };

  // dnd-kit handleDragEnd
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setTokenSlots((items) => {
        const oldIndex = items.findIndex((item) => item._id === active.id);
        const newIndex = items.findIndex((item) => item._id === over.id);
        const newSlots = arrayMove(items, oldIndex, newIndex);

        // Update orders
        newSlots.forEach((slot, index) => {
          slot.order = index + 1;
        });

        // Persist to backend
        (async () => {
          try {
            const userInfo = JSON.parse(localStorage.getItem("user"));
            await updateTokenSlotsOrder(userInfo._id, newSlots.map(s => ({ slotId: s._id, order: s.order })));
            toast.success("Token slots reordered successfully!");
            // No need to refetch if local state is updated correctly
          } catch (error) {
            console.error("Failed to update order:", error);
            toast.error("Reorder failed—reverting.");
            await getUserProfileDetails(); // Revert on error
          }
        })();

        return newSlots;
      });
    }
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setConfigData({
      link: slot.link || "",
      tokenName: slot.tokenName || "",
      pointRatio: slot.pointRatio?.toString() || "",
      logoFile: slot?.img || null,
    });
    setConfigDialogOpen(true);
  };

  const handleSaveConfig = async () => {
    setSubmitting(true);

    try {
      let imageUrl = "";

      if (rawFile) {
        const formDataImage = new FormData();
        formDataImage.append("file", rawFile);

        const imageRes = await fetch(
          "https://dropquest-qd-backend.onrender.com/api/v1/upload",
          {
            method: "POST",
            body: formDataImage,
          }
        );

        const imageData = await imageRes.json();
        imageUrl = imageData.url;
      }

      if (!configData.link) {
        toast.error("Please fill in all required fields");
        setSubmitting(false);
        return;
      }
      if (!configData.tokenName) {
        toast.error("Please fill in all required fields");
        setSubmitting(false);
        return;
      }
      if (isNaN(points) || points <= 0) {
        toast.error("Please enter a valid point ratio");
        setSubmitting(false);
        return;
      }
      if (isNaN(tokensAmount) || tokensAmount <= 0) {
        toast.error("Please enter a valid token amount");
        setSubmitting(false);
        return;
      }
      await updatePoints(
        configData.link,
        configData.tokenName,
        selectedSlot,
        Number(tokensAmount),
        Number(points),
        imageUrl
      );
      await getUserProfileDetails();

      toast.success("Token slot configured successfully");
      setConfigDialogOpen(false);
      setSubmitting(false);
      setSelectedSlot(null);
      setConfigData({ link: "", tokenName: "", pointRatio: "", logoFile: null });
      setRawFile(null);
      setUploadedFile(null);
    } catch (error) {
      console.error("Error uploading image or updating slot:", error);
      toast.error("Failed to configure token slot. Please try again.");
      setSubmitting(false);
    }
  };

  const handleReset = async () => {
    setSubmitting(true);
   
    await updatePoints(" ", "???", selectedSlot, Number(tokensAmount), Number(points));

    await getUserProfileDetails();

    toast.success("Token slot reset successfully");
    setConfigDialogOpen(false);
    setSubmitting(false);
    setSelectedSlot(null);
    setConfigData({ link: "", tokenName: "", pointRatio: "", logoFile: null });
    setRawFile(null);
    setUploadedFile(null);
  };

  const sortOptions = [
    { label: t("default") },
    { label: t("price"), icon: "🔥" },
    { label: t("popularity"), icon: "🔥" },
  ];

  const handleSortChange = (label) => {
    setActiveSort(label);
    // No actual sorting; just toggle draggable mode
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(URL.createObjectURL(file));
      setRawFile(file);
    }
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    await getUserProfileDetails(); // Actual refresh instead of timeout
    setIsLoading(false);
  };

  // SortableItem component for dnd-kit
  function SortableItem({ id, token, disabled }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id, disabled });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`w-[calc((100%-4.5rem)/10)]`}
      >
        <Card
          {...attributes}
          {...listeners}
          className={`transition-all duration-200 flex flex-col items-center justify-center relative ${
            token.isConfigured
              ? "bg-main py-2 border-gray-400 hover:bg-gray-600"
              : "bg-gray-900 border-gray-800 hover:bg-gray-800 cursor-not-allowed opacity-50"
          } ${isDragging ? "shadow-2xl scale-105 z-50 ring-2 ring-blue-500" : ""} ${
            !isDraggableMode ? "cursor-default" : "cursor-pointer"
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (!disabled && !isDragging) handleSlotClick(token);
          }}
        >
          <CardContent className="px-1 text-center w-full flex flex-col items-center">
            {token.isConfigured ? (
              <>
                <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center relative">
                  <img
                    src={token?.img}
                    alt={token.tokenName}
                    className="rounded-full w-full h-full object-cover"
                  />
                  {isDraggableMode && !disabled && (
                    <GripVertical className="absolute -top-1 -right-1 w-4 h-4 text-gray-400 cursor-grab active:cursor-grabbing" />
                  )}
                </div>
                <p className="text-base bg-blue-700 text-white font-semibold rounded-full px-2 py-1">
                  ${token.tokenName}
                </p>
              </>
            ) : (
              <>
                <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-gray-600">?</span>
                </div>
                <p className="text-gray-600">NONE</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    );
  };

  // Skeleton renderer (flex layout for consistency)
  const renderSkeleton = () => (
    <div className="flex flex-wrap gap-2">
      {Array.from({ length: 50 }).map((_, index) => (
        <Card
          key={index}
          className="bg-gray-800 border-gray-700 animate-pulse cursor-not-allowed w-[calc((100%-4.5rem)/10)]"
        >
          <CardContent className="px-1 text-center">
            <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full"></div>
            <p className="h-4 w-10 bg-gray-600 rounded mx-auto"></p>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const memoizedSlots = useMemo(() => tokenSlots, [tokenSlots]);

  return (
    <div className="space-x-2 flex w-full">
      {/* Token Slots Configuration */}
      <Card className="bg-main py-5 border-gray-700 w-[70%]">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-white">
              Token Slots Configuration
            </CardTitle>
            <CardDescription className="text-gray-300 font-bold text-lg">
              {isDraggableMode 
                ? `Drag to reorder the 50 token slots available for point exchange (${activeSort} mode)` 
                : "Configure the 50 token slots available for point exchange (default mode - reordering disabled)"
              }
            </CardDescription>
          </div>
          <div className="space-y-1">
            <div className="w-full flex justify-between">
              <div className="w-[80%] mr-2">
                <button className="px-5 w-full border font-bold bg-green-700 py-1 rounded-2xl cursor-pointer">
                  Token Save
                </button>
              </div>
              <div className="w-[10%] flex items-center justify-center">
                <button
                  onClick={handleRefresh}
                  disabled={isLoading}
                  className="bg-blue-600 px-2 py-2 rounded-full hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw
                    className={`w-5 h-5 ${isLoading ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
            <div className="flex gap-1.5">
              {sortOptions.map((option) => (
                <button
                  key={option.label}
                  className={`flex items-center gap-2 ${
                    activeSort === option.label
                      ? "bg-blue-600 border-blue-600 border"
                      : "bg-gray-400/50 border-gray-700 hover:bg-gray-700"
                  } text-white text-lg font-bold py-0.5 mx-auto my-2 rounded-md cursor-pointer transition-colors border border-white px-5`}
                  onClick={() => handleSortChange(option.label)}
                >
                  <span>{option.label}</span>
                  {option.icon && (
                    <span className="text-base">{option.icon}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            renderSkeleton()
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={memoizedSlots.map((s) => s._id)}
                strategy={rectSortingStrategy}
              >
                <div className="flex flex-wrap gap-2 w-full min-h-[400px]">
                  {memoizedSlots.map((token) => (
                    <SortableItem
                      key={token._id}
                      id={token._id}
                      token={token}
                      disabled={!isDraggableMode || !token.isConfigured}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </CardContent>
      </Card>

      {/* Exchange Application History */}
      <Card className="bg-main py-5 border-gray-700 w-[30%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Point Exchange Application History
          </CardTitle>
          <CardDescription className="text-gray-300">
            Recent point exchange requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center py-10">
              <div className="flex justify-center items-center">
                <Loader className="animate-spin w-8 h-8 text-white" />
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-gray-700 overflow-y-auto h-[600px]">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-700">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white">Telegram</TableHead>
                    <TableHead className="text-white">Token</TableHead>
                    <TableHead className="text-white">Points</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedUsers?.map((exchange) => (
                    <TableRow
                      key={exchange?._id}
                      className="hover:bg-gray-700 text-white"
                    >
                      <TableCell className="font-medium">
                        {exchange?.userId?.name}
                      </TableCell>
                      <TableCell>{exchange?.userId?.telegramId}</TableCell>
                      <TableCell>{exchange?.tokenName}</TableCell>
                      <TableCell>
                        {exchange?.pointExchanged.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        className="px-16"
      >
        <DialogContent className="bg-main text-white border-gray-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white text-lg">
              Configure Token Slot {selectedSlot?.id || selectedSlot?._id}
            </DialogTitle>
            <DialogDescription className="text-gray-50 text-lg font-semibold">
              Set up the token information for this slot
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mb-6">
            <div className="flex w-full justify-between items-start">
              <div className="border border-dashed border-gray-500 p-4 rounded-md bg-gray-800 cursor-pointer relative group hover:border-blue-400 flex-1 mr-4 max-w-md">
                <Label htmlFor="logo" className="text-white mb-2 text-base block">
                  Logo Upload:
                </Label>
                <label className="w-full flex flex-col items-center justify-center text-center text-gray-300 cursor-pointer">
                  <UploadCloud className="w-8 h-8 mb-2 text-gray-900 group-hover:text-blue-400" />
                  <span className="text-sm">Click to upload image (JPG/PNG)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
              <div className="w-40 h-40 bg-transparent border border-gray-200 flex items-center justify-center rounded-lg overflow-hidden shrink-0">
                {uploadedFile ? (
                  <img
                    src={uploadedFile}
                    alt="Uploaded Preview"
                    className="w-full h-full rounded border border-blue-600 object-cover"
                  />
                ) : configData.logoFile ? (
                  <img
                    src={configData.logoFile}
                    alt="Current Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="link" className="text-white mb-2 text-xl">
                Link
              </Label>
              <Input
                id="link"
                value={configData.link}
                onChange={(e) =>
                  setConfigData({ ...configData, link: e.target.value })
                }
                placeholder="Enter token link (e.g., contract address)"
                className="bg-gray-900 border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="tokenName" className="text-white mb-2 text-xl">
                Token Name
              </Label>
              <Input
                id="tokenName"
                value={configData.tokenName}
                onChange={(e) =>
                  setConfigData({ ...configData, tokenName: e.target.value })
                }
                placeholder="e.g., GLM"
                className="bg-gray-900 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label
                htmlFor="ratio"
                className="text-white font-semibold mb-2 text-2xl"
              >
                Point Ratio Setting:
              </Label>
              <div className="flex items-center space-x-4 w-full justify-center mb-4">
                <div className="bg-blue-800 border border-slate-400 px-6 py-2 text-2xl text-white rounded-sm">
                  {tokensAmount} Token
                </div>
                <ArrowBigRightDash className="w-6 h-6" />
                <div className="bg-blue-700 px-6 py-2 text-2xl border border-slate-400 text-white rounded-sm">
                  <span className="px-4 py-1 font-semibold bg-white mr-2 text-black rounded">
                    ${points.toLocaleString()}
                  </span>
                  Points
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full justify-center">
                <Input
                  type="number"
                  value={tokensAmount}
                  onChange={(e) => setTokensAmount(e.target.value)}
                  placeholder="Tokens (e.g., 1)"
                  className="bg-gray-700 border-gray-600 text-white w-32"
                  min="1"
                />
                <Input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Points (e.g., 1000)"
                  className="bg-gray-700 border-gray-600 text-white w-32"
                  min="1"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="space-x-6 w-full flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-white hover:bg-blue-700 bg-blue-600 border cursor-pointer w-36"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </>
              )}
            </Button>
            <Button
              onClick={handleSaveConfig}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-36"
              disabled={submitting}
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Set"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}





































































































// "use client";
// import { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Badge } from "@/components/ui/badge";
// import {
//   ArrowBigRightDash,
//   Loader,
//   Loader2,
//   RefreshCw,
//   RotateCcw,
//   UploadCloud,
// } from "lucide-react";
// // import Image from "next/image"
// import toast from "react-hot-toast";
// import {
//   getAllUserTokenSlots,
//   getTokenSlots,
//   updatePoints,
// } from "@/lib/utilityFunction";
// import { formatKST } from "@/lib/formatKST";
// import LoadingSpinner from "../LoadingSpinner";
// import { useLanguage } from "@/contexts/language-context";

// const initialSlots = [
//   {
//     id: 1,
//     tokenName: "GLM",
//     pointRatio: "$GLM",
//     isConfigured: true,
//     img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png",
//   },
//   ...Array.from({ length: 49 }, (_, i) => ({
//     id: i + 2,
//     tokenName: "BTC",
//     // pointRatio: Math.floor(Math.random() * 100) + 1, // random points
//     pointRatio: "$???", // random points
//     isConfigured: true,
//     img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png",
//   })),
// ];

// export default function PointExchangeManagement() {
//   const { t } = useLanguage();
//   const [tokenSlots, setTokenSlots] = useState(initialSlots);
//   const [submitting, setSubmitting] = useState(false);
//   const [rawFile, setRawFile] = useState(null);
//   const [uploadedFile, setUploadedFile] = useState(null);

//   const [configDialogOpen, setConfigDialogOpen] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [, setAllTokenSlots] = useState([]);
//   const [points, setPoints] = useState(1000);
//   const [tokensAmount, setTokensAmount] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sortedUsers, setSortedUsers] = useState([]);
//   const [activeSort, setActiveSort] = useState("Default");
//   const [configData, setConfigData] = useState({
//     link: "",
//     tokenName: "",
//     pointRatio: "",
//     logoFile: null,
//   });

//   useEffect(() => {
//     getUserProfileDetails();
//   }, []);

//   const getUserProfileDetails = async () => {
//     try {
//       setIsLoading(true); // Start spinner
//       const userInfo = JSON.parse(localStorage.getItem("user"));
//       const userSlots = await getTokenSlots(userInfo._id);
//       const allUserSlots = await getAllUserTokenSlots();

//       setAllTokenSlots(allUserSlots);
//       setTokenSlots(userSlots);

//       // Optional: Sort users by most recent
//       const sorted = [...allUserSlots].sort(
//         (a, b) =>
//           new Date(b.createdAt ?? b.joinDate) -
//           new Date(a.createdAt ?? a.joinDate)
//       );
//       setSortedUsers(sorted);
//     } catch (error) {
//       console.error("Failed to fetch user profile details", error);
//     } finally {
//       setIsLoading(false); // Stop spinner
//     }
//   };

//   const handleSlotClick = (slot) => {
//     setSelectedSlot(slot);
//     setConfigData({
//       link: slot.link || "",
//       tokenName: slot.tokenName || "",
//       pointRatio: slot.pointRatio?.toString() || "",
//       logoFile: slot?.img ? slot.img : null,
//     });
//     setConfigDialogOpen(true);
//   };

//   const handleSaveConfig = async () => {
//     setSubmitting(true);

//     try {
//       let imageUrl = "";

//       if (rawFile) {
//         // Create FormData for image
//         const formDataImage = new FormData();
//         formDataImage.append("file", rawFile);

//         // Upload to backend (you’ll create this endpoint below)
//         const imageRes = await fetch(
//           "https://dropquest-qd-backend.onrender.com/api/v1/upload",
//           // "http://localhost:3000/api/v1/upload",
//           {
//             method: "POST",
//             body: formDataImage,
//           }
//         );

//         const imageData = await imageRes.json();
//         imageUrl = imageData.url; // Get the Cloudinary URL
//         console.log("🚀 ~ handleSaveConfig ~ imageUrl:", imageUrl);
//       }

//       if (!configData.link) {
//         toast.error("Please fill in all required fields");
//         setSubmitting(false);
//         return;
//       }
//       if (!configData.tokenName) {
//         toast.error("Please fill in all required fields");
//         setSubmitting(false);
//         return;
//       }
//       // const pointRatio = parseInt(configData.pointRatio);
//       if (isNaN(points) || points <= 0) {
//         toast.error("Please enter a valid point ratio");
//         return;
//       }
//       if (isNaN(tokensAmount) || tokensAmount <= 0) {
//         toast.error("Please enter a valid point ratio");
//         return;
//       }
//       await updatePoints(
//         configData.link,
//         configData.tokenName,
//         selectedSlot,
//         tokensAmount,
//         points,
//         imageUrl
//       );
//       await getUserProfileDetails();

//       toast.success("Token slot configured successfully");
//       setConfigDialogOpen(false);
//       setSubmitting(false);
//       setSelectedSlot(null);
//       setConfigData({ tokenName: "", pointRatio: "", logoFile: null });
//     } catch (error) {
//       console.error("Error uploading image or updating slot:", error);
//       toast.error("Failed to configure token slot. Please try again.");
//       setSubmitting(false);
//     }
//   };

//   const handleReset = async () => {
//     setSubmitting(true);
//     console.log(
//       "   🚀 ~ handleReset ~ configData.tokenName:",
//       configData.tokenName
//     );
//     await updatePoints(" ", "???", selectedSlot, tokensAmount, points);

//     await getUserProfileDetails();

//     toast.success("Token slot configured successfully");
//     setConfigDialogOpen(false);
//     setSubmitting(false);
//     setSelectedSlot(null);
//     setConfigData({ tokenName: "", pointRatio: "", logoFile: null });
//   };

//   const sortOptions = [
//     { label: t("default") },
//     { label: t("price"), icon: "🔥" },
//     { label: t("popularity"), icon: "🔥" },
//   ];

//   const handleSortChange = (label) => {
//     setActiveSort(label);
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedFile(URL.createObjectURL(file));
//       setRawFile(file); // store the actual file
//     }
//   };

//    const handleRefresh = () => {
//     setIsLoading(true);
//     setTimeout(() => setIsLoading(false), 1000);
//   };

//   // const sortedUsers = allTokenSlots.sort((a, b) => {
//   //   const dateA = new Date(a.createdAt ?? a.joinDate);
//   //   const dateB = new Date(b.createdAt ?? b.joinDate);
//   //   return dateB - dateA; // most recent first
//   // } )

//   return (
//     <div className="space-x-2 flex w-full">
//       {/* Token Slots Configuration */}
//       <Card className="bg-main py-5 border-gray-700 w-[70%]  ">
//         <CardHeader className="flex justify-between">
//           <div>
//             <CardTitle className="text-2xl font-bold text-white">
//               Token Slots Configuration
//             </CardTitle>
//             <CardDescription className="text-gray-300 font-bold text-lg">
//               Configure the 50 token slots available for point exchange
//             </CardDescription>
//           </div>
//           <div className="space-y-1">
//             <div className="w-full flex justify-between ">
//               <div className="w-[80%] mr-2">
//                 <button className="px-5 w-full border font-bold bg-green-700 py-1 rounded-2xl cursor-pointer">
//                   Token Save
//                 </button>{" "}
//               </div>
//               <div className="w-[10%] flex items-center justify-center">
//                 <button
//                   onClick={handleRefresh}
//                   disabled={isLoading}
//                   className=" bg-blue-600  px-2 py-2 rounded-full hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
//                 >
//                   <RefreshCw
//                     className={`w-5 h-5 ${
//                       isLoading ? "animate-spin" : ""
//                     }`}
//                   />
//                 </button>
//               </div>
//             </div>
//             <div className="flex gap-1.5">
//               {sortOptions.map((option) => (
//                 <button
//                   key={option.label}
//                   className={`flex items-center gap-2 ${
//                     activeSort === option.label
//                       ? "bg-blue-600 border-blue-600 border"
//                       : "bg-gray-400/50 border-gray-700 hover:bg-gray-700"
//                   } text-white text-lg font-bold py-0.5 mx-auto my-2 rounded-md cursor-pointer transition-colors border border-white px-5`}
//                   onClick={() => handleSortChange(option.label)}
//                 >
//                   <span>{option.label}</span>
//                   {option.icon && (
//                     <span className="text-base">{option.icon}</span>
//                   )}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-10 gap-2">
//             {isLoading
//               ? // Skeleton placeholders while loading
//                 Array.from({ length: 20 }).map((_, index) => (
//                   <Card
//                     key={index}
//                     className="bg-gray-800 border-gray-700 animate-pulse cursor-not-allowed"
//                   >
//                     <CardContent className="px-1 text-center">
//                       <div className="w-12 h-12 mx-auto mb-2 bg-gray-700 rounded-full"></div>
//                       <p className="h-4 w-10 bg-gray-600 rounded mx-auto"></p>
//                     </CardContent>
//                   </Card>
//                 ))
//               : // Actual token slots
//                 tokenSlots?.map((token) => (
//                   <Card
//                     key={token._id}
//                     className={`cursor-pointer transition-all duration-200 ${
//                       token.isConfigured
//                         ? "bg-main py-2 border-gray-400 hover:bg-gray-600"
//                         : "bg-gray-900 border-gray-800 hover:bg-gray-800"
//                     }`}
//                     onClick={() => handleSlotClick(token?._id)}
//                   >
//                     <CardContent className="px-1 text-center">
//                       {token.isConfigured ? (
//                         <>
//                           <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
//                             <img
//                               src={token?.img}
//                               alt={token.tokenName}
//                               className="rounded-full w-full h-full object-cover"
//                             />
//                           </div>
//                           <p className="text-base bg-blue-700 text-white font-semibold rounded-full">
//                             ${token.tokenName}
//                           </p>
//                         </>
//                       ) : (
//                         <>
//                           <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
//                             <span className="text-gray-600">?</span>
//                           </div>
//                           <p className="text-gray-600">NONE</p>
//                         </>
//                       )}
//                     </CardContent>
//                   </Card>
//                 ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Exchange Application History */}
//       <Card className="bg-main py-5 border-gray-700 w-[30%]">
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold text-white">
//             Point Exchange Application History
//           </CardTitle>
//           <CardDescription className="text-gray-300">
//             Recent point exchange requests from users
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="flex justify-center items-center py-10">
//               <div className="flex justify-center items-center">
//                 <Loader className="animate-spin w-8 h-8 text-white" />
//               </div>
//             </div>
//           ) : (
//             <div className="rounded-lg border border-gray-700 overflow-y-auto h-[600px]">
//               <Table>
//                 <TableHeader>
//                   <TableRow className="bg-gray-700">
//                     <TableHead className="text-white">Name</TableHead>
//                     <TableHead className="text-white">Telegram</TableHead>
//                     <TableHead className="text-white">Token</TableHead>
//                     <TableHead className="text-white">Points</TableHead>
//                     {/* <TableHead className="text-white">Status</TableHead> */}
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {sortedUsers?.map((exchange) => (
//                     <TableRow
//                       key={exchange?._id}
//                       className="hover:bg-gray-700 text-white"
//                     >
//                       <TableCell className="font-medium">
//                         {exchange?.userId?.name}
//                       </TableCell>
//                       <TableCell>{exchange?.userId?.telegramId}</TableCell>
//                       <TableCell>{exchange?.tokenName}</TableCell>
//                       <TableCell>
//                         {exchange?.pointExchanged.toLocaleString()}
//                       </TableCell>
//                       {/* <TableCell>
//                         {exchange?.createdAt
//                           ? formatKST(exchange.createdAt).toLocaleString(
//                               "en-US",
//                               {
//                                 dateStyle: "short",
//                                 timeStyle: "short",
//                               }
//                             )
//                           : "N/A"}
//                       </TableCell> */}
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       {/* Configuration Dialog */}
//       <Dialog
//         open={configDialogOpen}
//         onOpenChange={setConfigDialogOpen}
//         className=" px-16"
//       >
//         <DialogContent className="bg-main text-white border-gray-700">
//           <DialogHeader>
//             <DialogTitle className="text-white text-lg">
//               Configure Token Slot {selectedSlot?.id}
//             </DialogTitle>
//             <DialogDescription className="text-gray-50 text-lg font-semibold">
//               Set up the token information for this slot
//             </DialogDescription>
//           </DialogHeader>

//           <div className="space-y-2 mb-6">
//             <div className="flex w-full justify-between">
//               <div className="border border-dashed border-gray-500 p-4 rounded-md bg-gray-800 cursor-pointer relative group hover:border-blue-400">
//                 <Label htmlFor="logo" className="text-white mb-2 text-base">
//                   Logo Upload:
//                 </Label>
//                 <label className="w-full flex flex-col items-center justify-center text-center text-gray-300 cursor-pointer">
//                   <UploadCloud className="w-8 h-8 mb-2 text-gray-900 group-hover:text-blue-400" />
//                   <span className="text-sm">
//                     Click to upload image (JPG/PNG)
//                   </span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                     required
//                   />
//                 </label>
//               </div>
//               <div className="mb-2 w-30 h-30 bg-transparent border border-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
//                 {uploadedFile ? (
//                   <div className="mt-3">
//                     <img
//                       src={uploadedFile}
//                       alt="Uploaded"
//                       className="w-40 h-auto rounded border border-blue-600"
//                     />
//                   </div>
//                 ) : (
//                   <img
//                     src={
//                       configData.tokenName === "GLM"
//                         ? "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png"
//                         : "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png"
//                     }
//                     alt="image"
//                   />
//                 )}
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="logo" className="text-white mb-2 text-xl">
//                 Link
//               </Label>
//               <Input
//                 id="Link"
//                 value={configData.link}
//                 onChange={(e) =>
//                   setConfigData({ ...configData, link: e.target.value })
//                 }
//                 placeholder="Link"
//                 className="bg-gray-900 border-gray-600 text-white"
//               />
//             </div>
//             <div>
//               <Label htmlFor="logo" className="text-white mb-2 text-xl">
//                 Token Name
//               </Label>
//               <Input
//                 id="tokenName"
//                 value={configData.tokenName}
//                 onChange={(e) =>
//                   setConfigData({ ...configData, tokenName: e.target.value })
//                 }
//                 placeholder="e.g., GLM"
//                 className="bg-gray-900 border-gray-600 text-white"
//               />
//             </div>

//             <div>
//               <Label
//                 htmlFor="logo"
//                 className="text-white font-semibold mb-2 text-2xl"
//               >
//                 Point Ratio setting :
//               </Label>
//               <div className="flex items-center space-x-4 w-full justify-center">
//                 <div className="bg-blue-800 border border-slate-400  px-6 py-2 text-2xl text-white rounded-sm">
//                   {" "}
//                   {tokensAmount}
//                   Token
//                 </div>
//                 <ArrowBigRightDash />
//                 <div className="bg-blue-700 px-6 py-2 text-2xl border border-slate-400 text-white rounded-sm">
//                   {" "}
//                   <span className=" px-4 py-1 font-semibold bg-white mr-2 text-black ">
//                     ${points.toLocaleString()}
//                   </span>{" "}
//                   Points
//                 </div>
//               </div>
//               <div className="flex items-center space-x-4 w-full justify-center mt-8">
//                 <Input
//                   id="pointRatio"
//                   type="number"
//                   // value={configData.pointRatio}
//                   onChange={(e) => setTokensAmount(e.target.value)}
//                   placeholder="e.g., 1000"
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//                 <Input
//                   id="pointRatio"
//                   type="number"
//                   // value={configData.pointRatio}
//                   onChange={(e) => setPoints(e.target.value)}
//                   placeholder="e.g., 1000"
//                   className="bg-gray-700 border-gray-600 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           <DialogFooter
//             className={"space-x-6 w-full flex items-center justify-between"}
//           >
//             <Button
//               variant="outline"
//               onClick={handleReset}
//               className="text-white hover:bg-blue-700 bg-blue-600 border cursor-pointer w-36"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <RotateCcw className="w-4 h-4 mr-2 " />
//                   "Reset"
//                 </>
//               )}
//             </Button>
//             {/* <Button
//               variant="outline"
//               onClick={() => setConfigDialogOpen(false)}
//               className="border-gray-600 text-blue-600 hover:bg-gray-700"
//             >
//               Cancel
//             </Button> */}
//             <Button
//               onClick={handleSaveConfig}
//               className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-36"
//             >
//               {submitting ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Processing...
//                 </>
//               ) : (
//                 "Set"
//               )}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
