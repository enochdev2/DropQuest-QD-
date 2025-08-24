"use client"

import { createContext, useContext, useState, useEffect } from "react"

const translations = {
  en: {
    // Navigation
    home: "Home",
    announcements: "Announcements",
    myPage: "My Page",
    airdrop: "Airdrop",

    // Landing Page
    clickAnd: "Click and",
    Earn: "Earn",
    connectingUsers: "Connecting users with potential opportunities",
    earnAirdrops: "You can earn airdrops and generate income through missions.",
    connectingUsersToUsers: "Connecting users with other users",
    directOpportunities: "Users can also directly provide potential opportunities to other users.",
    goToAirdrop: "Go to Receive Airdrop",
    welcome: "Welcome!",
    dontMissAirdrop: "Don't miss airdrops, start right now!",
    roadmap: "Roadmap",
    comingSoon: "Coming Soon",

    // Auth
    signUp: "Sign Up",
    signIn: "Sign In",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    phoneNumber: "Phone Number",
    telegramId: "Telegram ID",
    required: "Required",
    passwordRequirement: "Use a password with at least 6 characters including letters and numbers.",
    passwordMismatch: "Passwords do not match.",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",

    // My Page
    myPoints: "My Points",
    myReferrer: "My Referrer",
    refresh: "Refresh",
    myInvitationLink: "My Invitation Link",
    copyInvitationLink: "Copy your invitation link and invite friends to DQ!",
    moreInvites: "The more friends you invite, the more points and benefits you can earn.",
    myReferralList: "My Referral List",
    pointsBalance: "Points Balance",

    // Attendance
    attendanceCheck: "Attendance Check",
    attendanceReset: "Attendance checks are reset daily at 00:00 (KST).",
    completed: "Completed",
    absent: "Absent",
    todayCompleted: "Today's attendance has been completed!!",
    check: "Check",

    // Announcements
    announcementsList: "Announcements List",
  },
  ko: {
    // Navigation
    home: "홈",
    announcements: "공지사항",
    myPage: "마이페이지",
    airdrop: "에어드랍",

    // Landing Page
    clickAnd: "클릭해서 ",
    Earn: "벌",
    connectingUsers: "잠재적인 기회와 사용자를 연결합니다",
    earnAirdrops: "미션을 통해 에어드랍을 획득하고 수익을 창출할 수 있습니다.",
    connectingUsersToUsers: "사용자와 다른 사용자 연결",
    directOpportunities: "사용자들이 다른 사용자들에게 직접 잠재적 기회를 제공할 수도 있습니다.",
    goToAirdrop: "에어드랍 받으러 가기",
    welcome: "환영합니다!",
    dontMissAirdrop: "에어드랍, 놓치지 말고 지금 바로 시작해보세요.",
    roadmap: "로드맵",
    comingSoon: "출시 예정",

    // Auth
    signUp: "회원가입",
    signIn: "로그인",
    email: "이메일",
    password: "비밀번호",
    confirmPassword: "비밀번호 재확인",
    name: "이름",
    phoneNumber: "전화번호",
    telegramId: "텔레그램 아이디",
    required: "필수",
    passwordRequirement: "영문, 숫자를 포함하여 6자리 이상의 비밀번호를 사용하세요.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    alreadyHaveAccount: "이미 계정이 있으신가요?",
    login: "로그인",

    // My Page
    myPoints: "내 포인트",
    myReferrer: "내 추천인",
    refresh: "새로고침",
    myInvitationLink: "내 초대 링크",
    copyInvitationLink: "초대 링크를 복사하고 친구들을 DQ에 초대하세요!",
    moreInvites: "더 많은 친구를 초대할수록 더 많은 포인트와 혜택을 얻을 수 있습니다.",
    myReferralList: "내 추천 목록",
    pointsBalance: "포인트 잔액",

    // Attendance
    attendanceCheck: "출석체크",
    attendanceReset: "출석체크는 매일 00시00분에 초기화 됩니다.",
    completed: "출석 완료",
    absent: "미출석",
    todayCompleted: "오늘의 출석이 완료되었습니다!!",
    check: "체크",

    // Announcements
    announcementsList: "공지사항 목록",
  },
}

const LanguageContext = createContext(undefined)

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("en") // Default to English

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language")
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ko")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang) => {
    setLanguage(lang)
    localStorage.setItem("language", lang)
  }

  const t = (key) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
//    fast refresh only works when a file only exports components. use a new file to share constants or function between components
  return context
}
