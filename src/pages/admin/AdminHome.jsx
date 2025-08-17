"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  RefreshCw,
  Users,
  Award,
  Megaphone,
  TrendingUp,
  Activity,
} from "lucide-react";
import logo from "../../assets/dq.png";
import PointsManagement from "@/components/AdminDashboard/PointsManagement";
import AnnouncementsManagement from "@/components/AdminDashboard/AnnouncementsManagement";
import UserManagement from "@/components/AdminDashboard/UserManagement";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("users");
  const [isLoading, setIsLoading] = useState(false);

  const totalUsers = 4;
  const totalPoints = 1013700;
  const activeSessions = Math.floor(Math.random() * 50) + 20;

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="px-24 bg-black border-b border-cyan-100  py-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="text-lg sm:text-xl   flex items-center gap-2">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition"
            >
              <img src={logo} alt="" className=" w-14  h-8" />
              {/* <span className="text-white">DQ</span> */}
              <span className="text-gray-300 -ml- -mb-3 fon text-2xl">
                DropQuest
              </span>
            </Link>
          </div>

          <Button
            onClick={handleRefresh}
            disabled={isLoading}
            className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <RefreshCw
              className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`}
            />
            {isLoading ? "Loading..." : "Refresh"}
          </Button>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center py-5">
        <div className="bg-white/10 px-4 py-3 rounded-lg shadow-lg">
          <h1
            className="text-3xl font-bold text-gray-200"
            style={{ fontFamily: "DM Sans, sans-serif" }}
          >
            DropQuest Admin Dashboard
          </h1>
          {/* <p className="text-slate-200 mt-2 text-lg" style={{ fontFamily: "DM Sans, sans-serif" }}>
              Manage your data effortlessly with insights at your fingertips
            </p> */}
        </div>
      </div>

      <div className="py-6 px-24 ">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className=" bg-gray-100 from-white to-cyan-50 border-cyan-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-100"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Total Users
                  </p>
                  <p
                    className="text-3xl font-bold text-cyan-100"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {totalUsers}
                  </p>
                </div>
                <div className="p-3 bg-cyan-100 rounded-full">
                  <Users className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-blue-50 border-blue-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-600"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Active Sessions
                  </p>
                  <p
                    className="text-3xl font-bold text-blue-600"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {activeSessions}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-white to-emerald-50 border-emerald-200 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm font-medium text-slate-600"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    Total Points
                  </p>
                  <p
                    className="text-3xl font-bold text-emerald-600"
                    style={{ fontFamily: "DM Sans, sans-serif" }}
                  >
                    {totalPoints.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-emerald-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-lg rounded-xl p-2 border border-slate-200">
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Users className="w-4 h-4" />
              User Management
            </TabsTrigger>
            <TabsTrigger
              value="points"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Award className="w-4 h-4" />
              Points Management
            </TabsTrigger>
            <TabsTrigger
              value="announcements"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-600 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-all duration-300 rounded-lg"
            >
              <Megaphone className="w-4 h-4" />
              Announcements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>

          <TabsContent value="points">
            <PointsManagement />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
