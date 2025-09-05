import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronDown, Loader2 } from "lucide-react";
// import { useLanguage } from "@/contexts/LanguageProvider"
// import { getTokenSlots, submitPointExchange, getUserProfile } from "@/lib/utils"
import toast from "react-hot-toast";
import { useLanguage } from "@/contexts/language-context";
import {
  getTokenSlots,
  getUserProfile,
  submitPointExchange,
} from "@/lib/utilityFunction";
import { useNavigate } from "react-router-dom";

const initialSlots = [
  {
    id: 1,
    tokenName: "GLM",
    pointRatio: "$GLM",
    isConfigured: true,
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png",
  },
  ...Array.from({ length: 9 }, (_, i) => ({
    id: i + 2,
    tokenName: "BTC",
    // pointRatio: Math.floor(Math.random() * 100) + 1, // random points
    pointRatio: "$???", // random points
    isConfigured: true,
    img: "https://raw.githubusercontent.com/enochdev2/token-metadata/main/DQ%20Bitcoin%20Image.png",
  })),
];

function PointExchange() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [, setUserPoints] = useState(0);
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [tokenSlots, setTokenSlots] = useState(initialSlots);
  // const [tokenSlots, setTokenSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    getUserProfileDetails();
  }, []);

  const getUserProfileDetails = async () => {
    const userInfo = JSON.parse(localStorage.getItem("user"));
    const user = await getUserProfile(userInfo.email);
    setUserPoints(user?.points?.totalPoints);
    const userSlots = await getTokenSlots(userInfo._id);
    setTokenSlots(userSlots);
    setLoading(false);

    setUserProfile(user);
  };

  // const handleTokenClick = (token) => {
  //   if (!token.isConfigured) {
  //     toast.error("This token slot is not available yet.");
  //     return;
  //   }
  //   setSelectedToken(token);
  //   setShowExchangeModal(true);
  // };

  const handleExchange = async (slotId) => {
    console.log("🚀 ~ handleExchange ~ slotId:", slotId);
    if (!selectedToken) return;

    const amount = Number.parseInt(exchangeAmount);

    if (!amount || amount <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    if (amount % 1000 !== 0) {
      toast.error("Points can only be entered in units of 1000.");
      return;
    }

    if (amount > userProfile?.points?.totalPoints) {
      toast.error("Insufficient points. Please check your points on My Page.");
      return;
    }
    if (selectedToken?.points > amount  ) {
      toast.error("Insufficient points. Please check your points on My Page.");
      return;
    }

    try {
      setSubmitting(true);

      await submitPointExchange(slotId, amount);

      // setUserPoints((prev) => prev - amount);
      toast.success("The exchange request has been completed.");

      setShowExchangeModal(false);
      setExchangeAmount("");
      navigate("/my-page");
      setSelectedToken(null);
    } catch (error) {
      console.error("Exchange error:", error);
      toast.error("Failed to process exchange. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden  bg-black text-white">
      <div className="sm:w-[400px] mx-auto border-2 border-gray-700  rounded-2xl">
        <div className=" bg-gray-950 py-3 px-4">
          <div className=" text-center">
            <h1 className="text-3xl font-bold mb-3 text-white">
              {t("pointExchangeTitle")}
            </h1>
            <p className="text-sm text-gray-300 mb-4">
              Exchange your accumulated points for various cryptocurrencies
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-1.5 mb-2 inline-block">
              <p className="text-base">
                <span className="text-gray-300">{t("availablePoints")}: </span>
                <span className="text-xl font-bold text-blue-400">
                  {/* {userPoints?.toLocaleString() } */}
                  {userProfile?.points?.totalPoints.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <ChevronDown className="w-6 h-6 animate-bounce text-gray-400" />
            </div>
          </div>
        </div>
        <div className="py-6 px-2">
          <div className="">
            <h2 className="text-2xl font-bold text-center mb-3 text-white">
              {t("availableTokens")}
            </h2>

            {/* Scrollable container */}
            <div className="max-h-96 px-2 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-700 scrollbar-track-gray-900 rounded-lg">
              <div className="grid grid-cols-3 gap-2">
                {tokenSlots.map((token) => {
                  const isBTC = token.tokenName === "BTC"; // 👈 Check if BTC
                  const isDisabled = !token.isConfigured || isBTC;

                  return (
                    <Card
                      key={token.id}
                      onClick={() => {
                        if (!isDisabled) {
                          setSelectedToken(token); // 👈 Save clicked token
                          setShowExchangeModal(true); // 👈 Open modal
                        }
                      }}
                      className={`h-28 transition-all duration-200 ${
                        isDisabled
                          ? "bg-gray-900 border-gray-800 opacity-90 cursor-not-allowed"
                          : "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-blue-600 cursor-pointer"
                      }`}
                    >
                      <CardContent className="px-1 text-center">
                        {token.isConfigured ? (
                          <>
                            <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                              <img
                                src={token?.img}
                                alt={token.tokenName}
                                className="rounded-full w-full h-full object-cover"
                              />
                            </div>
                            <p className="text-base bg-blue-700 text-white font-semibold rounded-full">
                              ${token.tokenName}
                            </p>
                          </>
                        ) : (
                          <>
                            <div className="w-12 h-12 mx-auto mb-2 bg-gray-800 rounded-full flex items-center justify-center">
                              <span className="text-gray-600">?</span>
                            </div>
                            <p className="text-gray-600">NONE</p>
                          </>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {showExchangeModal && selectedToken && (
                <div className="fixed inset-0 bg-black/30 sm:w-[400px] mx-auto bg-opacity-50 flex items-center justify-center t p-4 z-50">
                  <Card className="bg-gray-900 border-gray-700 w-full max-w-md">
                    <CardHeader>
                      <CardTitle className="text-center text-white">
                        {t("exchangePoints")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gray-950 rounded-full flex items-center justify-center">
                          <img
                            src="https://raw.githubusercontent.com/enochdev2/token-metadata/main/Golem%20LOGO.png"
                            alt={selectedToken.tokenName}
                            // width={40}
                            // height={40}
                            className="rounded-full"
                          />
                        </div>
                        <div>
                          {/* <h3 className="text-xl font-bold text-white">
                            {selectedToken?.points}
                          </h3> */}
                          <p className=" flex w-full justify-center  text-center text-gray-50 text-xl font-bold ">
                            {selectedToken?.token} <span className="text-orange-500 ml-1">${selectedToken?.tokenName}</span>  <span className="text-green-600 mx-3 font-extrabold text-2xl y-auto -my-1">=</span>{" "}
                             {selectedToken?.points} {" "} <span className="text-orange-200 ml-1">Point</span>
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-lg text-gray-100 mb-2 text-center w-full ">
                          {t("availablePoints")}:{" "}
                          {userProfile.points?.totalPoints.toLocaleString()}
                        </p>

                        <Input
                          type="number"
                          placeholder="Enter points to exchange"
                          value={exchangeAmount}
                          onChange={(e) => setExchangeAmount(e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white text-right font-semibold"
                          disabled={submitting}
                        />
                      </div>

                      <p className="text-center text-base font-semibold text-gray-300">
                        Points can only be exchanged in units of 1000. Would you
                        like to apply for a point exchange?
                        {/* {t("exchangeRequest")} */}
                      </p>

                      <div className="flex gap-4">
                        <Button
                          onClick={() => handleExchange(selectedToken._id)}
                          disabled={submitting}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            t("yes")
                          )}
                        </Button>
                        <Button
                          onClick={() => {
                            setShowExchangeModal(false);
                            setExchangeAmount("");
                            setSelectedToken(null);
                          }}
                          variant="outline"
                          className="flex-1 border-gray-600 text-blue-600 hover:bg-gray-700 hover:text-white cursor-pointer"
                          disabled={submitting}
                        >
                          {t("no")}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointExchange;
