import { Button } from "@/components/ui/button";
import umbrellaCoin from "@/assets/umbrella_coin.png"; 
import { useLanguage } from "@/contexts/language-context"


export default function DropQuestLanding() {
 const { t } = useLanguage()
    
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center px-4 sm:px-6 py-10 sm:py-12">
        <img
          src={umbrellaCoin}
          alt="Airdrop Icon"
          className="w-50 sm:w-32 mb-6 drop-shadow-lg"
        />
        <h1 className="text-2xl sm:text-4xl font-bold mb-3">{t("clickAndEarn")}</h1>
        {/* <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
           {t("connectingUsers")}
            <br />
            {t("earnAirdrops")}
        </p> */}
     
        <Button
          className="max-w-full  px-24 sm:px-10 py-3 text-base sm:text-lg font-semibold rounded-full"
          style={{
            background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
          }}
        >
            {t("goToAirdrop")}
        </Button>
      </section>

      {/* ROADMAP SECTION */}
      <section className="px-4 sm:px-6 pb-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
          Roadmap
        </h2>
         {/* <h3 className="text-base font-semibold mb-2">{t("connectingUsers")}</h3>
            <p className="text-gray-200 text-sm">{t("earnAirdrops")}</p> */}
        <div className="space-y-5 sm:space-y-6 max-w-lg mx-auto">
          <div className="bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-1">
               {t("connectingUsers")}
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
              {t("earnAirdrops")}
            </p>
          </div>
          <div className="bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg text-center">
            <h3 className="text-base sm:text-lg font-semibold">Coming Soon</h3>
          </div>
          <div className="bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg">
             {/* <h3 className="text-base font-semibold mb-2">{t("connectingUsersToUsers")}</h3>
            <p className="text-gray-200 text-sm">{t("directOpportunities")}</p> */}
            <h3 className="text-base sm:text-lg font-semibold mb-1">
             {t("connectingUsersToUsers")}
            </h3>
            <p className="text-gray-200 text-xs sm:text-sm">
          {t("directOpportunities")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
