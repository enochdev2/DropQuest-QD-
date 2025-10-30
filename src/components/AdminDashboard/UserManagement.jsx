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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2, Loader } from "lucide-react";
import { getAllUser } from "@/lib/utilityFunction";
import { SuccessToast } from "../Success";

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rawFile, setRawFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    telegramId: "",
    referredByEmail: "",
    walletAddress: "",
    img: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Kim",
      email: "kim@example.com",
      phone: "010-1234-5678",
      telegramId: "@johnkim",
      points: 1000000,
      joinDate: "2024-01-10",
      walletAddress: "",
    },
    {
      id: 2,
      name: "Mike Park",
      email: "park@example.com",
      phone: "010-2345-6789",
      telegramId: "@mikepark",
      points: 6000,
      joinDate: "2024-01-12",
      walletAddress: "",
    },
    {
      id: 3,
      name: "Sarah Lee",
      email: "lee@example.com",
      phone: "010-3456-7890",
      telegramId: "@sarahlee",
      points: 4500,
      joinDate: "2024-01-15",
      walletAddress: "",
    },
    {
      id: 4,
      name: "David Choi",
      email: "choi@example.com",
      phone: "010-4567-8901",
      telegramId: "@davidchoi",
      points: 3200,
      joinDate: "2024-01-18",
      walletAddress: "",
    },
  ]);

  useEffect(() => {
    getTotalUsers();
  }, []);

  const getTotalUsers = async () => {
    const user = await getAllUser();
    console.log("🚀 ~ getUserProfileDetails ~ user:", user);
    setUsers(user);
    // setTotalPoints(user.totalPoints);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      telegramId: user.telegramId,
      referredByEmail: user.referredByEmail,
      walletAddress: user.walletAddress || "",
      img: user.img || "",
    });
    setEditDialogOpen(true);
  };

  // const handleSaveEdit = () => {
  //   if (selectedUser) {
  //     setUsers(
  //       users.map((user) =>
  //         user.id === selectedUser.id ? { ...user, ...editFormData } : user
  //       )
  //     );
  //     setEditDialogOpen(false);
  //     setSelectedUser(null);
  //   }
  // };

  const handleSaveEdit = async () => {
    let imageUrl = editFormData.img; // default to existing image

    setIsLoading(true);
    try {
      // Upload new image if selected
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
        imageUrl = imageData.url; // use Cloudinary URL
        console.log("🚀 ~ handleSaveEdit ~ imageUrl:", imageUrl);
      }

      // ✅ Build the updated user object
      const updatedUser = {
        ...editFormData,
        img: imageUrl,
      };

      // ✅ Call your backend API to update user
      console.log("🚀 ~ handleSaveEdit ~ selectedUser.id:", selectedUser);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://dropquest-qd-backend.onrender.com/api/v1/user/users/${selectedUser.email}`,
        // `http://localhost:3000/api/v1/user/users/${selectedUser.email}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update user on server");
      }

      const updatedUserFromServer = await response.json();

      // ✅ Update the local state (so UI stays in sync)
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? updatedUserFromServer : user
        )
      );

      SuccessToast("updated user successfully");

      // ✅ Clear everything
      setEditFormData({
        name: "",
        email: "",
        phone: "",
        telegramId: "",
        referredByEmail: "",
        walletAddress: "",
        img: "",
      });
      setRawFile(null);
      // if (fileInputRef.current) fileInputRef.current.value = "";

      getTotalUsers();
      window.location.reload();
      setEditDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    } finally {
      setIsLoading(false); // Stop spinner
    }
  };

  const sortedUsers = filteredUsers.sort((a, b) => {
    const dateA = new Date(a.createdAt ?? a.joinDate);
    const dateB = new Date(b.createdAt ?? b.joinDate);
    return dateB - dateA; // most recent first
  });

  return (
    <Card className="bg-main -gradient-to-r from-sky-50/10 to-blue-50/10 py-5  shadow-xl brder-slate-200">
      <CardHeader className="bg-gradient-to-r from-cyan-50/5 to-blue-50/5 rounded-t-lg">
        <CardTitle
          className="text-3xl font-bold text-slate-100"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          User Management
        </CardTitle>
        <CardDescription
          className="text-slate-100 text-lg font-medium"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Effortlessly manage users and their activities with streamlined
          operations
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-100 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 transition-all text-white text-xl  duration-300"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Create a new user account for the platform.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input id="email" type="email" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">
                    Phone
                  </Label>
                  <Input id="phone" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="telegram" className="text-right">
                    Telegram ID
                  </Label>
                  <Input id="telegram" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="referredByEmail" className="text-right">
                    referred By Email 
                  </Label>
                  <Input id="referredByEmail" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white">
                  Create User
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-slate-800">
                Edit User
              </DialogTitle>
              <DialogDescription className="text-slate-600">
                Update user information and settings.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right font-medium">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right font-medium">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  value={editFormData.email}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, email: e.target.value })
                  }
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-phone" className="text-right font-medium">
                  Phone
                </Label>
                <Input
                  id="edit-phone"
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, phone: e.target.value })
                  }
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-telegram"
                  className="text-right font-medium"
                >
                  Telegram ID
                </Label>
                <Input
                  id="edit-telegram"
                  value={editFormData.telegramId}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      telegramId: e.target.value,
                    })
                  }
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label
                  htmlFor="edit-telegram"
                  className="text-right font-medium"
                >
                  referred By Email
                </Label>
                <Input
                  id="edit-referredByEmail"
                  value={editFormData.referredByEmail}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      referredByEmail: e.target.value,
                    })
                  }
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-wallet" className="text-right font-medium">
                  Wallet Address
                </Label>
                <Input
                  id="edit-wallet"
                  value={editFormData.walletAddress}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      walletAddress: e.target.value,
                    })
                  }
                  placeholder="Enter wallet address"
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-wallet" className="text-right font-medium">
                  Image
                </Label>
                <div className="w-[340px] h-[200px] border border-slate-300 rounded-md p-1 bg-slate-50">
                  {/* <img src={editFormData.img} alt="" srcset="" className="w-full h-full" /> */}
                  {editFormData.img ? (
                    <img
                      src={editFormData.img}
                      alt="User"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-slate-400 text-sm">
                      No image selected
                    </span>
                  )}
                </div>

                {/* Upload */}
                <Input
                  id="edit-image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setRawFile(file);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setEditFormData({
                          ...editFormData,
                          img: reader.result, // preview
                        });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setEditDialogOpen(false)}
                className="border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                disabled={isLoading}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {isLoading ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="flex justify-center items-center">
                      <Loader className="animate-spin w-8 h-8 text-white" />
                    </div>
                  </div>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-500 to-slate-100">
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Name
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Phone
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Telegram ID
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Join Date
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Wallet Address
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-50/5 transition-all duration-300 text-white font-semib text-[16px]"
                >
                  <TableCell className="font-semibold">
                    {user._id?.slice(20, 23)}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-100">
                    {user.name}
                  </TableCell>
                  <TableCell className="font-semibold">{user.email}</TableCell>
                  <TableCell className={"font-semibold"} >{user.phone}</TableCell>
                  <TableCell className={"font-semibold"}>{user.telegramId}</TableCell>
                  <TableCell className={"font-semibold"}>
                    {new Date(
                      user.createdAt ?? user.joinDate
                    ).toLocaleDateString("en-US")}
                  </TableCell>
                  <TableCell>
                    {user.walletAddress || (
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 font-medium text-slate-600"
                      >
                        Not Set
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditUser(user)}
                        className="hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300 bg-transparent"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 hover:border-red-300 text-red-600 transition-all duration-300 bg-transparent"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
