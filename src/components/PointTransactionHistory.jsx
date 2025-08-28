import React from "react";

export default function PointTransactionHistory() {
  const transactions = [
    // { usage: "1000 point", token: "GLM", check: "Telegram message" },
    // { usage: "2000 point", token: "GLM", check: "Telegram message" },
    // { usage: "5000 point", token: "GLM", check: "Telegram message" },
  ];

  return (
    <div className="w-full bg-black text-white flex flex-col items-center px-4 py-6 overflow-hidden">
      {/* Title */}
      <h1 className="text-lg font-bold border-t border-b border-white py-3 w-full text-center">
        My Point Transaction History
      </h1>

      {/* Header */}
      <div className="flex justify-between w-full mt-4 text-sm font-semibold">
        <button className="bg-blue-600 px-3 py-1 rounded">Usage</button>
        <button className="bg-blue-600 px-3 py-1 rounded">Token Name</button>
        <button className="bg-blue-600 px-3 py-1 rounded">Check</button>
      </div>

      {/* Transactions */}
      <div className="mt-4 w-full divide-y divide-gray-600 text-sm">
        {transactions.length > 0 ? (
          transactions.map((tx, i) => (
            <div key={i} className="flex justify-between items-center py-3">
              <span>{tx.usage}</span>
              <span>{tx.token}</span>
              <span className="text-blue-400">{tx.check}</span>
            </div>
          ))
        ) : (
          <div className="text-center text-2xl py-6 text-gray-400">
            No transaction history found
          </div>
        )}
      </div>
    </div>
  );
}
