import { Button } from "@/components/ui/button";
import umbrellaCoin from "@/assets/umbrella_coin.png"; // Your uploaded image

export default function DropQuestLanding() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-4 sm:px-6 py-10 sm:py-12">
        <img
          src={umbrellaCoin}
          alt="Airdrop Icon"
          className="w-50 sm:w-32 mb-6 drop-shadow-lg"
        />
        <h1 className="text-2xl sm:text-4xl font-bold mb-3">Click & Earn</h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-sm mb-6">
          Earn rewards instantly by completing missions and participating in our airdrops.
        </p>
        <Button
          className="w-full sm:w-auto px-5 sm:px-6 py-3 text-base sm:text-lg font-semibold rounded-full"
          style={{
            background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
          }}
        >
          Claim Airdrop
        </Button>
      </section>

      {/* ROADMAP SECTION */}
      <section className="px-4 sm:px-6 pb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
          Roadmap
        </h2>
        <div className="space-y-5 sm:space-y-6 max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-1">
              Connect Users to Strategic Opportunities
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
              Earn rewards through missions and exclusive airdrops.
            </p>
          </div>
          <div className="bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg text-center">
            <h3 className="text-base sm:text-lg font-semibold">Coming Soon</h3>
          </div>
          <div className="bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-1">
              Connect Users with Users
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
              Share valuable opportunities directly with other users.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
