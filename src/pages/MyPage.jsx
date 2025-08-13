"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";
import { useLanguage } from "@/contexts/language-context";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw } from "lucide-react";
import umbrellaCoin from "@/assets/umbrella_coin.png";

// Mock user data
const mockUser = {
  name: "김코인",
  points: 1000000,
  referralCode: "1248soeniu13",
  referralList: [
    { id: 1, name: "박코인", points: 6000, joinDate: "2024-01-10" },
    { id: 2, name: "이코인", points: 4500, joinDate: "2024-01-12" },
    { id: 3, name: "최코인", points: 3200, joinDate: "2024-01-15" },
  ],
};

function MyPage() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState("points");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleCopyLink = async () => {
    const inviteLink = `drop-quest.com/referral=${mockUser.referralCode}`;
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* <Navbar user={mockUser} /> */}

      <div className="px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setActiveTab("points")}
            className={`px-6 py-2 rounded-full text-sm font-medium mr-3 ${
              activeTab === "points"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-gray-400 hover:text-white"
            }`}
          >
            {t("myPoints")}
          </button>
          <button
            onClick={() => setActiveTab("referrer")}
            className={`px-6 py-2 rounded-full text-sm font-medium ${
              activeTab === "referrer"
                ? "bg-blue-600 text-white"
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
                  {mockUser.points.toLocaleString()}
                </span>
                <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                  <span className="text-yellow-900 font-bold">$</span>
                </div>
              </div>

              <div className="flex  justify-center">
                <Button
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                  className="bg-blue-600 hover:bg-blue-700 w-full px-25 py-2 rounded-full"
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
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-2">{t("myInvitationLink")}</h3>
              <div className="bg-black rounded p-3 mb-3 flex items-center justify-between">
                <code className="text-purple-300 text-sm break-all flex-1">
                  drop-quest.com/referral={mockUser.referralCode}
                </code>
                <button
                  onClick={handleCopyLink}
                  className="ml-2 text-gray-400 hover:text-white flex-shrink-0"
                >
                  <Copy size={16} />
                </button>
              </div>
              <p className="text-gray-400 text-sm mb-2">
                {language === "en"
                  ? "Copy your invitation link and invite friends to DQ!"
                  : "초대 링크를 복사하여 친구들을 DQ에 초대하세요!"}
              </p>
              <p className="text-gray-400 text-sm">
                {language === "en"
                  ? "The more friends you invite, the more points and benefits you can earn."
                  : "더 많은 친구를 초대할수록 더 많은 포인트와 혜택을 얻을 수 있습니다."}
              </p>
            </div>

            {/* My Referral List */}
            <div className="bg-gray-900 rounded-lg p-4">
              <h3 className="font-semibold mb-4">{t("myReferralList")}</h3>
              <div className="flex justify-between text-sm text-gray-400 mb-3">
                <span>{language === "en" ? "Name" : "이름"}</span>
                <span>
                  {language === "en" ? "Points Balance" : "포인트 잔액"}
                </span>
              </div>

              {mockUser.referralList.map((referral, index) => (
                <div
                  key={referral.id}
                  className="py-3 border-b border-gray-800 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{index + 1}</span>
                      <span className="font-medium">{referral.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">
                        {referral.points.toLocaleString()}
                      </span>
                      <div className="w-5 h-5 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
                        <span className="text-yellow-900 font-bold text-xs">
                          $
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-1 ml-6">
                    <span className="text-xs text-gray-400">
                      {language === "en" ? "Joined: " : "가입일: "}
                      {referral.joinDate}
                    </span>
                  </div>
                  {/* <div className="mt-1 ml-6">
                    <span className="text-xs text-gray-500">
                      {language === "en" ? "Points Balance" : "포인트 잔액"}
                    </span>
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPage;
