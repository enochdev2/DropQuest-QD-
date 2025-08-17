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
import { Search, Plus, Edit, Trash2 } from "lucide-react"

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    telegramId: "",
    walletAddress: "",
  })

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
  ])

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleEditUser = (user) => {
    setSelectedUser(user)
    setEditFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      telegramId: user.telegramId,
      walletAddress: user.walletAddress || "",
    })
    setEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (selectedUser) {
      setUsers(users.map((user) => (user.id === selectedUser.id ? { ...user, ...editFormData } : user)))
      setEditDialogOpen(false)
      setSelectedUser(null)
    }
  }

  return (
    <Card className="bg-gradient-to-br from-white to-slate-50 shadow-xl border-slate-200">
      <CardHeader className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-slate-800" style={{ fontFamily: "DM Sans, sans-serif" }}>
          User Management
        </CardTitle>
        <CardDescription className="text-slate-600" style={{ fontFamily: "DM Sans, sans-serif" }}>
          Effortlessly manage users and their activities with streamlined operations
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
              <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user account for the platform.</DialogDescription>
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
              <DialogTitle className="text-xl font-semibold text-slate-800">Edit User</DialogTitle>
              <DialogDescription className="text-slate-600">Update user information and settings.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-name" className="text-right font-medium">
                  Name
                </Label>
                <Input
                  id="edit-name"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
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
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
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
                  onChange={(e) => setEditFormData({ ...editFormData, phone: e.target.value })}
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-telegram" className="text-right font-medium">
                  Telegram ID
                </Label>
                <Input
                  id="edit-telegram"
                  value={editFormData.telegramId}
                  onChange={(e) => setEditFormData({ ...editFormData, telegramId: e.target.value })}
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
                  onChange={(e) => setEditFormData({ ...editFormData, walletAddress: e.target.value })}
                  placeholder="Enter wallet address"
                  className="col-span-3 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500"
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
                className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-slate-50 to-slate-100">
                <TableHead className="font-semibold text-slate-700">ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Name</TableHead>
                <TableHead className="font-semibold text-slate-700">Email</TableHead>
                <TableHead className="font-semibold text-slate-700">Phone</TableHead>
                <TableHead className="font-semibold text-slate-700">Telegram ID</TableHead>
                <TableHead className="font-semibold text-slate-700">Join Date</TableHead>
                <TableHead className="font-semibold text-slate-700">Wallet Address</TableHead>
                <TableHead className="font-semibold text-slate-700">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-300"
                >
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="font-medium text-slate-800">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.telegramId}</TableCell>
                  <TableCell>{user.joinDate}</TableCell>
                  <TableCell>
                    {user.walletAddress || (
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600">
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
  )
}
