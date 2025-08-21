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
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import {
  addannouncement,
  Changeannouncement,
  getAnnouncement,
  removeannouncement,
} from "@/lib/utilityFunction";
import { SuccessToast } from "../Success";

export default function AnnouncementsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    priority: "normal",
  });

  const [announcements, setAnnouncements] = useState([
    {
      id: 10,
      title: "2024 New Airdrop Program Announcement",
      isNew: true,
      date: "2024-01-20",
      author: "Admin",
      content: "We are excited to announce our new airdrop program for 2024.",
      priority: "important",
    },
    {
      id: 9,
      title: "May System Maintenance Notice",
      isNew: true,
      date: "2024-01-19",
      author: "Admin",
      content: "System maintenance will be performed on May 15th.",
      priority: "normal",
    },
    {
      id: 8,
      title: "Update Schedule Announcement",
      isNew: false,
      date: "2024-01-18",
      author: "Admin",
      content: "Regular updates will be scheduled every Tuesday.",
      priority: "normal",
    },
    {
      id: 7,
      title: "Attendance System Changes Notice",
      isNew: false,
      date: "2024-01-17",
      author: "Admin",
      content: "Changes to the attendance system will take effect next week.",
      priority: "normal",
    },
    {
      id: 6,
      title: "May Subscriber Event Announcement",
      isNew: true,
      date: "2024-01-16",
      author: "Admin",
      content: "Special event for subscribers in May.",
      priority: "important",
    },
    {
      id: 5,
      title: "New Member Registration Event Notice",
      isNew: false,
      date: "2024-01-15",
      author: "Admin",
      content: "Welcome event for new members.",
      priority: "normal",
    },
    {
      id: 4,
      title: "DropQuest March 2018 April Update",
      isNew: false,
      date: "2024-01-14",
      author: "Admin",
      content: "Updates for March and April 2018.",
      priority: "normal",
    },
    {
      id: 3,
      title: "2018 Mass Airdrop Distribution Event Notice",
      isNew: true,
      date: "2024-01-13",
      author: "Admin",
      content: "Mass airdrop distribution event details.",
      priority: "urgent",
    },
  ]);

  useEffect(() => {
    handleAnnouncementClick();
  }, []);

  const handleAnnouncementClick = async () => {
    const announcementDetails = await getAnnouncement();
    console.log("🚀 ~ getUserProfileDetails ~ :", announcementDetails);
    setAnnouncements(announcementDetails);
  };

  const handleEditClick = (announcement) => {
    setEditingAnnouncement(announcement);
    setEditForm({
      title: announcement.title,
      content: announcement.content || "",
      priority: announcement.priority || "normal",
    });
    setIsEditDialogOpen(true);
  };

  const creatAnnouncement = async () => {
    const newAnnouncement = {
      title: editForm.title,
      content: editForm.content,
    };

    const announce = await addannouncement(newAnnouncement);
    handleAnnouncementClick();

    announce && SuccessToast("new announcement created");
    setIsModalOpen(false);
  };

  const EditAnnouncement = async (announcementId) => {
    const newAnnouncement = {
      title: editForm.title,
      content: editForm.content,
    };

    const announce = await Changeannouncement(newAnnouncement, announcementId);
    handleAnnouncementClick();

    announce && SuccessToast("new announcement created");
    setIsModalOpen(false);
  };

  const deleteAnnouncement = async (announcementId) => {
    console.log("🚀 ~ deleteAnnouncement ~ announcementId:", announcementId);
    const announce = await removeannouncement(announcementId);
    handleAnnouncementClick();
  };

  const handleSaveEdit = () => {
    if (editingAnnouncement) {
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === editingAnnouncement.id
            ? { ...announcement, ...editForm }
            : announcement
        )
      );
      setIsEditDialogOpen(false);
      setEditingAnnouncement(null);
      setEditForm({ title: "", content: "", priority: "normal" });
    }
  };

  const filteredAnnouncements = announcements.filter((announcement) =>
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-gradient-to-br from-white/5 to-slate-50/5 shadow-xl border-slate-600">
      <CardHeader className="bg-gradient-to-r from-purple-50/20 to-blue-50/20 rounded-t-lg">
        <CardTitle
          className="text-2xl font-bold text-slate-100"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Announcements
        </CardTitle>
        <CardDescription
          className="text-slate-100 text-lg"
          style={{ fontFamily: "DM Sans, sans-serif" }}
        >
          Keep users informed with important updates and communications
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search announcements..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 transition-all text-white duration-300"
            />
          </div>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Plus className="w-4 h-4 mr-2" />
                Create Announcement
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Announcement</DialogTitle>
                <DialogDescription>
                  Create a new announcement that will be visible to all users.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
                  </Label>
                  <Input
                    id="title"
                    placeholder="Announcement title"
                    value={editForm.title}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="content" className="text-right mt-2">
                    Content
                  </Label>
                  <Textarea
                    id="content"
                    placeholder="Announcement content..."
                    value={editForm.content}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        content: e.target.value,
                      }))
                    }
                    className="col-span-3 min-h-[100px]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <select
                    id="priority"
                    className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="normal">Normal</option>
                    <option value="important">Important</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  onClick={creatAnnouncement}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white cursor-pointer"
                >
                  Publish Announcement
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Announcement</DialogTitle>
              <DialogDescription>
                Update the announcement details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title" className="text-right">
                  Title
                </Label>
                <Input
                  id="edit-title"
                  value={editForm.title}
                  onChange={(e) =>
                    setEditForm((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-start gap-4">
                <Label htmlFor="edit-content" className="text-right mt-2">
                  Content
                </Label>
                <Textarea
                  id="edit-content"
                  value={editForm.content}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      content: e.target.value,
                    }))
                  }
                  className="col-span-3 min-h-[100px]"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-priority" className="text-right">
                  Priority
                </Label>
                <select
                  id="edit-priority"
                  value={editForm.priority}
                  onChange={(e) =>
                    setEditForm((prev) => ({
                      ...prev,
                      priority: e.target.value,
                    }))
                  }
                  className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="normal">Normal</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveEdit}
                // onClick={()=> EditAnnouncement(announcement?._id)}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="rounded-xl border border-slate-200 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-blue-500 to-slate-700">
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  ID
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20  ">
                  Title
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20 *:">
                  Status
                </TableHead>
                <TableHead className="font-semibold    text-slate-100 text-lg bg-black/20">
                  Date
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Author
                </TableHead>
                <TableHead className="font-semibold text-slate-100 text-lg bg-black/20">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAnnouncements.map((announcement) => (
                <TableRow
                  key={announcement._id}
                  className="hover:bg-gradient-to-r hover:from-purple-50/20 hover:to-blue-50/20 transition-all  duration-300"
                >
                  <TableCell className="font-medium text-white">
                    {announcement._id?.slice(20, 24)}
                  </TableCell>
                  <TableCell className="max-w-xs truncate font-medium text-white">
                    {announcement?.title}
                  </TableCell>
                  <TableCell>
                    {announcement?.isNew ? (
                      <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 hover:from-blue-200 hover:to-cyan-200 font-semibold">
                        NEW
                      </Badge>
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-600"
                      >
                        Published
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-white">
                    {" "}
                    {new Date(announcement.createdAt).toLocaleDateString(
                      "en-US"
                    )}
                  </TableCell>
                  <TableCell>{announcement.author}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(announcement)}
                        className="hover:bg-cyan-50 hover:border-cyan-300 transition-all duration-300 bg-transparent"
                      >
                        <Edit className="w-3 h-3 text-blue-500" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteAnnouncement(announcement?._id)}
                        className="hover:bg-red-50 hover:border-red-300 text-red-600 transition-all duration-300 bg-transparent cursor-pointer"
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
