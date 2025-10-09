"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
// import { useLanguage } from "@/contexts/language-context"
import umbrellaCoin from "@/assets/dqLogo.png";
import { claimPoints, getUserProfile } from "@/lib/utilityFunction";
import { SuccessToast } from "@/components/Success";
import LoadingSpinner from "@/components/LoadingSpinner";

// Mock attendance data for the past 3 days
// let attendanceData = [
//   { date: "8/6", status: "absent", label: { en: "Absent", ko: "미출석" } },
//   {
//     date: "8/7",
//     status: "completed",
//     label: { en: "Completed", ko: "출석 완료" },
//   },
//   {
//     date: "8/8",
//     status: "completed",
//     label: { en: "Completed", ko: "출석 완료" },
//   },
// ];

function AirDrop() {
  const { language } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [todayChecked, setTodayChecked] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  const handleAttendanceCheck = () => {
    setShowSuccess(true);
  };

  const handleCheck = async () => {
    setLoading(true);
    const success = await claimPoints();
    console.log("🚀 ~ handleCheck ~ success:", success);

    setShowSuccess(false);
    setLoading(false);
    SuccessToast("you have successfully claim your airdrop for the day");

    setTodayChecked(true);
    // Redirect after 30 seconds
    setTimeout(() => {
      window.location.href = "/my-page"; // replace with your page URL
    }, 3000); // 30000ms = 30 seconds
  };

  const getUserProfileDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const user = await getUserProfile(userInfo.email);
    console.log("🚀 ~ getUserProfileDetails ~ user:", user);
    setUserProfile(user);
    // attendanceData = [
    //   { date: "5/7", status: "absent", label: { en: "Absent", ko: "미출석" } },
    //   {
    //     date: "6/7",
    //     status: "completed",
    //     label: { en: "Completed", ko: "출석 완료" },
    //   },
    //   {
    //     date: "7/7",
    //     status: "completed",
    //     label: { en: "Completed", ko: "출석 완료" },
    //   },
    // ];
    if (user.points?.points === 0) {
      setTodayChecked(true);
      // setMessage("You have already claimed your point for the day.");
      setMessage(language === "en"
                  ? "You have already claimed your point for the day."
                  : "일일 출석 체크를 이미 완료했습니다");
    } else {
      setTodayChecked(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      {/* <Navbar user={mockUser} /> */}

      <div className="px-4 py-6 sm:w-[400px] mx-auto sm:border border-gray-700 h-screen rounded-2xl">
        {/* Header with Dropdown */}
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-[#000b7d] font-bold text-white rounded-full px-4 py-2 flex items-center justify-between text-sm "
            >
              <span>{language === "en" ? "Attendance Check" : "출석체크"}</span>
              <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute  top-full left-0 right-0 mt-2 bg-main text-white rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-100 border-b border-slate-500">SOON</div>
                  <div className="px-3 py-2 text-sm text-gray-100">SOON</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          {/* Parachute Icon */}
          <div className="mb-8">
            <div className="relative">
              {/* Parachute */}
              <img
                src={umbrellaCoin}
                alt="Airdrop Icon"
                className="w-36 sm:w-32  drop-shadow-lg"
              />
            </div>
          </div>
          {message && (
            <p className="text-red-500 font-semibold mb-2 text-xs mt-2">
              {message}
            </p>
          )}

          {/* Attendance Check Button */}
          <Button
            onClick={handleAttendanceCheck}
            disabled={todayChecked}
            className="bg-[#000b7d] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "en" ? "Attendance Check" : "출석 체크"}
          </Button>

          {/* Attendance Status */}
          {/* <div className="flex items-center gap-6 mb-4">
            {attendanceData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.status === "completed"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {day.date}
                </div>
                <span
                  className={`text-xs mt-1 ${
                    day.status === "completed"
                      ? "text-blue-400"
                      : "text-gray-500"
                  }`}
                >
                  {day.label[language]}
                </span>
              </div>
            ))}
          </div> */}

          {/* Reset Info */}
          <p className="text-gray-400 text-sm text-center">
            {language === "en"
              ? "Attendance checks are reset daily at 00:00 (KST)."
              : "출석체크는 매일 00시00분에 초기화 됩니다."}
          </p>
        </div>

        {/* Success Popup */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-[#000b7d] rounded-2xl p-6 text-center max-w-sm w-full">
              <h3 className="text-white text-lg font-semibold mb-4">
                {language === "en"
                  ? "Today's attendance has been completed!!"
                  : "오늘의 출석이 완료되었습니다!!"}
              </h3>

              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <span className="text-white text-2xl font-bold">100</span>
              </div>

              <Button
                onClick={handleCheck}
                disabled={loading}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-full font-medium"
              >
                {loading ? <LoadingSpinner /> : "Check"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AirDrop;
