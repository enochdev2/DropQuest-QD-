import { Button } from "@/components/ui/button";
import umbrellaCoin from "@/assets/dqLogo.png";
import { useLanguage } from "@/contexts/language-context";
import { Link } from "react-router-dom";
import { ArrowBigLeftIcon, ArrowRight, ArrowRightFromLine } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DropQuestLanding() {
  const { t } = useLanguage();

  const cards = [
    {
      title: t("connectingUsersToUsers"),
      text: t("directOpportunities"),
    },
    {
      title: t("connectingUsers"),
      text: t("earnAirdrops"),
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // Slide every 4 seconds
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white">
      <div className="sm:w-[400px] sm:border sm:border-gray-700 rounded-lg  ">
        {/* HERO SECTION */}
        <section className="flex flex-col X items-center  text-center px-4 sm:px-6 py-10 sm:py-12">
          <div className="w-[90%] flex   sm:w-[400px] gap-4 justify-between  px-4 sm:pr-10 pr-8">
            <div className="flex flex-col  space-y-3 text-2xl text-left">
              <p> {t("airdrop")}</p>
              <p className="text-blue-600">{t("clickAnd")}</p>
              <p>{t("Earn")}</p>
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

          <div className="flex-row  space-y-4 justify-center items-center gap-6 mt-8">
            <Link
              to="/air-drop"
              className="w-[80%] sm:w-auto bg-amber-50 text-black px-5  py-3 text-base sm:text-lg font-semibold rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:bg-amber-100 hover:scale-105"
            >
              <span>{t("goToAirdrop")}</span>
              <ArrowRight className="ml-3 w-6 h-6 sm:w-8 sm:h-8" />
            </Link>

            <Link
              to="/point-exchange"
              className="w-[80%] sm:w-auto bg-amber-50 text-black px-5 py-3 text-base sm:text-lg font-semibold rounded-full flex items-center justify-center space-x-3 transition-all duration-300 hover:bg-amber-100 hover:scale-105"
            >
              <span>{t("pointsForCoins")}</span>
              <ArrowRight className="ml-3 w-6 h-6 sm:w-8 sm:h-8" />
            </Link>
          </div>
        </section>

        {/* ROADMAP SECTION */}
        <section className="px-4 sm:px-6 pb-12">
          <h2 className="text-4xl  font- text-center mb-6 sm:mb-8">
            {t("roadmap")}
          </h2>
          {/* <h3 className="text-base font-semibold mb-2">{t("connectingUsers")}</h3>
            <p className="text-gray-200 text-sm">{t("earnAirdrops")}</p> */}
          <div className="w-[90%] space-y-5 sm:space-y-6 max-w-lg mx-auto">
            {/* SLIDER SECTION */}
            <div className="relative overflow-hidden h-32 sm:h-36 rounded-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.9, ease: "easeInOut" }}
                  className="absolute w-full h-full bg-gradient-to-r from-[#0d0b3e] to-[#3d2abf] p-4 sm:p-5 rounded-2xl shadow-lg flex flex-col justify-center"
                >
                  <h3 className="text-base sm:text-lg font-semibold mb-1 text-white">
                    {cards[index].title}
                  </h3>
                  <p className="text-gray-200 text-xs sm:text-sm">
                    {cards[index].text}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation dots */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {cards.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === index ? "bg-white scale-125" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* COMING SOON SECTION */}
            <div className="bg-gray-800 p-4 sm:p-5 rounded-2xl shadow-lg text-center">
              <h3 className="text-base sm:text-lg font-semibold">
                {t("comingSoon")}
              </h3>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
