import React from 'react';
import { motion, Transition } from 'framer-motion';

export const DeliveryBackground = () => {
  // Настройки анимации линий

  const lineTransition: Transition = {
    type: "spring",
    damping: 20,
    stiffness: 80,
    delay: 0.5
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-0 pointer-events-none overflow-hidden h-[160px] flex items-end ">
      <svg
        width="100%"
        height="160"
        viewBox="0 0 1760 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full text-[#1A1A1C] opacity-[0.08]"
        preserveAspectRatio="none"

      >
        {/* ГРУППА ГРУЗОВИКА (немного выезжает слева) */}
        <motion.g
          initial={{ x: -20, opacity: 0, scaleX: 0.8}}
          whileInView={{ x: 0, opacity: 1, scaleX: 0.8 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Корпус */}
          <path d="M481.888 120V40C481.888 36.46 480.249 33.07 477.332 30.57C474.415 28.07 470.458 26.66 466.332 26.66H404.11C399.985 26.66 396.028 28.07 393.111 30.57C390.194 33.07 388.555 36.46 388.555 40V113.33C388.555 115.1 389.374 116.79 390.833 118.04C392.291 119.29 394.27 120 396.332 120H411.888" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M489.667 120H443" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M520.778 120H536.333C538.396 120 540.374 119.29 541.833 118.04C543.291 116.79 544.111 115.1 544.111 113.33V88.99C544.108 87.48 543.504 86.01 542.4 84.83L515.333 55.83C514.606 55.05 513.683 54.42 512.633 53.99C511.583 53.56 510.432 53.33 509.266 53.33H481.889" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>

          {/* Колеса */}
          <circle cx="505.801" cy="122.667" r="14" stroke="currentColor" strokeWidth="3"/>
          <circle cx="427.934" cy="122.667" r="14" stroke="currentColor" strokeWidth="3"/>

        </motion.g>

        {/* ЛИНИИ ДОРОГИ (Прорисовываются) */}
        <motion.line
          x1="0" y1="110" x2="325" y2="110"
          stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={lineTransition}
        />
        <motion.line
          x1="40" y1="125" x2="365" y2="125"
          stroke="currentColor" strokeWidth="2"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...lineTransition, delay: 0.3 }}
        />
        <motion.line
          x1="620" y1="122.568" x2="1760" y2="122.568"
          stroke="currentColor" strokeWidth="4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ ...lineTransition, delay: 0.6 }}
        />
      </svg>
    </div>
  );
};
