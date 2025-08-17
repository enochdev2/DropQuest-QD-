"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Search, Award } from "lucide-react"

export default function PointsManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  const [users] = useState([
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
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 shadow-xl border-slate-200">
      <CardHeader className="bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-slate-800" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Points Management
        </CardTitle>
        <CardDescription className="text-slate-600" style={{ fontFamily: "DM Sans, sans-serif" }}>
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Award className="w-4 h-4 mr-2" />
                Allocate Points
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Allocate Points</DialogTitle>
                <DialogDescription>Grant or deduct points for a specific user.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="user-select" className="text-right">
                    User
                  </Label>
                  <select
                    id="user-select"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="points" className="text-right">
                    Points
                  </Label>
                  <Input id="points" type="number" placeholder="Enter points (+ or -)" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="reason" className="text-right">
                    Reason
                  </Label>
                  <Input id="reason" placeholder="Reason for adjustment" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button className="bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-700 hover:to-cyan-700 text-white">
                  Apply Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                <TableHead className="font-semibold text-slate-700">ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Email</TableHead>
                <TableHead className="font-semibold text-slate-700">Current Points</TableHead>
                <TableHead className="font-semibold text-slate-700">Join Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-cyan-50 transition-all duration-300"
                >
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-gradient-to-r from-yellow-50 to-amber-50 text-amber-700 border-amber-200 font-semibold"
                      >
                        {user.points.toLocaleString()}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
