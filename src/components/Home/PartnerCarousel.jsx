import React, { useEffect, useState } from "react";
import { partnerLogos } from "@/assets/partners";
import { motion } from "framer-motion";

const PartnerCarousel = () => {
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection((prev) => -prev); // reverse direction
    }, 10000); // reverse every 6s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-hidden py-0">
      <motion.div
        animate={{ x: direction === 1 ? ["0%", "-100%"] : ["-100%", "0%"] }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        //   repeatType: "reverse",
        }}
        className="flex space-x-4"
      >
        {/* Duplicate logos for smooth looping */}
        {[...partnerLogos, ...partnerLogos].map((logo, i) => (
          <img
            key={i}
            src={logo.image}
            alt={logo.name}
            className="w-20 h-10 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-xl shadow-lg"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PartnerCarousel;
