import React from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/language-context";

const KYCGuideModal = ({ isOpen, onClose }) => {
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 "
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div
            className="bg-[#f9fafb] rounded-2xl border border-gray-200 shadow-lg w-[300px] py-5 px-6 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={22} />
            </button>

            {/* Title */}
            <h2 className="text-lg font-semibold text-center mb-4 text-gray-800">
              {t("kycPhotoTitle")}
            </h2>

            {/* Example Image */}
            <img
              src="https://shiftly.co.za/wp-content/uploads/2024/04/Shiftly-ID-illustrations-02.png"
              alt="KYC Example"
              className="w-76 h-92 mx-auto rounded-md mb-4 object-contain border border-gray-300 bg-white "
            />

            {/* Instruction Text */}
            <p className="text-sm text-gray-600 text-justify leading-relaxed">
              {t("kycPhotoInstruction")}
            </p>

            {/* OK Button */}
            <div className="flex justify-center mt-5">
              <Button
                onClick={onClose}
                className="data-[state=active]:bg-[#0d0b3e], data-[state=active]:hover:bg-[#1b185e] text-white px-6"
              >
                OK
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KYCGuideModal;