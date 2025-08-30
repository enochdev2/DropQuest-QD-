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

function PointExchange() {
  const { t } = useLanguage();
  const [userPoints, setUserPoints] = useState(0);
  const [exchangeAmount, setExchangeAmount] = useState("");
  const [selectedToken, setSelectedToken] = useState(null);
  const [showExchangeModal, setShowExchangeModal] = useState(false);
  const [tokenSlots, setTokenSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);

      // Load user profile to get current points
      if (typeof window !== "undefined") {
        const user = JSON.parse(localStorage.getItem("user") || "{}");
        if (user.email) {
          const userProfile = await getUserProfile(user.email);
          setUserPoints(userProfile.points || 0);
        }
      }

      // Load token slots from API
      try {
        const slotsData = await getTokenSlots();
        setTokenSlots(slotsData || []);
      } catch (error) {
        console.warn("Using mock token slots data");
        const mockSlots = Array(50)
          .fill(null)
          .map((_, index) => ({
            id: index + 1,
            isConfigured: index < 5,
            tokenName:
              index === 0
                ? "GLM"
                : index === 1
                ? "ETH"
                : index === 2
                ? "BTC"
                : index === 3
                ? "USDT"
                : index === 4
                ? "BNB"
                : "",
            pointRatio:
              index === 0
                ? 1000
                : index === 1
                ? 2000
                : index === 2
                ? 50000
                : index === 3
                ? 100
                : index === 4
                ? 300
                : 0,
            logoUrl: index < 5 ? "/New folder/src/assets/dqcoin.png" : null,
          }));
        setTokenSlots(mockSlots);
      }
    } catch (error) {
      console.error("Error loading initial data:", error);
      toast.error("Failed to load data. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const handleTokenClick = (token) => {
    if (!token.isConfigured) {
      toast.error("This token slot is not available yet.");
      return;
    }
    setSelectedToken(token);
    setShowExchangeModal(true);
  };

  const handleExchange = async () => {
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

    if (amount > userPoints) {
      toast.error("Insufficient points. Please check your points on My Page.");
      return;
    }

    try {
      setSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const exchangeData = {
        userId: user._id,
        tokenId: selectedToken.id,
        tokenName: selectedToken.tokenName,
        pointsToExchange: amount,
        userTelegram: user.telegramId || "",
        userName: user.name || "",
      };

      await submitPointExchange(exchangeData);

      setUserPoints((prev) => prev - amount);
      toast.success("The exchange request has been completed.");

      setShowExchangeModal(false);
      setExchangeAmount("");
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
    <div className="min-h-screen bg-black text-white">
      <div className="sm:w-[400px] mx-auto border-2 border-gray-700  rounded-2xl">
        <div className=" bg-gray-900 py-3 px-4">
          <div className=" text-center">
            <h1 className="text-3xl font-bold mb-4 text-white">
              {t("pointExchangeTitle")}
            </h1>
            <p className="text-lg text-gray-300 mb-4">
              Exchange your accumulated points for various cryptocurrencies
            </p>
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-8 inline-block">
              <p className="text-lg">
                <span className="text-gray-300">{t("availablePoints")}: </span>
                <span className="text-xl font-bold text-blue-400">
                  {userPoints.toLocaleString()}
                </span>
              </p>
            </div>
            <div className="flex justify-center">
              <ChevronDown className="w-6 h-6 animate-bounce text-gray-400" />
            </div>
          </div>
        </div>
        <div className="py-6 px-4">
          <div className="">
            <h2 className="text-2xl font-bold text-center mb-5 text-white">
              {t("availableTokens")}
            </h2>

            {/* Scrollable container */}
            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 rounded-lg">
              <div className="grid grid-cols-3 gap-2">
                {tokenSlots.map((token) => (
                  <Card
                    key={token.id}
                    className={`h-28 cursor-pointer transition-all duration-200 ${
                      token.isConfigured
                        ? "bg-gray-800 border-gray-700 hover:bg-gray-700 hover:border-blue-600"
                        : "bg-gray-900 border-gray-800 opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => handleTokenClick(token)}
                  >
                    <CardContent className="p-1  text-center">
                      {token.isConfigured ? (
                        <>
                          <div className="w-10 h-10 mx-auto mb-2 bg-gray-700 rounded-full flex items-center justify-center">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpN-1f8F6DIYYL2Xg4iFhzg8cId2jzVmVGYgpR2JmHiaJXGx0W2_e8XKcOAGWH_4hTsVA&usqp=CAU"
                              alt={token.tokenName}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          </div>
                          <p className="font-semibold text-white">
                            ${token.tokenName}
                          </p>
                          <p className="text-xs text-gray-400">
                            {token.pointRatio} pts
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExchangeModal && selectedToken && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="bg-gray-800 border-gray-700 w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-center text-white">
                {t("exchangePoints")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-700 rounded-full flex items-center justify-center">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpN-1f8F6DIYYL2Xg4iFhzg8cId2jzVmVGYgpR2JmHiaJXGx0W2_e8XKcOAGWH_4hTsVA&usqp=CAU"
                    alt={selectedToken.tokenName}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <h3 className="text-xl font-bold text-white">
                  ${selectedToken.tokenName}
                </h3>
                <p className="text-gray-300">
                  1 {selectedToken.tokenName} = {selectedToken.pointRatio}{" "}
                  Points
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-300 mb-2">
                  {t("availablePoints")}: {userPoints.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400 mb-4">
                  Points can only be exchanged in units of 1000.
                </p>
                <Input
                  type="number"
                  placeholder="Enter points to exchange"
                  value={exchangeAmount}
                  onChange={(e) => setExchangeAmount(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                  disabled={submitting}
                />
              </div>

              <p className="text-center text-sm text-gray-300">
                {t("exchangeRequest")}
              </p>

              <div className="flex gap-4">
                <Button
                  onClick={handleExchange}
                  disabled={submitting}
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
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
                  className="flex-1 border-gray-600 text-blue-600 hover:bg-gray-700 hover:text-white"
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
  );
}

export default PointExchange;
