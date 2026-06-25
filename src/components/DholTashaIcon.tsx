import React from "react";
import { motion } from "motion/react";

export default function DholTashaIcon({ className = "w-24 h-24" }: { className?: string }) {
  // Drumstick hit animation for Dhol (thick stick on left-hand side/front)
  const dholStickAnim = {
    animate: {
      rotate: [0, -25, 10, -5, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Drumstick hit animation for Tasha (fast, snappy vibration)
  const tashaStickLeftAnim = {
    animate: {
      rotate: [0, 35, -5, 25, 0],
      y: [0, -3, 1, -2, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "backOut",
      },
    },
  };

  const tashaStickRightAnim = {
    animate: {
      rotate: [0, -30, 8, -20, 0],
      y: [0, -2, 2, -1, 0],
      transition: {
        duration: 0.8,
        delay: 0.3,
        repeat: Infinity,
        ease: "backOut",
      },
    },
  };

  // Dhol main body vibration / bounce on beat
  const dholBodyAnim = {
    animate: {
      scaleY: [1, 1.04, 0.98, 1],
      scaleX: [1, 0.98, 1.02, 1],
      y: [0, -2, 1, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Tasha body vibration
  const tashaBodyAnim = {
    animate: {
      y: [0, -1, 2, -1, 0],
      scale: [1, 1.02, 0.99, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  // Sound/Vibe rings pulsing out
  const soundWaveAnim = {
    animate: {
      scale: [0.6, 1.3],
      opacity: [0.8, 0],
      transition: {
        duration: 1.6,
        repeat: Infinity,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Festive background aura */}
      <div className="absolute inset-0 bg-radial from-amber-400/10 via-transparent to-transparent opacity-60 pointer-events-none" />

      <svg
        viewBox="0 0 120 100"
        className="w-full h-full drop-shadow-md z-10 overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Metallic Gold/Brass Gradients */}
          <linearGradient id="brassGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE893" />
            <stop offset="45%" stopColor="#D4AF37" />
            <stop offset="70%" stopColor="#AA7C11" />
            <stop offset="100%" stopColor="#5C4001" />
          </linearGradient>

          {/* Red/Crimson Fabric/Strap Gradients */}
          <linearGradient id="strapRed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="50%" stopColor="#D32F2F" />
            <stop offset="100%" stopColor="#7B0000" />
          </linearGradient>

          {/* Mango/Orange Shell */}
          <linearGradient id="dholBody" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF8F00" />
            <stop offset="50%" stopColor="#E65100" />
            <stop offset="100%" stopColor="#BF360C" />
          </linearGradient>

          {/* Drum Skin / Parchment representation */}
          <radialGradient id="parchment" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFDF0" />
            <stop offset="85%" stopColor="#F5E6C4" />
            <stop offset="100%" stopColor="#D2B48C" />
          </radialGradient>

          {/* Silver/Steel rim wrapper */}
          <linearGradient id="silverTone" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#BDC3C7" />
            <stop offset="100%" stopColor="#7F8C8D" />
          </linearGradient>
        </defs>

        {/* 1. PULSING SOUND WAVE ELEMENTS */}
        <motion.circle
          cx="38"
          cy="52"
          r="16"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1"
          opacity="0.5"
          variants={soundWaveAnim}
          animate="animate"
        />
        <motion.circle
          cx="82"
          cy="48"
          r="10"
          fill="none"
          stroke="#D32F2F"
          strokeWidth="0.8"
          opacity="0.4"
          variants={soundWaveAnim}
          animate="animate"
          style={{ transformOrigin: "82px 48px" }}
        />

        {/* 2. DHOL DRUM (Double Sided Barrel - Large Left/Center Drum) */}
        <motion.g variants={dholBodyAnim} animate="animate" style={{ transformOrigin: "40px 55px" }}>
          {/* Main Dhol Barrel Shell */}
          <path
            d="M 22,35 C 32,31 48,31 58,35 L 58,70 C 48,74 32,74 22,70 Z"
            fill="url(#dholBody)"
            stroke="#5C1F00"
            strokeWidth="0.75"
          />

          {/* Beautiful Traditional Gold Embossed Patterns on Dhol center */}
          <path
            d="M 23,52 C 32,49 48,49 57,52"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.8"
          />
          {/* Geometrical diamond patterns on center sash */}
          <path
            d="M 23,52 L 28,49 L 33,52 L 38,49 L 43,52 L 48,49 L 53,52 L 57,49 M 23,52 L 28,55 L 33,52 L 38,55 L 43,52 L 48,55 L 53,52 L 57,55"
            fill="none"
            stroke="#FFF"
            strokeWidth="0.5"
            opacity="0.6"
          />

          {/* Left Drum Head Frame / Rim */}
          <ellipse cx="22" cy="52.5" rx="4.5" ry="17.5" fill="url(#silverTone)" stroke="#7F8C8D" strokeWidth="0.5" />
          {/* Left Parchment Skin */}
          <ellipse cx="21" cy="52.5" rx="3.5" ry="16.5" fill="url(#parchment)" />
          {/* Black circle center (Syahi / tuning spot) */}
          <ellipse cx="21.5" cy="52.5" rx="1.5" ry="5" fill="#333" opacity="0.9" />

          {/* Right Drum Head Rim */}
          <ellipse cx="58" cy="52.5" rx="4.5" ry="17.5" fill="url(#silverTone)" stroke="#7F8C8D" strokeWidth="0.5" />
          {/* Right Parchment Skin */}
          <ellipse cx="59" cy="52.5" rx="3.5" ry="16.5" fill="url(#parchment)" />

          {/* Tensioning Ropes & Golden Rings (Traditional W-shape laces) */}
          <path
            d="M 22,36 L 58,36 L 22,41 L 58,42 L 22,47 L 58,48 L 22,53 L 58,54 L 22,59 L 58,60 L 22,65 L 58,66 L 22,69 L 58,69"
            fill="none"
            stroke="#FFFDF0"
            strokeWidth="0.6"
            strokeLinecap="round"
            opacity="0.95"
          />

          {/* Tuning rings on ropes */}
          <circle cx="34" cy="40" r="1" fill="#FFD700" />
          <circle cx="48" cy="45" r="1" fill="#FFD700" />
          <circle cx="32" cy="50" r="1" fill="#FFD700" />
          <circle cx="44" cy="55" r="1" fill="#FFD700" />
          <circle cx="38" cy="62" r="1" fill="#FFD700" />

          {/* Carrying Sling/Strap hanging below/above */}
          <path
            d="M 24,35 Q 40,24 56,35"
            fill="none"
            stroke="url(#strapRed)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Beautiful Hanging Silk Tassels (Red & Gold) */}
          <path d="M 33,63 L 31,76 M 34,63 L 34,77" stroke="#E74C3C" strokeWidth="1" strokeLinecap="round" />
          <path d="M 47,64 L 46,77 M 48,64 L 49,78" stroke="#F1C40F" strokeWidth="1" strokeLinecap="round" />
        </motion.g>

        {/* 3. TASHA DRUM (Shallow bowl-shaped kettle drum on right side) */}
        <motion.g variants={tashaBodyAnim} animate="animate" style={{ transformOrigin: "85px 45px" }}>
          {/* Tasha Support Red Belt/Strap */}
          <path
            d="M 72,50 Q 85,64 98,54"
            fill="none"
            stroke="url(#strapRed)"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Metal Kettle Bowl (Outer Body) */}
          <path
            d="M 72,36 C 72,36 71,51 85,55 C 99,51 98,36 98,36 Z"
            fill="url(#brassGold)"
            stroke="#8B6508"
            strokeWidth="0.75"
          />

          {/* Elegant top rim / metal hoop */}
          <ellipse cx="85" cy="36" rx="13" ry="5" fill="url(#silverTone)" stroke="#7F8C8D" strokeWidth="0.8" />
          {/* Tight parchment head of Tasha */}
          <ellipse cx="85" cy="36" rx="11.8" ry="4.2" fill="url(#parchment)" />

          {/* Tensioning key claws/pegs holding rim down */}
          <path d="M 74,38 L 74,43 M 77,40 L 78,45 M 93,40 L 92,45 M 96,38 L 96,43" stroke="#4A4A4A" strokeWidth="1.2" />

          {/* Decorative small red flower or sindur bindu on Tasha head */}
          <circle cx="85" cy="36" r="1.5" fill="#D32F2F" />
        </motion.g>

        {/* 4. DRUMSTICKS FOR DHOL (Thick wooden hammer stick - Tip can hit left head) */}
        <motion.g
          variants={dholStickAnim}
          animate="animate"
          style={{ transformOrigin: "12px 64px" }}
        >
          {/* Wooden handle */}
          <path d="M 12,64 L 18,48" stroke="#7A522A" strokeWidth="2.5" strokeLinecap="round" />
          {/* Soft striking hammer head */}
          <circle cx="18.5" cy="47" r="2.8" fill="#FFFDF0" stroke="#7F8C8D" strokeWidth="0.5" />
          {/* Decorative red thread on stick */}
          <rect x="13.5" y="55" width="2" height="3" fill="#D32F2F" transform="rotate(-20 13.5 55)" />
        </motion.g>

        {/* 5. TASHA THIN BAMBOO/SHOOT STICKS (Vibrating rapidly) */}
        {/* Left Stick */}
        <motion.g
          variants={tashaStickLeftAnim}
          animate="animate"
          style={{ transformOrigin: "70px 22px" }}
        >
          {/* Very thin curved bamboo stick */}
          <path d="M 70,22 Q 78,28 82,34" fill="none" stroke="#D3B277" strokeWidth="1.5" strokeLinecap="round" />
          {/* Soft tip wrapper */}
          <circle cx="82" cy="34" r="1.1" fill="#7B0000" />
        </motion.g>

        {/* Right Stick */}
        <motion.g
          variants={tashaStickRightAnim}
          animate="animate"
          style={{ transformOrigin: "98px 20px" }}
        >
          {/* Very thin curved bamboo stick */}
          <path d="M 98,20 Q 90,26 87,33" fill="none" stroke="#D3B277" strokeWidth="1.5" strokeLinecap="round" />
          {/* Soft tip wrapper */}
          <circle cx="87" cy="33" r="1.1" fill="#7B0000" />
        </motion.g>
      </svg>
    </div>
  );
}
