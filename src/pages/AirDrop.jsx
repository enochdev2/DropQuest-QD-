"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
// import { useLanguage } from "@/contexts/language-context"
import umbrellaCoin from "@/assets/umbrella_coin.png"; 


const mockUser = {
  name: "김코인",
  points: 1000000,
}

// Mock attendance data for the past 3 days
const attendanceData = [
  { date: "8/6", status: "absent", label: { en: "Absent", ko: "미출석" } },
  { date: "8/7", status: "completed", label: { en: "Completed", ko: "출석 완료" } },
  { date: "8/8", status: "completed", label: { en: "Completed", ko: "출석 완료" } },
]

 function AirDrop() {
  const {  language } = useLanguage()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [todayChecked, setTodayChecked] = useState(false)

  const handleAttendanceCheck = () => {
    setShowSuccess(true)
    setTodayChecked(true)
    // Auto hide success message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar user={mockUser} /> */}

      <div className="px-4 py-6">
        {/* Header with Dropdown */}
        <div className="mb-8">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-full bg-white text-black rounded-full px-4 py-2 flex items-center justify-between text-sm font-medium"
            >
              <span>{language === "en" ? "Attendance Check" : "출석체크"}</span>
              <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white text-black rounded-lg shadow-lg z-10">
                <div className="p-2">
                  <div className="px-3 py-2 text-sm text-gray-500">SOON</div>
                  <div className="px-3 py-2 text-sm text-gray-500">SOON</div>
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
          className="w-50 sm:w-32  drop-shadow-lg"
        />
            </div>
          </div>

          {/* Attendance Check Button */}
          <Button
            onClick={handleAttendanceCheck}
            disabled={todayChecked}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {language === "en" ? "Attendance Check" : "출석 체크"}
          </Button>

          {/* Attendance Status */}
          <div className="flex items-center gap-6 mb-4">
            {attendanceData.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-medium ${
                    day.status === "completed" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-400"
                  }`}
                >
                  {day.date}
                </div>
                <span className={`text-xs mt-1 ${day.status === "completed" ? "text-blue-400" : "text-gray-500"}`}>
                  {day.label[language]}
                </span>
              </div>
            ))}
          </div>

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
            <div className="bg-blue-500 rounded-2xl p-6 text-center max-w-sm w-full">
              <h3 className="text-white text-lg font-semibold mb-4">
                {language === "en" ? "Today's attendance has been completed!!" : "오늘의 출석이 완료되었습니다!!"}
              </h3>

              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">$</span>
                </div>
                <span className="text-white text-2xl font-bold">100</span>
              </div>

              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-2 rounded-full font-medium"
              >
                {language === "en" ? "Check" : "확인"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



export default AirDrop