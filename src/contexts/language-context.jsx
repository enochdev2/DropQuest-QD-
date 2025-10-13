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
    pointsForCoins: "Exchange Points for Coins",
    welcome: "Welcome!",
    dontMissAirdrop: "Don't miss airdrops, start right now!",
    roadmap: "Roadmap",
    comingSoon: "Coming Soon",
    // Airdrop
    claimSuccess: "You have successfully claimed your airdrop for the day",

    // Auth
    signUp: "Sign Up",
    signIn: "Sign In",
    logOut: "Log Out",
    email: "Email",
    password: "Password",
    confirmPassword: "Confirm Password",
    name: "Name",
    phoneNumber: "Phone Number",
    phoneNumberFormat: "000-0000-0000",
    telegramId: "Telegram ID",
    telegramIdPlaceholder: "Please enter my profile-username",
    required: "Required",
    passwordRequirement: "Use a password with at least 6 characters including letters and numbers.",
    passwordMismatch: "Passwords do not match.",
    passwordMatchValidation: "Please enter the same password as above.",
    idCardFront: "ID card photo (front side)",
    alreadyHaveAccount: "Already have an account?",
    kycPhotoInstruction: "Please upload a photo file that clearly shows both your face and the front side of your ID card.",
    kycPhotoTitle: "kycPhotoTitle",
    invalidEmailFormat: "Please enter a valid email format",
    invalidPasswordFormat: "Password must include both letters and numbers and be at least 6 characters long",
    passwordsDoNotMatch: "Passwords do not match",
    invalidPhoneNumberLength: "Phone number must be 11 digits",
    login: "Login",
    loginSuccess: "Login Successful",


    // My Page
    myPoints: "My Points",
    myReferrer: "My Referrer",
    refresh: "Refresh",
    myInvitationLink: "My Invitation Link",
    copyInvitationLink: "Copy your invitation link and invite friends to DQ!",
    moreInvites: "The more friends you invite, the more points and benefits you can earn.",
    myReferralList: "My Referral List",
    pointsBalance: "Points Balance",
    invitationLinkCopied: "Invitation link copied to clipboard",


    // Attendance
    attendanceCheck: "Attendance Check",
    attendanceReset: "Attendance checks are reset daily at 00:00 (KST).",
    completed: "Completed",
    absent: "Absent",
    todayCompleted: "Today's attendance has been completed!!",
    check: "Check",

    // Announcements
    announcementsList: "Announcements List",

    // Point Exchange
    pointExchangeTitle: "Point Exchange",
    availableTokens: "Available Tokens",
    exchangePoints: "Exchange Points",
    availablePoints: "Available Points",
    exchangeRequest: "Would you like to apply for a point exchange?",
    yes: "Yes",
    no: "No",
    requestCompleted: "The exchange request has been completed",
    noTransactionHistory: "No transaction history found",

  },
  ko: {
    // Navigation
    home: "홈",
    announcements: "공지사항",
    myPage: "마이페이지",
    airdrop: "에어드랍",

    // Landing Page
    clickAnd: "클릭하고",
    Earn: "코인받기",
    connectingUsers: "잠재적인 기회와 사용자를 연결합니다",
    earnAirdrops: "미션을 통해 에어드랍을 획득하고 수익을 창출할 수 있습니다.",
    connectingUsersToUsers: "사용자와 다른 사용자 연결",
    directOpportunities: "사용자들이 다른 사용자들에게 직접 잠재적 기회를 제공할 수도 있습니다.",
    goToAirdrop: "에어드랍 받으러 가기",
    pointsForCoins: "포인트를 코인으로 교환하기",
    welcome: "환영합니다!",
    dontMissAirdrop: "에어드랍, 놓치지 말고 지금 바로 시작해보세요.",
    roadmap: "로드맵",
    comingSoon: "출시 예정",
    // Airdrop
    claimSuccess: "일일 출석 체크를 완료했습니다",


    // Auth
    signUp: "회원가입",
    signIn: "로그인",
    logOut: "로그아웃",
    email: "이메일",
    password: "비밀번호",
    confirmPassword: "비밀번호 재확인",
    name: "이름",
    phoneNumber: "전화번호",
    phoneNumberFormat: "전화번호 형식",
    telegramId: "텔레그램 아이디",
    telegramIdPlaceholder: "내 프로필-사용자명을 기입해주세요",
    required: "필수",
    passwordRequirement: "영문, 숫자를 포함하여 6자리 이상의 비밀번호를 사용하세요.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    passwordMatchValidation: "위와 동일한 비밀번호를 입력해 주세요",
    idCardFront: "신분증 사진 (앞면)",
    alreadyHaveAccount: "이미 계정이 있으신가요?",
    kycPhotoInstruction: "신분증 앞면과 얼굴이 모두 사진에 나오게 촬영한 사진 파일을 업로드 해주세요",
    kycPhotoTitle: "사진 촬영 방법",
    invalidEmailFormat: "올바른 이메일 형식을 입력해주세요.",
    invalidPasswordFormat: "문자와 숫자가 모두 포함되어야 하며, 최소 6자 이상이어야 합니다.",
    passwordsDoNotMatch: "비밀번호가 일치하지 않습니다.",
    invalidPhoneNumberLength: "올바른 전화번호를 입력하세요",
    login: "로그인",
    loginSuccess: "로그인 성공",


    // My Page
    myPoints: "내 포인트",
    myReferrer: "내 추천인",
    refresh: "새로고침",
    myInvitationLink: "내 초대 링크",
    copyInvitationLink: "초대 링크를 복사하고 친구들을 DQ에 초대하세요!",
    moreInvites: "더 많은 친구를 초대할수록 더 많은 포인트와 혜택을 얻을 수 있습니다.",
    myReferralList: "내 추천 목록",
    pointsBalance: "포인트 잔액",
    invitationLinkCopied: "초대 링크가 복사되었습니다",

    // Attendance
    attendanceCheck: "출석체크",
    attendanceReset: "출석체크는 매일 00시00분에 초기화 됩니다.",
    completed: "출석 완료",
    absent: "미출석",
    todayCompleted: "오늘의 출석이 완료되었습니다!!",
    check: "체크",

    // Announcements
    announcementsList: "공지사항 목록",
    

    // Point Exchange
    pointExchangeTitle: "포인트 교환",
    availableTokens: "사용 가능한 토큰",
    exchangePoints: "포인트 교환",
    availablePoints: "사용 가능한 포인트",
    exchangeRequest: "포인트 교환을 신청하시겠습니까?",
    yes: "예",
    no: "아니오",
    requestCompleted: "포인트 교환 신청이 완료되었습니다",
    noTransactionHistory: "교환 내역이 없습니다",

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
