"use client";

import { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    // Navigation
    home: "Home",
    announcements: "Announcements",
    myPage: "My Page",
    airdrop: "Daily Check-in",
    qna: "QnA",

    // Landing Page
    clickAnd: "Click and",
    Earn: "Earn",
    clickAndEarn: "Drop Quest",
    dropQuestDescription:
      "Through the Drop Quest community, we share blockchain-related information with users. This allows users to gain opportunities and information to generate profits from token sales, airdrops, and other events in various communities.",
    clickInfoIcon: "Click the info icon to learn more",
    activeNow: "Active Now",
    connectingUsers: "Connecting users with potential opportunities",
    earnAirdrops: "You can earn airdrops and generate income through missions.",
    connectingUsersToUsers: "Connecting users with other users",
    blockchainrelated:
      " Through the Drop Quest community, we share blockchain-related information with users.",
    allowsusers:
      "This allows users to gain opportunities and information to generate profits from token sales, airdrops, and other events in various communities.",
    directOpportunities:
      "Users can also directly provide potential opportunities to other users.",
    goToAirdrop: "Go to Daily Check-in",

    pointsForCoins: "Exchange Points for Coins",
    welcome: "Welcome!",
    dontMissAirdrop: "Don't miss airdrops, start right now!",
    soon: "SOON",
    roadmap: "Roadmap",
    dropquest: "DropQuest",
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
    passwordRequirement:
      "Use a password with at least 6 characters including letters and numbers.",
    passwordMismatch: "Passwords do not match.",
    passwordMatchValidation: "Please enter the same password as above.",
    idCardFront: "ID card photo (front side)",
    alreadyHaveAccount: "Already have an account?",
    emailAlreadyInUse: "This E-mail is already in use",
    telegramAlreadyInUse: "This Telegram ID is already in use.",
    referralEmail: "Referral email (Optional)",
    referralEmails: "Referral email",
    kycPhotoInstruction:
      "Please upload a photo file that clearly shows both your face and the front side of your ID card.",
    kycPhotoTitle: "kycPhotoTitle",
    invalidEmailFormat: "Please enter a valid email format",
    invalidPasswordFormat:
      "Password must include both letters and numbers and be at least 6 characters long",
    invalidTelegramFormat: "invalidTelegramFormat",
    passwordsDoNotMatch: "Passwords do not match",
    invalidPhoneNumberLength: "Phone number must be 11 digits",
    UploadID: "Upload ID Card",
    login: "Login",
    findId: "Find ID (Email)",
    findPassword: "Find Password",
    findPasswords: "Reset Password",
    resetPassword: "Reset Password",
    yourId: "Your ID (Email)",
    newPassword: "New Password",
    ok: "Ok",
    cancel: "Cancel",
    incorrectInfo: "The information you entered is incorrect. Please try again.",
    incorrectInfos: "The information you entered is incorrect. Please try again.",
    passwordChanged: "Your password has been changed. Please try logging in again.",
    namePhoneRequired: "Name, and phone number are required",
    noUserFound: " No user found with this name and phone number",
    tryLoginAgain: "Please try logging in again.",
    dontHaveAccount: "Don't have an account?",
    loginSuccess: "Login Successful",

    // My Page
    myPoints: "My Points",
    myReferrer: "My Referrer",
    refresh: "Refresh",
    myInvitationLink: "My Invitation Link",
    copyInvitationLink: "Copy your invitation link and invite friends to DQ!",
    moreInvites:
      "The more friends you invite, the more points and benefits you can earn.",
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

    // QnA Page
    qnaTitle: "QnA",
    basicUsage: "Basic Usage Guide",
    whatIsDropQuest: "What is Drop Quest?",
    whatIsDropQuestAnswer:
      "Drop Quest is a reward platform where users can earn points through daily check-ins or missions, and exchange those points for cryptocurrency.",
    howToCheckIn: "How to Check In",
    howToCheckInAnswer:
      'After logging in, tap the "Daily Check-in" button — you\'ll automatically receive 100 points once per day.',

    pointsSection: "Points",
    dailyPointsEarned: "Daily Points Earned",
    dailyPointsEarnedAnswer:
      "You can receive 100 points per day by checking in.",
    howToCheckPoints: "How to Check Your Points",
    howToCheckPointsAnswer:
      "Go to My Page > Points History to view your accumulated points.",

    referralSection: "Referral",
    referralRewardSystem: "Referral Reward System",
    referralRewardSystemAnswer:
      "Each time a user who registered through your referral link checks in, you'll receive an additional 10% of the points they earn.",
    howToFindReferralLink: "How to Find Your Referral Link",
    howToFindReferralLinkAnswer:
      "You can view and copy your personal referral link at the top of My Page.",

    pointExchangeSection: "Point Exchange",
    availableCoins: "Available Coins for Exchange",
    availableCoinsAnswer:
      "You can exchange points for Solana (SOL) and various Solana chain-based meme coins.",
    howToExchange: "How to Exchange",
    howToExchangeStep1:
      'Go to the "Point Exchange" menu and submit an exchange request.',
    howToExchangeStep2:
      'On My Page, open your point exchange record and click the "Check Telegram Message" button.',
    howToExchangeStep3:
      "Read the pinned announcement in the Telegram community and message a support agent.",
    howToExchangeStep4:
      "A Solana address from your Phantom wallet is required.",
    processingTime: "Processing Time",
    processingTimeAnswer:
      "Typically processed within 1 hour, but may take longer depending on conditions.",

    walletSecurity: "Wallet & Security",
    isPhantomRequired: "Is a Phantom Wallet Required?",
    isPhantomRequiredAnswer:
      "Yes. Drop Quest is based on the Solana network, so a Phantom wallet is required.",
    wrongAddress: "If You Enter the Wrong Address",
    wrongAddressAnswer:
      "Due to the nature of blockchain, coins sent to the wrong address cannot be recovered. Please double-check your wallet address before sending.",
    coinsNotAppearing:
      "I Received Coins, but They Don't Appear or Show a Price in My Phantom Wallet",
    coinsNotAppearingAnswer:
      "If the coins were issued on a new network rather than the existing one, Phantom Wallet may recognize them as new tokens. This issue is not related to token swap status or trustworthiness, so don't worry. Please refer to the wallet guide below for detailed instructions.",
    walletGuide: "Wallet Guide",
    viewAsImage: "View as Image",
    walletGuideStep1:
      "Open your Phantom Wallet → Tap the [⋯] icon at the top right of the token list",
    walletGuideStep2: "Turn ON the toggle switch next to the deposited token",
    walletGuideStep3:
      "Return to the main screen and select the deposited token",
    walletGuideStep4: 'Tap "Report as Not Spam" at the bottom of the screen',
    walletGuideStep5: "The token should now display correctly",

    othersSection: "Others",
    canUseOnPC: "Can I Use It on PC?",
    canUseOnPCAnswer: "Drop Quest currently supports mobile version only.",
    howToChangeLanguage: "How to Change Language Settings",
    howToChangeLanguageAnswer:
      "Tap the 🌐 icon at the top right of the main screen to switch between Korean / English / Chinese (coming soon).",
    howToJoinEvents: "How to Join Events",
    howToJoinEventsAnswer:
      "Announcements for airdrop events and bonus rewards are regularly shared through the Notice category within the Drop Quest platform and our Telegram community channels.",

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
    searchForManagerEmail: "Search for a manager email",
    managermanagement: "Manager Management",
    numberOfUsers: "Number of Users",
    registrationdate: "Registration Date",
    backbutton: "Back button",
    managerEmail: "Manager E-Mail",
    default: "Default",
    price: "Price",
    popularity: " Popularity",
    joincommunity: "Join Community",
    commmunityevent: "Community Event",
    phantom: "Download Phantom Wallet",
    // ok: "OK",
    // cancel: "Cancel",
  
  },

  ko: {
    // Navigation
    home: "홈",
    announcements: "공지사항",
    myPage: "마이페이지",
    airdrop: "출석체크",
    qna: "자주 묻는 질문",

    // Landing Page
    clickAnd: "클릭하고",
    Earn: "코인받기",
    clickAndEarn: "드롭퀘스트",
    dropQuestDescription:
      "Drop Quest 커뮤니티를 통해 사용자들에게 블록체인 관련 정보를 공유합니다. 이를 통하여 사용자들은 다른 커뮤니티의 토큰 세일, 에어드랍 등의 수익을 창출할 기회 및 정보를 얻습니다.",
    clickInfoIcon: "정보 아이콘을 클릭하여 자세히 알아보세요",
    activeNow: "현재 활성화",
    connectingUsers: "잠재적인 기회와 사용자를 연결합니다",
    earnAirdrops: "미션을 통해 에어드랍을 획득하고 수익을 창출할 수 있습니다.",
    blockchainrelated:
      "Drop Quest 커뮤니티를 통해 사용자들에게 블록체인 관련 정보를 공유합니다.",
    allowsusers:
      "이를 통하여 사용자들은 다른 커뮤니티의 토큰 세일, 에어드랍 등의 수익을 창출할 기회 및 정보를 얻습니다.",
    connectingUsersToUsers: "사용자와 다른 사용자 연결",
    directOpportunities:
      "사용자들이 다른 사용자들에게 직접 잠재적 기회를 제공할 수도 있습니다.",
    goToAirdrop: "출석체크하러가기",
    pointsForCoins: "포인트를 코인으로 교환하기",
    welcome: "환영합니다!",
    dontMissAirdrop: "에어드랍, 놓치지 말고 지금 바로 시작해보세요.",
    soon: "SOON",
    roadmap: "로드맵",
    dropquest: "드롭퀘스트",
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
    passwordRequirement:
      "영문, 숫자를 포함하여 6자리 이상의 비밀번호를 사용하세요.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    passwordMatchValidation: "위와 동일한 비밀번호를 입력해 주세요",
    idCardFront: "신분증 사진 (앞면)",
    alreadyHaveAccount: "이미 계정이 있으신가요?",
    emailAlreadyInUse: "이 이메일은 이미 사용 중입니다",
    telegramAlreadyInUse: "이 텔레그램 아이디는 이미 사용 중입니다.",
    kycPhotoInstruction:
      "신분증 앞면과 얼굴이 모두 사진에 나오게 촬영한 사진 파일을 업로드 해주세요",
    kycPhotoTitle: "사진 촬영 방법",
    invalidEmailFormat: "올바른 이메일 형식을 입력해주세요.",
    invalidPasswordFormat:
      "문자와 숫자가 모두 포함되어야 하며, 최소 6자 이상이어야 합니다.",
    invalidTelegramFormat: "올바른 형식의 텔레그램 아이디를 입력해주세요",
    passwordsDoNotMatch: "비밀번호가 일치하지 않습니다.",
    invalidPhoneNumberLength: "올바른 전화번호를 입력하세요",
    referralEmail: "추천인 이메일 (선택사항)",
    referralEmails: "추천인 이메일",
    UploadID: "신분증 업로드",
    login: "로그인",
    findId: "아이디(이메일) 찾기",
    findPassword: "비밀번호 찾기",
    findPasswords: "비밀번호 재설정",
    resetPassword: "비밀번호 재설정",
    yourId: "귀하의 아이디(이메일)",
    newPassword: "새 비밀번호",
    ok: "확인",
    cancel: "취소",
    incorrectInfo: "입력하신 정보가 올바르지 않습니다. 다시 시도해주세요.",
    incorrectInfos: "입력하신 정보가 올바르지 않습니다. 다시 시도해주세요.",
    passwordChanged: "비밀번호가 변경되었습니다. 다시 로그인해주세요.",
    namePhoneRequired: "이름과 전화번호는 필수 항목입니다.",
    noUserFound: "해당 이름과 전화번호로 가입된 사용자가 없습니다.", 
    tryLoginAgain: "다시 로그인해주세요.",
    dontHaveAccount: "계정이 없으신가요?",
    loginSuccess: "로그인 성공",
    backbutton: "뒤로가기",

    // My Page
    myPoints: "내 포인트",
    myReferrer: "내 추천인",
    refresh: "새로고침",
    myInvitationLink: "내 초대 링크",
    copyInvitationLink: "초대 링크를 복사하고 친구들을 DQ에 초대하세요!",
    moreInvites:
      "더 많은 친구를 초대할수록 더 많은 포인트와 혜택을 얻을 수 있습니다.",
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

    // QnA Page
    qnaTitle: "자주 묻는 질문",
    basicUsage: "출석체크",
    whatIsDropQuest: "Drop Quest는 무엇인가요?",
    whatIsDropQuestAnswer:
      "Drop Quest는 출석체크나 미션을 통해 포인트를 쌓고, 그 포인트를 코인으로 교환할 수 있는 리워드 플랫폼입니다.",
    howToCheckIn: "출석체크 방법",
    howToCheckInAnswer:
      "로그인 후 '출석체크' 버튼을 누르면 하루 1회 100포인트가 자동 적립됩니다.",

    pointsSection: "포인트 관련",
    dailyPointsEarned: "하루 포인트 적립량",
    dailyPointsEarnedAnswer: "출석 시 100포인트를 받을 수 있습니다.",
    howToCheckPoints: "포인트 확인하기",
    howToCheckPointsAnswer: "마이 페이지 > 내 포인트에서 확인 가능합니다.",

    referralSection: "레퍼럴 (추천인)",
    referralRewardSystem: "레퍼럴 보상 방식",
    referralRewardSystemAnswer:
      "내 추천 링크로 가입한 유저가 출석체크를 할 때마다 그 유저가 얻은 포인트의 10%를 추가로 획득합니다.",
    howToFindReferralLink: "내 초대 링크(추천인 링크) 확인하기",
    howToFindReferralLinkAnswer:
      "마이페이지 > 내 추천인에서 내 초대 링크를 확인하고 복사할 수 있습 니다",

    pointExchangeSection: "포인트 교환",
    availableCoins: "교환 가능한 코인",
    availableCoinsAnswer:
      "솔라나(SOL) 및 솔라나 체인 기반 밈코인 등 다양한 코인으로 교환할 수 있습니다.",
    howToExchange: "교환 방법",
    howToExchangeStep1: "'포인트 교환소' 메뉴에서 교환 신청을 진행해주세요.",
    howToExchangeStep2:
      "마이페이지 하단의 ‘내 포인트 교환 기록’에서 텔레그램을 클릭해주세요",
    howToExchangeStep3:
      "텔레그램 커뮤니티의 상단 공지사항의 안내에 따라주세요.",
    howToExchangeStep4: "팬텀(Phantom) 지갑의 솔라나 주소가 필요합니다.",
    processingTime: "처리 시간",
    processingTimeAnswer:
      "일반적으로 1시간 이내 처리되며, 상황에 따라 지연될 수 있습니다.",

    walletSecurity: "지갑 및 보안",
    isPhantomRequired: "팬텀 지갑이 꼭 필요한가요?",
    isPhantomRequiredAnswer:
      "네. Drop Quest는 솔라나 네트워크를 기반으로 합니다. 따라서 팬텀 지갑이 필요합니다.",
    wrongAddress: "주소 입력 실수 시",
    wrongAddressAnswer:
      "블록체인 특성상 잘못 전송된 코인은 복구가 불가능합니다. 전송 전 반드시 지갑 주소를 확인하세요.",
    coinsNotAppearing:
      "코인을 입금 받았는데, 팬텀 지갑에서 코인과 가격이 표시되지 않아요.",
    coinsNotAppearingAnswer:
      "기존 네트워크 방식이 아닌 새로운 네트워크에서 발행된 코인의 경우, 팬텀 지갑이 이를 신규 코인으로 인식하는 경우가 있습니다. 이는 코인 스왑 여부나 신뢰성과는 무관하므로 안심하셔도 됩니다. 자세한 해결 방법은 아래 지갑 가이드를 참고해주세요.",
    walletGuide: "지갑 가이드",
    viewAsImage: "이미지로 보기",
    walletGuideStep1: "팬텀 지갑 실행 → 코인 목록 우측 상단 [⋯] 클릭",
    walletGuideStep2: "입금 받은 코인의 우측 슬라이바 상태를 [ON]으로 변경",
    walletGuideStep3: "팬텀 지갑 메인 화면으로 돌아가서 입금받은 코인 클릭",
    walletGuideStep4: "하단의 [스팸 아님으로 신고] 버튼 클릭",
    walletGuideStep5: "이제부터 코인이 정상적으로 표시됩니다",
    searchForManagerEmail: "이름을 검색하세요",

    othersSection: "기타",
    canUseOnPC: "PC 이용 가능 여부",
    canUseOnPCAnswer: "Drop Quest는 모바일 버전만 지원합니다.",
    howToChangeLanguage: "언어 설정 변경",
    howToChangeLanguageAnswer:
      "메인 화면 우측 상단 🌐 아이콘에서 한국어 / 영어 / 중국어(지원 예정) 버전 전환이 가능합니다.",
    howToJoinEvents: "이벤트 참여",
    howToJoinEventsAnswer:
      "Drop Quest 플랫폼 내 공지사항 카테고리 또는 텔레그램 커뮤니티 채널을 통해 에어드랍 이벤트 및 보너스 소식이 주기적으로 안내됩니다.",

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
    managermanagement: "매니저 관리",
    numberOfUsers: "유저 수",
    registrationdate: "가입 일",
    managerEmail: "매니저 이메일",
    default: "기본",
    price: "가격순",
    popularity: "인기순",
    joincommunity: "DQ 커뮤니티 입장",
    commmunityevent: "커뮤니티 전용 이벤트가 있습니다.",
    phantom: "팬텀 지갑 다운로드"
    // ok: "확인",
    // cancel: "취소",
  },
};

const LanguageContext = createContext(undefined);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState("ko"); // Default to English

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && (savedLanguage === "ko" || savedLanguage === "en")) {
      setLanguage(savedLanguage);
    }
  }, []);

  const handleSetLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage: handleSetLanguage, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  //    fast refresh only works when a file only exports components. use a new file to share constants or function between components
  return context;
}
