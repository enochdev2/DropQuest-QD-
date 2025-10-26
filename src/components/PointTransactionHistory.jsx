"use client";

import { useLanguage } from "@/contexts/language-context";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const telegramSteps = [
  {
    step: 1,
    title: {
      en: "Click Point Exchange Announcement",
      ko: "포인트 교환 공지사항 클릭",
    },
    description: {
      en: "After entering the community, please click the [Point Exchange Announcement] in the pinned messages.",
      ko: "커뮤니티 입장 후, 고정된 메시지의 [포인트 교환 공지사항]을 클릭해주세요.",
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B7%B8%EB%A6%BC9-AvWltWjcOtJPCTaKs7xUfoHOnae1zu.png",
  },
  {
    step: 2,
    title: {
      en: "Click Comments Section",
      ko: "댓글 섹션 클릭",
    },
    description: {
      en: "Please click the comments under the [Point Exchange Announcement].",
      ko: "[포인트 교환 공지사항]의 댓글을 클릭해주세요.",
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B7%B8%EB%A6%BC10-t4HWCYmugRHxxq2JanQlz5hHm8dM5Y.png",
  },
  {
    step: 3,
    title: {
      en: "Leave Exchange Request Comment",
      ko: "교환 신청 댓글 남기기",
    },
    description: {
      en: 'Please leave a comment saying "Point Exchange Request."',
      ko: "'포인트 교환 신청'을 댓글로 남겨주세요.",
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B7%B8%EB%A6%BC11-PjMuifp6pWrkW0Mu3JYgBpUISCQkkZ.png",
  },
  {
    step: 4,
    title: {
      en: "Wait for Support Agent",
      ko: "상담원 메시지 대기",
    },
    description: {
      en: "After that, please wait a moment — a support agent will message you privately.",
      ko: "이후, 잠시만 기다려주시면 상담원이 개인적으로 메시지를 드립니다.",
    },
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EA%B7%B8%EB%A6%BC11-PjMuifp6pWrkW0Mu3JYgBpUISCQkkZ.png",
  },
];

export default function PointTransactionHistory({ tokenSlot }) {
  console.log("🚀 ~ PointTransactionHistory ~ tokenSlots:", tokenSlot);
  const { language } = useLanguage();
  const [showTelegramGuide, setShowTelegramGuide] = useState(false);

  const handleTelegramClick = (e) => {
    e.preventDefault();
    setShowTelegramGuide(true);
  };

  const handleJoinCommunity = () => {
    window.open("https://t.me/+k1k8C9ftsL4wMmE1", "_blank");
    setShowTelegramGuide(false);
  };

  return (
    <>
      <div className="w-full text-white flex flex-col items-center py-4 my-2 overflow-hidden">
        {/* Title */}
        <h1 className="text-lg font-bold border-t border-b border-white py-3 w-full text-center">
          {language === "en"
            ? "My Point Transaction History"
            : "내 포인트 교환 기록"}
        </h1>

        {/* Table */}
        <div className="relative min-h-auto bg-main px-2 mt-5 rounded-2xl">
          <table className="w-full mt-4 border border-gray-600 text-sm">
            <thead>
              <tr className="bg-[#000b7d] text-white">
                <th className="px-4 py-2 text-left">
                  {language === "en" ? "Usage" : "사용"}
                </th>
                <th className="px-4 py-2 text-left">
                  {language === "en" ? "Token Name" : "토큰 이름"}
                </th>
                <th className="px-4 py-2 text-left">
                  {language === "en" ? "Check" : "문의처"}
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenSlot && tokenSlot?.length > 0 ? (
                tokenSlot?.map((slot, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="px-4 py-2">{slot.pointExchanged || "-"}</td>
                    <td className="px-4 py-2">{slot.tokenName || "-"}</td>
                    <td className="px-4 py-2 text-blue-400">
                      <button
                        onClick={handleTelegramClick}
                        className="hover:underline cursor-pointer"
                      >
                        {language === "en" ? "Telegram" : "텔레그램"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="text-center text-2xl py-6 text-gray-400"
                  >
                    {language === "en"
                      ? "No transaction history found"
                      : "거래 내역이 없습니다"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog  open={showTelegramGuide} onOpenChange={setShowTelegramGuide}>
        <DialogContent className="lg:max-w-[380px] max-w-[380px] auto max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mb-6">
              {language === "en"
                ? "How to Exchange Points"
                : "포인트 교환하는 방법"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 ">
            {telegramSteps.map((item) => (
              <div key={item.step} className="bg-gray-800 rounded-lg p-4 ">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-lg">
                    {language === "en" ? item.title.en : item.title.ko}
                  </h3>
                </div>
                <p className="text-sm text-gray-300 ml-13 mb-3">
                  {language === "en"
                    ? item.description.en
                    : item.description.ko}
                </p>
                <div className="ml-3 bg-gray-700/50 rounded-lg p-3 flex items-center justify-center min-h-[200px]">
                  <img
                    src={item.image}
                    className="rounded-lg max-w-[100%] h-auto"
                  />
                </div>
              </div>
            ))}

            {/* Final Message */}
            <div className="bg-blue-900/30 border-2 border-blue-600/50 rounded-lg p-6">
              <p className="text-blue-400 font-bold text-center text-lg mb-3">
                {language === "en"
                  ? "Have you fully understood the point exchange process?"
                  : "포인트 교환 프로세스를 모두 숙지하셨나요?"}
              </p>
              <p className="text-blue-300 text-center text-base mb-2">
                {language === "en"
                  ? "Now, join our community!"
                  : "이제, 우리 커뮤니티에 합류하세요!"}
              </p>
              <p className="text-blue-200 text-center text-sm">
                {language === "en"
                  ? "Click the button below to go to the DQ Community."
                  : "아래의 버튼을 클릭하면 DQ 커뮤니티로 이동합니다."}
              </p>
            </div>

            {/* Join Community Button */}
            <Button
              onClick={handleJoinCommunity}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg text-lg"
            >
              {language === "en"
                ? "Join DQ Community"
                : "DQ 커뮤니티에 입장하기"}
            </Button>

            {/* Close Button */}
            <button
              onClick={() => setShowTelegramGuide(false)}
              className="w-full text-center text-sm text-gray-400 hover:text-white py-2"
            >
              {language === "en" ? "Close" : "아래로 나가기"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
