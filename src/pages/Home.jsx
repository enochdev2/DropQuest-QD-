import { Button } from "@/components/ui/button";
import umbrellaCoin from "@/assets/dqLogo.png";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import { ArrowBigLeftIcon, ArrowRight, ArrowRightFromLine } from "lucide-react";

export default function DropQuestLanding() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <div className="sm:w-[400px] sm:border sm:border-gray-700 rounded-lg  ">

      {/* HERO SECTION */}
      <section className="flex flex-col X items-center  text-center px-4 sm:px-6 py-10 sm:py-12">
        <div className="w-[90%] flex   sm:w-[400px] gap-4 justify-between  px-4 sm:pr-10 pr-8">
          <div className="flex flex-col  space-y-3 text-2xl text-left">
            <p> Airdrop</p>
            <p className="text-blue-600">Click and</p>
            <p>Earn</p>
          </div>

          <img
            src={umbrellaCoin}
            alt="Airdrop Icon"
            className="w-36 sm:w-32 mb-6 drop-shadow-lg"
          />
        </div>
        {/* <p className="text-gray-300 text-sm sm:text-base max-w-md mb-6">
           {t("connectingUsers")}
            <br />
            {t("earnAirdrops")}
        </p> */}

        <Button
          className=" w-[80%] bg-amber-50 text-black  px-24 sm:px-10 py-3 text-base sm:text-lg font-semibold rounded-full "
          // style={{
          //   background: "linear-gradient(to right, #0d0b3e, #3d2abf)",
          // }}
        >
          <Link to="/air-drop" className="flex items-center space-x-3">{t("goToAirdrop")} <ArrowRight className="w-20 ml-3" size={60}/> </Link>
        </Button>
      </section>

      {/* ROADMAP SECTION */}
      <section className="px-4 sm:px-6 pb-12">
        <h2 className="text-4xl  font- text-center mb-6 sm:mb-8">
          Roadmap
        </h2>
        {/* <h3 className="text-base font-semibold mb-2">{t("connectingUsers")}</h3>
            <p className="text-gray-200 text-sm">{t("earnAirdrops")}</p> */}
        <div className=" w-[90%] space-y-5 sm:space-y-6 max-w-lg mx-auto">
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
    </div>
  );
}
