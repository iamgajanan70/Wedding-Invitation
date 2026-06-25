import React from "react";
import { motion } from "motion/react";

export default function KalashIcon({ className = "w-24 h-24" }: { className?: string }) {
  // Sway animation for the left-side leaves
  const swayLeft = {
    animate: {
      rotate: [0, -3, 3, -1, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Sway animation for the right-side leaves (slightly offset to look natural)
  const swayRight = {
    animate: {
      rotate: [0, 3, -3, 1, 0],
      transition: {
        duration: 5.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Pulse animation for the background aura/glow
  const auraPulse = {
    animate: {
      scale: [0.95, 1.15, 0.95],
      opacity: [0.3, 0.6, 0.3],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Golden Aura Glow background */}
      <motion.div
        className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-amber-400/20 via-gold/15 to-transparent blur-xl pointer-events-none"
        variants={auraPulse}
        animate="animate"
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-lg z-10"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold Gradient for Kalash Lota */}
          <linearGradient id="lotaGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2B2" />
            <stop offset="40%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#6C4E04" />
          </linearGradient>

          {/* Mango Leaves Shaded Gradient */}
          <linearGradient id="leafGreen" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2ECC71" />
            <stop offset="40%" stopColor="#1D8348" />
            <stop offset="100%" stopColor="#0F5132" />
          </linearGradient>

          {/* Coconut Shell Textured Gradient */}
          <linearGradient id="coconutBrown" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#AF601A" />
            <stop offset="50%" stopColor="#873600" />
            <stop offset="100%" stopColor="#5E2300" />
          </linearGradient>

          {/* Shading/Inner Glow for Pot Rim */}
          <radialGradient id="potRimShadow" cx="50%" cy="30%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="85%" stopColor="#4A1212" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#4A1212" stopOpacity="0.8" />
          </radialGradient>
        </defs>

        {/* 1. MANGO LEAVES (Fanning out, separated into left and right sway groups) */}
        {/* Deep background leaf peeking up from center back */}
        <path
          d="M 50,58 C 50,22 41,18 36,15 C 44,20 48,42 50,58 Z"
          fill="url(#leafGreen)"
          opacity="0.9"
        />
        <path
          d="M 50,58 C 50,22 59,18 64,15 C 56,20 52,42 50,58 Z"
          fill="url(#leafGreen)"
          opacity="0.9"
        />

        {/* Left Swaying Mango Leaves group */}
        <motion.g variants={swayLeft} animate="animate" style={{ transformOrigin: "42px 60px" }}>
          {/* Far Left leaf */}
          <path
            d="M 40,60 C 22,40 12,47 6,53 C 16,56 30,59 40,60 Z"
            fill="url(#leafGreen)"
          />
          {/* Left-Diag Leaf */}
          <path
            d="M 42,60 C 24,49 17,54 14,61 C 21,63 34,61 42,60 Z"
            fill="url(#leafGreen)"
          />
        </motion.g>

        {/* Right Swaying Mango Leaves group */}
        <motion.g variants={swayRight} animate="animate" style={{ transformOrigin: "58px 60px" }}>
          {/* Far Right leaf */}
          <path
            d="M 60,60 C 78,40 88,47 94,53 C 84,56 70,59 60,60 Z"
            fill="url(#leafGreen)"
          />
          {/* Right-Diag Leaf */}
          <path
            d="M 58,60 C 76,49 83,54 86,61 C 79,63 66,61 58,60 Z"
            fill="url(#leafGreen)"
          />
        </motion.g>

        {/* 2. COCONUT SITTING IN HUB OF THE NECK */}
        <g id="coconut">
          {/* Main coconut shape */}
          <path
            d="M 50,28 C 41,43 40,54 42,61 L 58,61 C 60,54 59,43 50,28 Z"
            fill="url(#coconutBrown)"
            stroke="#4D1D00"
            strokeWidth="0.5"
          />
          {/* Traditional texturing stripes on coconut */}
          <path d="M 50,28 C 47,38 46,48 48,60" fill="none" stroke="#3A1500" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
          <path d="M 50,28 C 53,38 54,48 52,60" fill="none" stroke="#3A1500" strokeWidth="1.2" opacity="0.6" strokeLinecap="round" />
          <path d="M 46,38 Q 43,48 44,56" fill="none" stroke="#2D1100" strokeWidth="1" opacity="0.5" />
          <path d="M 54,38 Q 57,48 56,56" fill="none" stroke="#2D1100" strokeWidth="1" opacity="0.5" />
          {/* The three eyes of the coconut (holy bindu spots) */}
          <circle cx="47" cy="50" r="1.5" fill="#3D1800" opacity="0.8" />
          <circle cx="53" cy="50" r="1.5" fill="#3D1800" opacity="0.8" />
          <circle cx="50" cy="45" r="1.5" fill="#3D1800" opacity="0.8" />
        </g>

        {/* 3. KALASH LOTA (POTS & CARVING) */}
        <g id="lota">
          {/* Pedestal Base */}
          <path
            d="M 40,86 Q 50,89 60,86 L 58,91 Q 50,93 42,91 Z"
            fill="url(#lotaGold)"
            stroke="#8B6508"
            strokeWidth="0.5"
          />

          {/* Main Lota Body */}
          <path
            d="M 41,61 C 28,64 26,78 33,85 C 38,89 62,89 67,85 C 74,78 72,64 59,61 Z"
            fill="url(#lotaGold)"
            stroke="#8B6508"
            strokeWidth="0.5"
          />

          {/* Highlight/Inward Shadow around Lota neck rim */}
          <ellipse cx="50" cy="61" rx="9" ry="2.5" fill="none" stroke="#8B6508" strokeWidth="1.2" />
          <path d="M 39,61 Q 50,65 61,61" fill="none" stroke="#FFF2B2" strokeWidth="1.5" opacity="0.6" />
          <path d="M 41,61 Q 50,58 59,61" fill="none" stroke="#6C4E04" strokeWidth="1.2" opacity="0.4" />

          {/* Sacred thread (Moli / Mauli) tied around the lota neck */}
          <rect x="42.5" y="62.5" width="15" height="2" rx="0.5" fill="#E74C3C" stroke="#C0392B" strokeWidth="0.25" />
          <rect x="43" y="64" width="14" height="1.5" rx="0.5" fill="#F1C40F" />
          {/* Golden hanging thread ends */}
          <path d="M 46,65 Q 43,71 45,74" fill="none" stroke="#E74C3C" strokeWidth="1" strokeLinecap="round" />
          <path d="M 54,65 Q 57,71 55,74" fill="none" stroke="#F1C40F" strokeWidth="1" strokeLinecap="round" />
          
          {/* 4. HOLY SWASTIKA PAINTED IN SINDUR RED */}
          <g id="sindur-swastika" stroke="#D32F2F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Horizontal line */}
            <path d="M 44.5,74.5 L 55.5,74.5" />
            {/* Vertical line */}
            <path d="M 50,69 L 50,80" />
            {/* Top Hook right */}
            <path d="M 50,69 L 55.5,69" />
            {/* Right Hook down */}
            <path d="M 55.5,74.5 L 55.5,80" />
            {/* Bottom Hook left */}
            <path d="M 50,80 L 44.5,80" />
            {/* Left Hook up */}
            <path d="M 44.5,74.5 L 44.5,69" />

            {/* Sacred Sindoor Dots in 4 quadrants */}
            <circle cx="47.2" cy="71.8" r="0.8" fill="#D32F2F" stroke="none" />
            <circle cx="52.8" cy="71.8" r="0.8" fill="#D32F2F" stroke="none" />
            <circle cx="47.2" cy="77.2" r="0.8" fill="#D32F2F" stroke="none" />
            <circle cx="52.8" cy="77.2" r="0.8" fill="#D32F2F" stroke="none" />
          </g>
        </g>
      </svg>
    </div>
  );
}
