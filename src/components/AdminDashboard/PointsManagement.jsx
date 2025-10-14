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
import { Search, Award, Loader2 } from "lucide-react";
import { getAllUser, modifyuserPoints } from "@/lib/utilityFunction";
import { UserSearch } from "../UserSearch";
import { SuccessToast } from "../Success";

export default function PointsManagement() {
  const [searchTerm, setSearchTerm] = useState("");

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
  const [selectedUser, setSelectedUser] = useState("");
  const [points, setPoints] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("🚀 ~ PointsManagement ~ users:", users);

  useEffect(() => {
    getTotalUsers();
  }, []);

  const getTotalUsers = async () => {
    const user = await getAllUser();
    console.log("🚀 ~ getUserProfileDetails ~ user:", user);
    setUsers(user);
    // setTotalPoints(user.totalPoints);
  };

  const handleApply = async () => {
    setLoading(true);
    const user = await modifyuserPoints(selectedUser, points);

    const users = await getTotalUsers();
    console.log("🚀 ~ getUserProfileDetails ~ user:", users);
    if (users || user) {
      SuccessToast("Announcement updated successfully");
    }
    setLoading(false);
    setIsModalOpen(false);
    // setUsers(user);
    // setTotalPoints(user.totalPoints);
  };

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-main py-2 from-white/5 to-slate-50/5 shadow-xl border-slate-200/40">
      <CardHeader className="bg-gradient-to-r from-blue-500/10 to-cyan-900 rounded-t-lg">
        <CardTitle
          className="text-3xl font-bold text-slate-100"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Points Management
        </CardTitle>
        <CardDescription
          className="text-slate-100 text-lg font-semibold"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Monitor and adjust user points with ease for better decision-making
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 transition-all duration-300"
            />
          </div>

          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Award className="w-4 h-4 mr-2" />
                Allocate Points
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Allocate Points</DialogTitle>
                <DialogDescription>
                  Grant points for a specific user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-select" className="text-right">
                    User
                  </Label>
                  {/* <select
                    id="user-select"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select user</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.name}
                      </option>
                    ))}
                  </select> */}
                  <UserSearch
                    users={users}
                    selectedUser={selectedUser}
                    setSelectedUser={setSelectedUser}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="points" className="text-right">
                    Points
                  </Label>
                  <Input
                    id="points"
                    type="number"
                    placeholder="Enter points (+ or -)"
                    className="col-span-3"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={handleApply}
                  disabled={loading}
                  className="bg-gradient-to-r cursor-pointer from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white"
                >
                  {loading ? (
                    <>
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        aria-hidden="true"
                      />
                      {/* Saving… */}
                    </>
                  ) : (
                    "Apply Changes"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden text-white shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-500 to-sky-800 ">
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
                  Current Points
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Join Date
                </TableHead>
                {/* <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Actions
                </TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user._id}
                  className="hover:bg-gradient-to-r hover:from-emerald-50/30 hover:to-cyan-50/20 transition-all duration-300 "
                >
                  <TableCell className="font-semibold ">
                    {user._id?.slice(20, 23)}
                  </TableCell>
                  <TableCell className="font-semibold text-slate-100">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-base font-semibold">{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg--to-r from-yellow-50/10 to-amber-50/10 font-bold text-amber-100 border--200/50 text-lg"
                      >
                        {user?.points?.totalPoints?.toLocaleString()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-green-500 font-semibold">
                    {new Date(
                      user.createdAt ?? user.joinDate
                    ).toLocaleDateString("en-US")}
                  </TableCell>
                  {/* <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-green-50 hover:border-green-300 text-green-600 transition-all duration-300 bg-transparent"
                      >
                        Grant
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="hover:bg-red-50 hover:border-red-300 text-red-600 transition-all duration-300 bg-transparent"
                      >
                        Deduct
                      </Button>
                    </div>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
