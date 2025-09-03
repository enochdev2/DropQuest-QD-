import React from "react";

export default function PointTransactionHistory({ tokenSlot }) {
  console.log("🚀 ~ PointTransactionHistory ~ tokenSlots:", tokenSlot);

  return (
    <div className="w-full bg-black text-white flex flex-col items-center px-1 py-6 overflow-hidden">
      {/* Title */}
      <h1 className="text-lg font-bold border-t border-b border-white py-3 w-full text-center">
        My Point Transaction History
      </h1>

      {/* Table */}
      <table className="w-full mt-4 border border-gray-600 text-sm">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="px-4 py-2 text-left">Usage</th>
            <th className="px-4 py-2 text-left">Token Name</th>
            <th className="px-4 py-2 text-left">Check</th>
          </tr>
        </thead>
        <tbody>
          {tokenSlot && tokenSlot?.length > 0 ? (
            tokenSlot?.map((slot, i) => (
              <tr key={i} className="border-t border-gray-700">
                <td className="px-4 py-2">{slot.pointExchanged || "-"}</td>
                <td className="px-4 py-2">{slot.tokenName || "-"}</td>
                <td className="px-4 py-2 text-blue-400">
                  <a href="https://telegram.com" target="_blank" rel="noreferrer">
                    Telegram message
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
  );
}
