import { useLanguage } from "@/contexts/language-context";
import React from "react";

export default function PointTransactionHistory({ tokenSlot }) {
  console.log("🚀 ~ PointTransactionHistory ~ tokenSlots:", tokenSlot);
  const { language } = useLanguage();

  return (
    <div className="w-full  text-white flex flex-col items-center  py-4 my-2 overflow-hidden">
      {/* Title */}
      <h1 className="text-lg font-bold border-t border-b border-white py-3 w-full text-center">
        {language === "en"
          ? "My Point Transaction History"
          : "내 포인트 교환 기록"}
      </h1>

      {/* Table */}
      <div className="relative min-h-auto bg-cover bg-center bg-no-repeat bg-[url('bg.png')] px-2 mt-5 rounded-2xl">
      <table className="w-full  mt-4 border border-gray-600 text-sm">
        <thead>
          <tr className="bg-[#000b7d] text-white">
            <th className="px-4 py-2 text-left">
              {" "}
              {language === "en" ? "Usage" : "사용"}{" "}
            </th>
            <th className="px-4 py-2 text-left">
              {language === "en" ? " Token Name" : "토큰 이름"}{" "}
            </th>
            <th className="px-4 py-2 text-left">
              {language === "en" ? " Check" : "문의처"}
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
                  <a
                    href="https://t.me/+gogCuEqAyzhhZGQ1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {language === "en"
                      ? " Telegram message"
                      : "텔레그램 메시지 확인"}
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-2xl py-6 text-gray-400"
              >
                No transaction history found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  );
}
