"use client";

import umbrellaCoin from "@/assets/dqLogo.png";
import coin from "@/assets/dqcoin.png";
import PointTransactionHistory from "@/components/PointTransactionHistory";
import { SuccessToast } from "@/components/Success";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { getUserProfile, getUserReferralList, getUserTokenSlots } from "@/lib/utilityFunction";
import { Copy, Loader2, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";


function MyPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("points");
  const [userProfile, setUserProfile] = useState({});
  const [userReferralLst, setUserReferralLst] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [, setCopySuccess] = useState(false);
  const [tokenSlots, setTokenSlots] = useState([]);

  useEffect(() => {
    getUserProfileDetails();
    getUserReferralListDetails();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await getUserProfileDetails();
    setIsRefreshing(false);
  };

  const handleCopyLink = async () => {
    // const inviteLink = `http://localhost:5173/Login?referral=${userProfile?.referralCode}`;
    const inviteLink = `https://www.drop-quest.com/login?referral=${userProfile?.referralCode}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopySuccess(true);
      SuccessToast(
        language === "en"
          ? "Invitation link copied to clipboard!"
          : "내 추천인 링크를 복사했습니다 !"
      );
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const getUserProfileDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const user = await getUserProfile(userInfo.email);
    const userSlots = await getUserTokenSlots();
    setTokenSlots(userSlots);
    // console.log("🚀 ~ getUserProfileDetails ~ user:", user);
    setUserProfile(user);
  };

  const getUserReferralListDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const userReferralLsts = await getUserReferralList(userInfo.referralCode);
    setUserReferralLst(userReferralLsts);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-18">
      {/* <Navbar user={mockUser} /> */}

      <div className="px-4 py-6 sm:w-[400px] mx-auto sm:border border-gray-700 h-fit rounded-2xl">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setActiveTab("points")}
            className={`px-6 py-2 rounded-full text-sm font-medium mr-3 ${
              activeTab === "points"
                ? "bg-[#000b7d] text-white font-medium"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {t("myPoints")}
          </button>
          <button
            onClick={() => setActiveTab("referrer")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeTab === "referrer"
                ? "bg-[#000b7d] text-white font-bold"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {t("myReferrer")}
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === "points" && (
          <div className="space-y-6">
            <div className="flex justify-center mb-2">
              <div className="relative">
                <img
                  src={umbrellaCoin}
                  alt="Airdrop Icon"
                  className="w-30 sm:w-32  drop-shadow-lg"
                />
              </div>
            </div>

            {/* My Points Section */}
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-6">{t("myPoints")}</h2>

              {/* Points Display */}
              <div className="bg-white max-w-full text-black rounded-full px-25 py-2 inline-flex items-center gap-3 mb-6">
                <span className="text-2xl font-bold">
                  {/* {mockUser.points.toLocaleString()} */}
                  { }
                  {!userProfile?.points ? <Loader2 className=" animate-spin" /> : userProfile.points?.totalPoints.toLocaleString()}
                </span>
                <img
                  src={coin}
                  alt="coin"
                  className="w-10 h-8 justify-self-end"
                />
              </div>

              <div className="flex  justify-center">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-[#000b7d] hover:bg-blue-700 w-full px-25 py-2 rounded-full"
                >
                  <RefreshCw
                    size={16}
                    className={`mr-2 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                  {t("refresh")}
                </Button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "referrer" && (
          <div className="space-y-6">
            {/* My Invitation Link */}
            <div className=" min-h-auto bg-main rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t("myInvitationLink")}</h3>
              <div className="bg-black rounded p-3 mb-3 flex items-center justify-between">
                <code className="text-purple-100 text-sm break-all flex-1">
                  drop-quest.com/login?referral={userProfile?.referralCode}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="ml-2 text-gray-100 hover:text-white flex-shrink-0 cursor-pointer"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-gray-100 text-sm mb-2">
                {language === "en"
                  ? "Copy your invitation link and invite friends to DQ!"
                  : "초대 링크를 복사하여 친구들을 DQ에 초대하세요!"}
              </p>
              <p className="text-gray-100 text-sm">
                {language === "en"
                  ? "The more friends you invite, the more points and benefits you can earn."
                  : "더 많은 친구를 초대할수록 더 많은 포인트와 혜택을 얻을 수 있습니다."}
              </p>
            </div>

            {/* My Referral List */}
            <div className="bg-main rounded-lg p-4">
              <h3 className="font-semibold mb-4">{t("myReferralList")}</h3>
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>{language === "en" ? "Name" : "이름"}</span>
                <span>
                  {language === "en" ? "Points Balance" : "포인트 잔액"}
                </span>
              </div>

              {!userReferralLst || userReferralLst.length === 0 ? (
                <div className="text-center py-6 text-gray-400">
                  {language === "en"
                    ? "No referrals found."
                    : "추천인이 없습니다."}
                </div>
              ) : (
                userReferralLst.map((referral, index) => (
                  <div
                    key={referral._id}
                    className="py-3 border-b border-gray-800 last:border-b-0"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{index + 1}</span>
                        <span className="font-medium">{referral.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">
                          {referral?.points?.totalPoints?.toLocaleString()}
                        </span>
                        {/* <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                          <span className="text-yellow-900 font-bold text-xs">
                            $
                          </span>
                        </div> */}
                      </div>
                    </div>
                    <div className="mt-1 ml-6">
                      <span className="text-xs text-gray-400">
                        {language === "en" ? "Joined: " : "가입일: "}
                        {new Date(referral.createdAt).toLocaleDateString(
                          "en-US"
                        )}
                      </span>
                    </div>
                    {/* <div className="mt-1 ml-6">
                    <span className="text-xs text-gray-500">
                      {language === "en" ? "Points Balance" : "포인트 잔액"}
                    </span>
                  </div> */}
                  </div>
                ))
              )}
            </div>
          </div>
        )}


       <PointTransactionHistory  tokenSlot={tokenSlots} />
      </div>

    </div>
  );
}

export default MyPage;
