import { Button } from "@/components/ui/button";
import umbrellaCoin from "@/assets/dqLogo.png";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import {
  ArrowBigLeftIcon,
  ArrowRight,
  ArrowRightFromLine,
  Info,
} from "lucide-react";
import Partners from "@/components/Partners";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import PhantomDownloadBanner from "@/components/PhantomDownloadBanner";

export default function DropQuestLanding() {
  const { t } = useLanguage();

  const frontMenu = [
    { label: t("announcements"), path: "/announcements" },
    { label: t("goToAirdrop"), path: "/air-drop" },
    { label: t("pointsForCoins"), path: "/point-exchange" },
    { label: t("qna"), path: "/question-answer" },
  ];

  return (
    <div className="min-h-screen pt-18 flex flex-col px-10 items-center bg-black text-white ">
      <div className="sm:w-[400px] sm:border sm:border-gray-700 rounded-lg mb-2  ">
        {/* HERO SECTION */}
        <section className="flex flex-col items-center  text-center px-4 sm:px-6 py-10 sm:py-12 space-y-">
          <div className="w-[94%] ml-4 flex gap-4 justify-between  px-1  pr-2 ">
            <div className="flex flex-col mt-6  space-y-2 text-xl text-left font-semibold">
              <p className="text-[18px]"> {t("airdrop")}</p>
              <p className="text-blue-600 font-semibold">{t("clickAnd")}</p>
              <p className="font-meduim">{t("Earn")}</p>
            </div>

            <img
              src={umbrellaCoin}
              alt="Airdrop Icon"
              className="w-36 sm:w-32 mb-6 drop-shadow-lg"
            />
          </div>

          {/* JOIN COMMUNITY SECTION */}
          <div className=" w-full h-22 flex justify-center items-center overflow-hidden border-2 bg--500 rounded-2xl py-2 mb-7">
            <Link to="https://t.me/+k1k8C9ftsL4wMmE1">
              <div className="text-3xl font-bold ">{t("joincommunity")}</div>
              <p className="text-gray-500">{t("communityevent")}</p>
            </Link>
          </div>

          <div className="space-y-4">
            {frontMenu.map(({ label, path }) => (
              <Button
                key={path}
                className="w-[80%] bg-amber-50 text-black px-10 sm:px-10 py-3 text-base sm:text-lg font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:text-white hover:shadow-xl"
                style={{
                  background: "bg-amber-50",
                }}
              >
                <Link
                  to={path}
                  className="flex items-center justify-center space-x-3 transition-all duration-300 hover:text-white"
                >
                  <span className="transition-all duration-300">{label}</span>
                  <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            ))}
          </div>
        </section>

        {/*DROP QUEST */}
        <section className="px-4 sm:px-6 pb-2">
          <div className="mt-1 border-2 p-2 rounded-2xl mb-8">
            <div className="flex items-center justify-center gap-2 mb-1">
              <h2 className="text-4xl font-bold">{t("clickAndEarn")}</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <button className="relative group">
                    <Info className="w-6 h-6 text-blue-400 hover:text-blue-300 transition-colors cursor-pointer" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-ping"></span>
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></span>
                  </button>
                </DialogTrigger>

                {/* ✅ Make modal full width relative to parent */}
                <DialogContent className="bg-black/90 border-gray-700 text-white w-full max-w-[90%] sm:max-w-[380px] mx-auto rounded-lg">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-center mb-0">
                      {t("clickAndEarn")}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-purple-500/20 to-blue-500/20 p-2 rounded-lg border border-purple-500/30">
                      <p className="text-gray-200 leading-relaxed">
                        {t("dropQuestDescription")}
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span>{t("activeNow")}</span>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <p className="text-gray-400 text-center text-xs max-w-md">
              {t("clickInfoIcon")}
            </p>
          </div>

          {/* <h3 className="text-base font-semibold mb-2">{t("connectingUsers")}</h3>
            <p className="text-gray-200 text-sm">{t("earnAirdrops")}</p> */}
          <div className=" w-[95%] space-y-5 sm:space-y-6 max-w-lg mx-auto">
            <div className="bg-main p-4 sm:p-5 rounded-2xl shadow-lg">
              <h3 className="text-base sm:text-lg font-semibold mb-1">
                {t("connectingUsers")}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm">
                {t("earnAirdrops")}
              </p>
            </div>
            <div className="bg-main p-2 sm:p-5 rounded-2xl shadow-lg">
              <h3 className="text-sm sm:text-lg font-bold mb-1">
                {t("blockchainrelated")}
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm">
                {t("allowsusers")}
              </p>
            </div>
            {/* <div className="bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg text-center">
            <h3 className="text-base sm:text-lg font-semibold">{t("comingSoon")}</h3>
          </div> */}
            <div className="bg-main bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg">
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

<div className="border-t-8 mt-4 w-[97%] border-blue-800 rounded-t-2xl mx-auto">

        <PhantomDownloadBanner />
</div>

        <Partners />
      </div>
    </div>
  );
}
