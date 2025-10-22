"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarPlusIcon, ChevronDown } from "lucide-react";
// import { useLanguage } from "@/contexts/language-context"
import umbrellaCoin from "@/assets/dqLogo.png";
import { claimPoints, getUserProfile } from "@/lib/utilityFunction";
import { SuccessToast } from "@/components/Success";
import LoadingSpinner from "@/components/LoadingSpinner";

function AirDrop() {
  const { language } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [todayChecked, setTodayChecked] = useState(false);
  const [userProfile, setUserProfile] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0); // Mock: replace with user.streak from backend

  // Mock rewards per streak day (1-based index)
  const dayRewards = [100, 100, 100, 200, 200, 300, 300];
  const todayDay = currentStreak + 1;
  // const todayReward = dayRewards[todayDay - 1] || 100;
  const hundred = 100
  const todayReward = hundred || dayRewards[todayDay - 1] ;

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
    SuccessToast(`You have successfully claimed ${todayReward} points for the day.`);

    setTodayChecked(true);
    // Redirect after 3 seconds (reduced for demo)
    setTimeout(() => {
      window.location.href = "/my-page"; // replace with your page URL
    }, 3000);
  };

  const getUserProfileDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const user = await getUserProfile(userInfo.email);
    console.log("🚀 ~ getUserProfileDetails ~ user:", user);
    setUserProfile(user);
    // Mock streak: replace with actual user.streak logic
    setCurrentStreak(3); // Example: 3-day streak
    if (user.points?.points === 0) {
      setTodayChecked(true);
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
              {/* {message} */}
              {language === "en" ? "you have already claimed your point for the day." : "일일 출석체크를 이미 완료했습니다"}
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

          {/* Reset Info */}
          <p className="text-gray-400 text-sm text-center">
            {language === "en"
              ? "Attendance checks are reset daily at 00:00 (KST)."
              : "출석체크는 매일 00시00분에 초기화 됩니다."}
          </p>
          {/* <Calendar text-white /> */}

          {/* Streak Calendar UI */}
          <div className="mb-6 w-full mt-12 bg-main py-5 px-3 text-right max-w-xs">
            {/* Top row: Days 1-5 */}
            <div className="grid grid-cols-5 gap-2 mb-2 justify-items-center">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((day) => {
                const isCompleted = day <= currentStreak;
                return (
                  <div key={day} className="flex flex-col flex-wrap items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-colors ${
                        isCompleted ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                    <span className="text-xs text-gray-500">{dayRewards[day - 1]}</span>
                  </div>
                );
              })}
            </div>
            
            {/* Bottom row: Days 6-7 */}
            <div className="flex justify-start gap-6">
              {Array.from({ length: 2 }, (_, i) => i + 6).map((day) => {
                const isCompleted = day <= currentStreak;
                return (
                  <div key={day} className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium mb-1 transition-colors ${
                        isCompleted ? "bg-green-600 text-white" : "bg-gray-700 text-gray-400"
                      }`}
                    >
                      {day}
                    </div>
                    <span className="text-xs text-gray-500">{dayRewards[day - 1]}</span>
                  </div>
                );
              })}
            </div>
          </div>

          
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
                <span className="text-white text-2xl font-bold">{todayReward}</span>
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