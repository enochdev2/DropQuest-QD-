import WalletGuideDialog from "@/components/Homapage/WalletGuideDialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/language-context";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

const QuestionNAnswer = () => {
  const { t, language } = useLanguage();
  const [openSections, setOpenSections] = useState({});
  const [showWalletGuide, setShowWalletGuide] = useState(false);

  // const toggleSection = (section) => {
  //   setOpenSections((prev) => ({
  //     ...prev,
  //     [section]: !prev[section],
  //   }));
  // };

  const toggleSection = (section) => {
  setOpenSections((prev) => {
    // If the same section is clicked again, close it
    if (prev[section]) {
      return {};
    }
    // Otherwise, close all others and open the clicked one
    return { [section]: true };
  });
};


  const qnaData = [
    {
      category: t("basicUsage"),
      items: [
        {
          question: t("whatIsDropQuest"),
          answer: t("whatIsDropQuestAnswer"),
        },
        {
          question: t("howToCheckIn"),
          answer: t("howToCheckInAnswer"),
        },
      ],
    },
    {
      category: t("pointsSection"),
      items: [
        {
          question: t("dailyPointsEarned"),
          answer: t("dailyPointsEarnedAnswer"),
        },
        {
          question: t("howToCheckPoints"),
          answer: t("howToCheckPointsAnswer"),
        },
      ],
    },
    {
      category: t("referralSection"),
      items: [
        {
          question: t("referralRewardSystem"),
          answer: t("referralRewardSystemAnswer"),
        },
        {
          question: t("howToFindReferralLink"),
          answer: t("howToFindReferralLinkAnswer"),
        },
      ],
    },
    {
      category: t("pointExchangeSection"),
      items: [
        {
          question: t("availableCoins"),
          answer: t("availableCoinsAnswer"),
        },
        {
          question: t("howToExchange"),
          answer: (
            <div className="space-y-2">
              <p>• {t("howToExchangeStep1")}</p>
              <p>• {t("howToExchangeStep2")}</p>
              <p>• {t("howToExchangeStep3")}</p>
              <p>• {t("howToExchangeStep4")}</p>
            </div>
          ),
        },
        {
          question: t("processingTime"),
          answer: t("processingTimeAnswer"),
        },
      ],
    },
    {
      category: t("walletSecurity"),
      items: [
        {
          question: t("isPhantomRequired"),
          answer: t("isPhantomRequiredAnswer"),
        },
        {
          question: t("wrongAddress"),
          answer: t("wrongAddressAnswer"),
        },
        {
          question: t("coinsNotAppearing"),
          answer: (
            <div className="space-y-3">
              <p>{t("coinsNotAppearingAnswer")}</p>
              {language === "ko" && (
                <>
                  <p className="font-semibold">{t("walletGuide")}</p>
                  <ul className="space-y-1 text-sm">
                    <li>• {t("walletGuideStep1")}</li>
                    <li>• {t("walletGuideStep2")}</li>
                    <li>• {t("walletGuideStep3")}</li>
                    <li>• {t("walletGuideStep4")}</li>
                    <li>• {t("walletGuideStep5")}</li>
                  </ul>
                  <Button
                    onClick={() => setShowWalletGuide(true)}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {t("viewAsImage")}
                  </Button>
                </>
              )}
            </div>
          ),
        },
      ],
    },
    {
      category: t("othersSection"),
      items: [
        {
          question: t("canUseOnPC"),
          answer: t("canUseOnPCAnswer"),
        },
        {
          question: t("howToChangeLanguage"),
          answer: t("howToChangeLanguageAnswer"),
        },
        {
          question: t("howToJoinEvents"),
          answer: t("howToJoinEventsAnswer"),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-18 flex flex-col px-2 items-center bg-black text-white ">
      <div className="sm:w-[400px] sm:border sm:border-gray-700 rounded-lg mb-2 relative your-parent-class">
        <div className="px-4 py-3 max-w-4xl mx-auto">
          <div className="mb-4 text-center">
            <h1 className="text-3xl font-bold mb-2">{t("qnaTitle")}</h1>
            <p className="text-gray-300 text-sm">
              {language === "en"
                ? "Frequently Asked Questions"
                : "자주 묻는 질문"}
            </p>
          </div>

          <div className="space-y-6">
            {qnaData.map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="bg-main rounded-xl py-4 px-3 backdrop-blur-sm"
              >
                <h2 className="text-xl font-bold mb-4 text-blue-200">
                  {section.category}
                </h2>
                <div className="space-y-3">
                  {section.items.map((item, itemIndex) => {
                    const key = `${sectionIndex}-${itemIndex}`;
                    const isOpen = openSections[key];

                    return (
                      <div
                        key={itemIndex}
                        className="bg-black/50 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() => toggleSection(key)}
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition-colors"
                        >
                          <span className="font-semibold text-white pr-4">
                            {item.question}
                          </span>
                          {isOpen ? (
                            <ChevronUp
                              className="flex-shrink-0 text-blue-400"
                              size={20}
                            />
                          ) : (
                            <ChevronDown
                              className="flex-shrink-0 text-gray-400"
                              size={20}
                            />
                          )}
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 text-gray-100 text-sm leading-relaxed border-t border-gray-700/50 pt-3">
                            {typeof item.answer === "string" ? (
                              <p>{item.answer}</p>
                            ) : (
                              item.answer
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {language === "ko" && (
          <div className="absolute flex items-center justify-center bg-black/50 z-50">
            <WalletGuideDialog
              open={showWalletGuide}
              onOpenChange={setShowWalletGuide}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionNAnswer;
