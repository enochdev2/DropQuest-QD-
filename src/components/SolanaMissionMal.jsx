"use client";

import { useState } from "react";
import { useLanguage } from "@/contexts/language-context";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Solanamission from "../assets/solanamission.png";
import oneAir from "../assets/airDrop-Image/1.png";
import twoAir from "../assets/airDrop-Image/2.png";
import threeAir from "../assets/airDrop-Image/3.png";
import fourAir from "../assets/airDrop-Image/4.png";
import fiveAir from "../assets/airDrop-Image/5.png";
import sixAir from "../assets/airDrop-Image/6.png";
import { motion, AnimatePresence } from "framer-motion";

const SolanaMissionModal = ({ isOpen, setIsOpen }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showGuide, setShowGuide] = useState(false);
  const [currentScreen, setCurrentScreen] = useState("intro");

  const handleReadGuideClick = () => {
    setCurrentScreen("confirm");
  };

  const handleExchangeConfirm = (hasHistory) => {
    const nextScreen = hasHistory ? "participate" : "No";
    setCurrentScreen(nextScreen);
  };

  const handleShowGuide = () => {
    setShowGuide(true);
    setCurrentStep(0);
  };

  const handlePrevStep = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    if (currentStep < guideSteps.length - 1) setCurrentStep(currentStep + 1);
  };

  const closeGuide = () => {
    setShowGuide(false);
    setCurrentStep(0);
    setCurrentScreen("intro");
    setIsOpen(false);
  };

  const closeModal = () => {
    setShowGuide(false);
    setCurrentStep(0);
    setCurrentScreen("intro");
    setIsOpen(false);
  };

  const guideSteps = [
    {
      titleKo: "거래소를 통해 솔라나를 구입하세요.",
      image: oneAir,
    },
    {
      titleKo: "상담원을 통하여 솔라나 입금 주소를 전달 받습니다.",
      image: twoAir,
    },
    {
      titleKo: "전달 받은 주소로 솔라나를 입금(전송) 합니다.",
      descriptionKo:
        "거래소일 경우\n입출금 → 솔라나 검색\n\n개인 지갑일 경우\n보내기 → 솔라나 선택 → 주소 입력\n→ 솔라나 개수 입력 후 확인",
      image: threeAir,
    },
    {
      titleKo: "상담원의 안내에 따라 교환할 코인을 선택합니다.",
      image: fourAir,
    },
    {
      titleKo: "코인이 개인 지갑으로 입금됩니다.",
      image: fiveAir,
    },
    {
      titleKo: "상담원이 1,000 포인트를 즉시 지급해 드립니다.",
      image: sixAir,
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {/* INTRO SCREEN */}
        {!showGuide && currentScreen === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <div
              className="fixed inset-0 z-40"
              onClick={closeModal}
              onTouchStart={closeModal}
            />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative sm:w-[400px] z-50 w-[400px] max-w-md mx-auto flex flex-col items-center space-y-6 py-8 px-4"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300"
              >
                <X size={28} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center mt-12"
              >
                <h2 className="text-xl font-bold text-white mb-2">
                  {t("introTitle")}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  src={Solanamission}
                  alt="Solana"
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleReadGuideClick}
                className="px-10 py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold text-base transition-all"
              >
                {t("introButton")}
              </motion.button>

              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-white text-center tracking-wide"
              >
                {t("newMission")}
              </motion.h3>
            </motion.div>
          </motion.div>
        )}

        {/* CONFIRM SCREEN */}
        {!showGuide && currentScreen === "confirm" && (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <div className="fixed inset-0 z-40" />
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative z-50 sm:w-[330px] w-[340px] max-w-md mx-auto bg-main rounded-2xl p-6 m-4"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>

              <div className="text-center pt-8">
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl font-bold text-white mb-2"
                >
                  {t("confirmTitle1")}
                </motion.h3>
                <h3 className="text-xl font-bold text-white mb-6">
                  <h3 className="text-xl font-bold text-white mb-6">
                    {t("confirmTitle2")}
                  </h3>
                </h3>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="bg-blue-900/50 rounded-lg p-4 mb-4"
                >
                  <h4 className="text-lg font-bold text-white mb-2">
                    {t("confirmMissionTitle")}
                  </h4>
                  <p className="text-sm text-gray-300 mb-4 whitespace-pre-line">
                    {t("confirmMissionDesc")}
                  </p>
                </motion.div>

                <p className="text-white mb-6 whitespace-pre-line">
                  {t("confirmQuestion")}
                </p>

                <div className="flex gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExchangeConfirm(true)}
                    className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                  >
                    {t("confirmYes")}
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleExchangeConfirm(false)}
                    className="px-8 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium"
                  >
                    {t("confirmNo")}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* PARTICIPATE SCREEN */}
        {!showGuide && currentScreen === "participate" && (
          <motion.div
            key="participate"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <div className="fixed inset-0 z-40" />
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative sm:w-[340px] w-[340px] z-50 max-w-md mx-auto bg-gray-950 rounded-2xl p-6 m-4"
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-white hover:text-gray-300"
              >
                <X size={24} />
              </button>

              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-center pt-8"
              >
                <p className="text-white text-base mb-2">
                  {t("participateGuideIntro")}
                </p>
                <p className="text-white text-base mb-6">
                  {t("participateGuideEnd")}
                </p>
                <p className="text-yellow-400 text-sm mb-8">
                  {t("participateGuideNote")}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowGuide}
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg"
                >
                  {t("participateButton")}
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* NO SCREEN */}
        {!showGuide && currentScreen === "No" && (
          <motion.div
            key="no"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative sm:w-[340px] w-[340px] z-50 max-w-md mx-auto bg-gray-950 border border-slate-600 rounded-2xl p-6 m-4 text-center"
            >
              <p className="text-white text-base mb-6 whitespace-pre-line">
                {t("depositMissionRestricted")}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeModal}
                className="w-14 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold text-lg"
              >
                X
              </motion.button>
            </motion.div>
          </motion.div>
        )}

        {/* GUIDE SCREEN */}
        {showGuide && (
          <motion.div
            key="guide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="sm:w-[340px] w-[340px] max-w-md mx-auto max-h-[90vh] overflow-y-auto bg-main rounded-2xl p-6 flex flex-col mt-16 m-4"
            >
              {/* Header with close button */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white">
                  {t("solanaDepositGuide")}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeGuide}
                  className="text-white hover:text-gray-300"
                >
                  <X size={24} />
                </motion.button>
              </div>

              {/* Step content with animation */}
              <div className="flex-1 mb-6 text-center">
                <AnimatePresence exitBeforeEnter>
                  <motion.div
                    key={currentStep}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center"
                  >
                    <motion.img
                      src={guideSteps[currentStep].image || "/placeholder.svg"}
                      alt={`Step ${currentStep + 1}`}
                      className="w-full h-full object-fit rounded-lg mb-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <h3 className="text-lg font-bold text-white mb-2">
                      {guideSteps[currentStep].titleKo}
                    </h3>
                    {guideSteps[currentStep].descriptionKo && (
                      <p className="text-sm text-gray-300 whitespace-pre-wrap">
                        {guideSteps[currentStep].descriptionKo}
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevStep}
                  disabled={currentStep === 0}
                  className={`p-2 rounded-lg transition-all ${
                    currentStep === 0
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <ChevronLeft size={20} />
                </motion.button>

                <span className="text-white font-bold">
                  {currentStep + 1} / {guideSteps.length}
                </span>

                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNextStep}
                  disabled={currentStep === guideSteps.length - 1}
                  className={`p-2 rounded-lg transition-all ${
                    currentStep === guideSteps.length - 1
                      ? "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}
                >
                  <ChevronRight size={20} />
                </motion.button>
              </div>

              {/* Exit button on final step */}
              {currentStep === guideSteps.length - 1 && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeGuide}
                  className="mt-4 w-full py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg"
                >
                  {t === "ko" ? "나가기" : "Exit"}
                </motion.button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      ;
    </>
  );
};

export default SolanaMissionModal;
