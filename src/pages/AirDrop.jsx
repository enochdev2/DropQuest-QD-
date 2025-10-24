"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import umbrellaCoin from "@/assets/dqLogo.png";
import { claimPoints, getUserProfile } from "@/lib/utilityFunction";
import { SuccessToast } from "@/components/Success";
import LoadingSpinner from "@/components/LoadingSpinner";

function AirDrop() {
  const { language } = useLanguage();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [todayChecked, setTodayChecked] = useState(false); // Now based on lastClaimed === today
  // const [userProfile, setUserProfile] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0); // From backend: previous completions
  const [, setTotalPoints] = useState(0); // Track total for display if needed
  const [todayReward, setTodayReward] = useState(100); // Computed dynamically

  // Rewards per streak day (1-based: Day 1=100, ..., Day 7=300)
  const dayRewards = [100, 100, 100, 100, 100, 200, 300];

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  // Helper: Check if two dates are the same day
  // Helper: Check if two dates are the same day
  const isSameDay = (date1, date2) => {
    if (
      !date1 ||
      !date2 ||
      !(date1 instanceof Date) ||
      !(date2 instanceof Date) ||
      isNaN(date1) ||
      isNaN(date2)
    ) {
      return false;
    }
    return date1.toDateString() === date2.toDateString();
  };

  // Compute next day's reward based on currentStreak
  const computeTodayReward = (streak) => {
    let nextDay = streak + 1;
    if (nextDay > 7) nextDay = 1; // Reset after Day 7 (backend handles, but preview here)
    return dayRewards[nextDay - 1] || 100;
  };

  const handleAttendanceCheck = () => {
    setShowSuccess(true);
  };

  const handleCheck = async () => {
    setLoading(true);
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const response = await claimPoints(userInfo._id || userInfo.id); // Pass userId
      console.log("🚀 ~ handleCheck ~ response:", response);

      // Update state with backend response
      setCurrentStreak(response.day); // New streak after claim
      setTotalPoints(response.totalPoints);
      setTodayReward(response.pointsClaimed); // Use actual claimed amount
      setTodayChecked(true); // Mark as completed

      SuccessToast(
        language === "en"
          ? `You have successfully claimed ${response.pointsClaimed} points for the day.`
          : `오늘의 출석체크로 ${response.pointsClaimed} 포인트를 획득하였습니다.`
      );

      // Re-fetch profile to sync any other changes (e.g., totalPoints)
      await getUserProfileDetails();

      // Redirect after 3 seconds
      setTimeout(() => {
        window.location.href = "/my-page";
      }, 3000);
    } catch (error) {
      console.error("Claim failed:", error);
      // Handle error toast if needed
      setMessage(
        language === "en"
          ? "Failed to claim points. Try again."
          : "포인트 수령에 실패했습니다."
      );
    } finally {
      setLoading(false);
      setShowSuccess(false);
    }
  };

  const getUserProfileDetails = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      const user = await getUserProfile(userInfo.email);
      console.log("🚀 ~ getUserProfileDetails ~ user:", user);
      // setUserProfile(user);

      const points = user.points;
      if (!points) {
        // New user: streak=0, no lastClaimed
        setCurrentStreak(0);
        setTodayChecked(false);
        setTodayReward(100);
        setTotalPoints(0);
        return;
      }

      setCurrentStreak(points.currentStreak || 0);
      setTotalPoints(points.totalPoints || 0);

      console.log(
        "🚀 ~ getUserProfileDetails ~ setCurrentStreak:",
        currentStreak
      );
      const today = new Date();
      // Parse lastClaimed string to Date (handles ISO strings from backend)
    const lastClaimedDate = points.lastClaimed ? new Date(points.lastClaimed) : null;
    
    // Validate parsed date (guards against invalid strings)
    const isValidDate = lastClaimedDate instanceof Date && !isNaN(lastClaimedDate);
    const alreadyClaimedToday = isValidDate && isSameDay(lastClaimedDate, today);
    
      console.log(
        "🚀 ~ getUserProfileDetails ~ alreadyClaimedToday:",
        alreadyClaimedToday
      );
      setTodayChecked(alreadyClaimedToday);

      if (alreadyClaimedToday) {
        setMessage(
          language === "en"
            ? "You have already claimed your points for the day."
            : "일일 출석 체크를 이미 완료했습니다."
        );
      } else {
        setMessage("");
        // Preview today's reward (next day)
        setTodayReward(computeTodayReward(points.currentStreak));
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const isDayCompleted = (day) => day <= currentStreak; // Days 1 to currentStreak are completed

  return (
    <div className="min-h-screen pt-20 bg-black text-white">
      <div className="px-4 py-6 sm:w-[400px] mx-auto sm:border border-gray-700 min-h-[90vh] rounded-2xl">
        {/* Header with Dropdown - unchanged */}
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
              <div className="absolute top-full left-0 right-0 mt-2 bg-main text-white rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-100 border-b border-slate-500">
                    SOON
                  </div>
                  <div className="px-3 py-2 text-sm text-gray-100">SOON</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col items-center">
          {/* Parachute Icon - unchanged */}
          <div className="mb-8">
            <div className="relative">
              <img
                src={umbrellaCoin}
                alt="Airdrop Icon"
                className="w-36 sm:w-32 drop-shadow-lg"
              />
            </div>
          </div>

          {message && (
            <p className="text-red-500 font-semibold mb-2 text-xs mt-2">
              {message}
            </p>
          )}

          {/* Attendance Check Button - disabled if todayChecked */}
          <Button
            onClick={handleAttendanceCheck}
            disabled={todayChecked || loading}
            className="bg-[#000b7d] hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "en" ? "Attendance Check" : "출석 체크"}
          </Button>

          {/* Reset Info - unchanged */}
          <p className="text-gray-400 text-sm mb-8 text-center">
            {language === "en"
              ? "Attendance checks are reset daily at 00:00 (KST)."
              : "출석체크는 매일 00시00분에 초기화 됩니다."}
          </p>

          {/* Streak Calendar UI - now dynamic based on currentStreak */}
          <div className="mb-3 w-full max-w-xs relative">
            <div className="border-t-4 border-orange-500 bg-gray-800 rounded-lg p-4">
              {/* Days 1-5 */}
              <div className="grid grid-cols-5 gap-2 mb-3 justify-items-center">
                {Array.from({ length: 5 }, (_, i) => i + 1).map((day) => {
                  const completed = isDayCompleted(day);
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className={`w-13 h-13 rounded-full flex flex-wrap items-center justify-center text-sm font-medium transition-colors border-2 ${
                          completed
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-transparent text-gray-400 border-gray-600"
                        }`}
                      >
                        {completed ? "✓" : day}
                      </div>
                      <span className="text-xs text-gray-300 mt-1">
                        {dayRewards[day - 1]}
                      </span>
                    </div>
                  );
                })}
              </div>
              {/* Days 6-7 */}
              <div className="flex justify-center gap-3">
                {" "}
                {/* Fixed typo: justify-cente -> justify-center */}
                {Array.from({ length: 2 }, (_, i) => i + 6).map((day) => {
                  const completed = isDayCompleted(day);
                  return (
                    <div key={day} className="flex flex-col items-center">
                      <div
                        className={`w-13 h-13 rounded-full flex items-center justify-center text-sm font-medium transition-colors border-2 ${
                          completed
                            ? "bg-green-600 text-white border-green-600"
                            : "bg-transparent text-gray-400 border-gray-600"
                        }`}
                      >
                        {completed ? "✓" : day}
                      </div>
                      <span className="text-xs text-gray-300 mt-1">
                        {dayRewards[day - 1]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Success Popup - now uses todayReward from state/response */}
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
                <span className="text-white text-2xl font-bold">
                  {todayReward}
                </span>
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
