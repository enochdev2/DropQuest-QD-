"use client";
import { useEffect, useState } from "react";
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
import { ArrowBigRightDash, Loader2, RotateCcw } from "lucide-react";
// import Image from "next/image"
import toast from "react-hot-toast";
import {
  getAllUserTokenSlots,
  getTokenSlots,
  updatePoints,
} from "@/lib/utilityFunction";

const initialSlots = [
  {
    id: 1,
    tokenName: "GLM",
    pointRatio: "$GLM",
    isConfigured: true,
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png",
  },
  ...Array.from({ length: 49 }, (_, i) => ({
    id: i + 2,
    tokenName: "BTC",
    // pointRatio: Math.floor(Math.random() * 100) + 1, // random points
    pointRatio: "$???", // random points
    isConfigured: true,
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png",
  })),
];

export default function PointExchangeManagement() {
  const [tokenSlots, setTokenSlots] = useState(initialSlots);
  const [submitting, setSubmitting] = useState(false);

  const [exchangeHistory] = useState([
    { id: 1, name: "Test1", telegram: "@test1", token: "GLM", points: 1000 },
    { id: 2, name: "Test2", telegram: "@test2", token: "GLM", points: 2000 },
    { id: 3, name: "Test3", telegram: "@test3", token: "GLM", points: 32000 },
  ]);

  const [configDialogOpen, setConfigDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [allTokenSlots, setAllTokenSlots] = useState([]);
  const [points, setPoints] = useState(1000);
  const [tokensAmount, setTokensAmount] = useState(1);
  const [configData, setConfigData] = useState({
    tokenName: "",
    pointRatio: "",
    logoFile: null,
  });

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  const getUserProfileDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const userSlots = await getTokenSlots(userInfo._id);
    const allUserSlots = await getAllUserTokenSlots();
    setAllTokenSlots(allUserSlots);
    setTokenSlots(userSlots);
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
    setConfigData({
      tokenName: slot.tokenName || "",
      pointRatio: slot.pointRatio?.toString() || "",
      logoFile: null,
    });
    setConfigDialogOpen(true);
  };

  const handleSaveConfig = async () => {
    setSubmitting(true);
    if (!configData.tokenName) {
      toast.error("Please fill in all required fields");
      setSubmitting(false);
      return;
    }

    // const pointRatio = parseInt(configData.pointRatio);
    if (isNaN(points) || points <= 0) {
      toast.error("Please enter a valid point ratio");
      return;
    }
    if (isNaN(tokensAmount) || tokensAmount <= 0) {
      toast.error("Please enter a valid point ratio");
      return;
    }

    await updatePoints(
      configData.tokenName,
      selectedSlot,
      tokensAmount,
      points
    );

    await getUserProfileDetails();

    toast.success("Token slot configured successfully");
    setConfigDialogOpen(false);
    setSubmitting(false);
    setSelectedSlot(null);
    setConfigData({ tokenName: "", pointRatio: "", logoFile: null });
  };

  const handleReset = async () => {
    setSubmitting(true);
    await updatePoints(
      configData.tokenName,
      selectedSlot,
      tokensAmount,
      points
    );

    await getUserProfileDetails();

    toast.success("Token slot configured successfully");
    setConfigDialogOpen(false);
    setSubmitting(false);
    setSelectedSlot(null);
    setConfigData({ tokenName: "", pointRatio: "", logoFile: null });
  };

  return (
    <div className="space-x-1 flex w-full">
      {/* Token Slots Configuration */}
      <Card className="bg-gray-800 border-gray-700 w-[70%]  ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Token Slots Configuration
          </CardTitle>
          <CardDescription className="text-gray-300">
            Configure the 50 token slots available for point exchange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-10 gap-2">
            {tokenSlots?.map((token) => (
              <Card
                key={token._id}
                className={`cursor-pointer transition-all duration-200 ${
                  token.isConfigured
                    ? "bg-gray-700 border-gray-600 hover:bg-gray-600"
                    : "bg-gray-900 border-gray-800 hover:bg-gray-800"
                }`}
                onClick={() => handleSlotClick(token?._id)}
              >
                <CardContent className="px-1 text-center">
                  {token.isConfigured ? (
                    <>
                      <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                        <img
                          src={token?.img}
                          alt={token.tokenName}
                          className="rounded-full w-full h-full object-cover"
                        />
                      </div>
                      <p className="text-base bg-blue-700 text-white font-semibold rounded-full">
                        {token.pointRatio}
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
            ))}
          </div>
        </CardContent>
      </Card>
      {/* Exchange Application History */}
      <Card className="bg-gray-800 border-gray-700 w-[30%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">
            Point Exchange Application History
          </CardTitle>
          <CardDescription className="text-gray-300">
            Recent point exchange requests from users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-gray-700 overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-700">
                  <TableHead className="text-white">Name</TableHead>
                  <TableHead className="text-white">Telegram</TableHead>
                  <TableHead className="text-white">Token</TableHead>
                  <TableHead className="text-white">Points</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allTokenSlots?.map((exchange) => (
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
                    <TableCell>
                      <Badge className="bg-green-600 text-white">
                        Completed
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Dialog */}
      <Dialog
        open={configDialogOpen}
        onOpenChange={setConfigDialogOpen}
        className=" px-16"
      >
        <DialogContent className="bg-gray-100 text-black border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-black text-xl">
              Configure Token Slot {selectedSlot?.id}
            </DialogTitle>
            <DialogDescription className="text-gray-950 text-lg font-semibold">
              Set up the token information for this slot
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mb-20">
            <div className="flex w-full justify-between">
              <Label htmlFor="logo" className="text-black mb-2 text-xl">
                Logo Upload:
              </Label>
              <div className="mb-2 w-30 h-30 bg-transparent border border-gray-500 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={
                    configData.tokenName === "GLM"
                      ? "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png"
                      : "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png"
                  }
                  alt="image"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="logo" className="text-black mb-2 text-xl">
                Token Name
              </Label>
              <Input
                id="tokenName"
                value={configData.tokenName}
                onChange={(e) =>
                  setConfigData({ ...configData, tokenName: e.target.value })
                }
                placeholder="e.g., GLM"
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <Label htmlFor="logo" className="text-black mb-2 text-2xl">
                Point Ratio setting :
              </Label>
              <div className="flex items-center space-x-4 w-full justify-center">
                <div className="bg-blue-600 px-6 py-2 text-2xl text-white rounded-sm">
                  {" "}
                  {tokensAmount}
                  Token
                </div>
                <ArrowBigRightDash />
                <div className="bg-blue-600 px-6 py-2 text-2xl text-white rounded-sm">
                  {" "}
                  <span className=" px-4 py-1 font-semibold bg-white mr-2 text-black ">
                    $
                    {points.toLocaleString()}
                  </span>{" "}
                  Points
                </div>
              </div>
              <div className="flex items-center space-x-4 w-full justify-center mt-8">
                <Input
                  id="pointRatio"
                  type="number"
                  // value={configData.pointRatio}
                  onChange={(e) => setTokensAmount(e.target.value)}
                  placeholder="e.g., 1000"
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Input
                  id="pointRatio"
                  type="number"
                  // value={configData.pointRatio}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="e.g., 1000"
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
            </div>
          </div>

          <DialogFooter
            className={"space-x-6 w-full flex items-center justify-between"}
          >
            <Button
              variant="outline"
              onClick={handleReset}
              className="text-white hover:bg-blue-700 bg-blue-600 cursor-pointer w-36"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <RotateCcw className="w-4 h-4 mr-2 " />
                  "Reset"
                </>
              )}
            </Button>
            {/* <Button
              variant="outline"
              onClick={() => setConfigDialogOpen(false)}
              className="border-gray-600 text-blue-600 hover:bg-gray-700"
            >
              Cancel
            </Button> */}
            <Button
              onClick={handleSaveConfig}
              className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-36"
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
