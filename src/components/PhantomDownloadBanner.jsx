import React from 'react';
import IOS from "../assets/ios.png";
import ANDRIOD from "../assets/andriod.png";
import Phantom from "../assets/phantom.png";
import { useLanguage } from "@/contexts/language-context";


const PhantomDownloadBanner = () => {
    const { t } = useLanguage();

  return (
    <div className="w-[98%] items-center space-y-4 justify-center bg-black text-white px-4 py-4 border-b-8 border-blue-800 max-w-md mx-auto rounded-lg shadow-lg">
      {/* Left Section: Logo and Text */}
      <div className="flex items-center space-x-2 flex-1 justify-center">
        {/* Phantom Logo */}
        <img src={Phantom} alt="Phantom Logo" className="w-10 h-10 mr-6" />
        <span className="text-lg font-semibold text-white">
          {t("phantom")}
        </span>
      </div>

      {/* Right Section: Download Buttons */}
      <div className="flex items-center justify-center space-x-8">
        {/* Android Button */}
        <a href="https://play.google.com/store/apps/details?id=app.phantom" className="flex flex-col items-center">
          {/* Google Play Button */}
          <div className="w-28 h-18 bg-white flex flex-col items-center justify-center shadow-md rounded-xl py-2">
            <img src={ANDRIOD} alt="Google Play" className="w-10 h-10" />
            <span className="text-base font-bold text-black">Android</span>
          </div>
        </a>

        {/* iOS Button */}
        <a href="https://apps.apple.com/us/app/phantom-crypto-wallet/id1598432977" className="flex flex-col items-center space-y-1">
          {/* App Store Button */}
          <div className="w-26 h-18 bg-white flex flex-col items-center justify-center shadow-md rounded-xl py-1">
            <img src={IOS} alt="App Store" className="w-10 h-10" />
            <span className="text-base font-bold text-black">iOS</span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default PhantomDownloadBanner;