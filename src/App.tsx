import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";
import {
  Calendar,
  MapPin,
  Instagram,
  Facebook,
  Share2,
  Heart,
  CalendarPlus,
  Clock,
  Hand,
  X,
  ChevronLeft,
  ChevronRight,
  Globe
} from "lucide-react";
import KalashIcon from "./components/KalashIcon";
import DholTashaIcon from "./components/DholTashaIcon";

const GALLERY_ITEMS = [
  { title: "Lakeside sunset walk, Udaipur", className: "img-ud1" },
  { title: "The Proposal Moment", className: "img-ud2" },
  { title: "Rings of commitment exchanged", className: "img-ud3" },
  { title: "Our laughter fits in Jaipur cafes", className: "img-ud4" },
  { title: "Traditional pre-wedding shoot", className: "img-ud5" },
  { title: "Deep in deep conversations", className: "img-ud6" }
];

const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 3,
      ease: "easeInOut"
    }
  }
};

export default function App() {
  // --- React State ---
  const [progress, setProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [loaderOpacity, setLoaderOpacity] = useState(1);

  const [envelopeVisible, setEnvelopeVisible] = useState(true);
  const [envelopeTransform, setEnvelopeTransform] = useState("scale(1) translateY(0%)");
  const [envelopeOpacity, setEnvelopeOpacity] = useState(1);

  const [mainVisible, setMainVisible] = useState(false);

  // Lightbox
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Love Letter
  const [letterOpened, setLetterOpened] = useState(false);

  // Calendar
  const [calendarSuccess, setCalendarSuccess] = useState(false);

  // Scratch card
  const scratchCounterRef = useRef(0);
  const [scratchRevealed, setScratchRevealed] = useState(false);

  // Countdown clock state
  const [countdown, setCountdown] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00"
  });

  // Canvas fireflies reference
  const fireflyCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Canvas scratch-off reference
  const scratchCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const scratchWrapperRef = useRef<HTMLDivElement | null>(null);
  const isScratchingRef = useRef(false);

  // --- 2. Progressive Loader Simulation ---
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Simulate natural progressive loading increments
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setLoaderOpacity(0);
          setTimeout(() => {
            setLoaderVisible(false);
          }, 1000);
        }, 500);
      }
      setProgress(currentProgress);
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // --- 3. Scroll Reveal Element Handler (using modern IntersectionObserver) ---
  useEffect(() => {
    if (!mainVisible) return;

    const cards = document.querySelectorAll(".timeline-card, .ceremony-item, .polaroid-card, .family-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            if (!el.classList.contains("visible")) {
              el.classList.add("visible");
            }
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -50px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [mainVisible]);

  // --- 4. Interactive Sparks Particle Canvas (Fireflies) ---
  useEffect(() => {
    const canvas = fireflyCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Create fireworks / sparks array
    class Firefly {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
      alphaSpeed: number;
      grow: boolean;

      constructor() {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.size = Math.random() * 2.5 + 1;
        this.speedX = Math.random() * 0.4 - 0.2;
        this.speedY = Math.random() * 0.4 - 0.2;
        this.alpha = Math.random();
        this.alphaSpeed = Math.random() * 0.02 + 0.005;
        this.grow = Math.random() > 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

        if (this.grow) {
          this.alpha += this.alphaSpeed;
          if (this.alpha >= 1) this.grow = false;
        } else {
          this.alpha -= this.alphaSpeed;
          if (this.alpha <= 0.1) this.grow = true;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.globalAlpha = Math.max(0.1, Math.min(this.alpha, 1));
        c.shadowBlur = 12;
        c.shadowColor = "#D4AF37";
        c.fillStyle = "rgba(244, 208, 63, 0.8)";
        c.beginPath();
        c.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        c.fill();
        c.restore();
      }
    }

    const fireflies: Firefly[] = Array.from({ length: 35 }).map(() => new Firefly());

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      fireflies.forEach((f) => {
        f.update();
        f.draw(ctx);
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mainVisible]);

  // --- 5. Custom Spark Trails on Mouse Movement ---
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.45) return; // Limit spark density on rapid pointer drag

      const spark = document.createElement("div");
      spark.style.position = "absolute";
      spark.style.pointerEvents = "none";
      spark.style.width = `${Math.random() * 6 + 3}px`;
      spark.style.height = spark.style.width;
      spark.style.backgroundColor = Math.random() > 0.5 ? "#D4AF37" : "#0F5132"; // Gold or Emerald
      spark.style.borderRadius = "50%";
      spark.style.left = `${e.pageX}px`;
      spark.style.top = `${e.pageY}px`;
      spark.style.zIndex = "10000";
      spark.style.boxShadow = "0 0 8px #F9E79F";

      document.body.appendChild(spark);

      const destX = Math.random() * 40 - 20;
      const destY = Math.random() * 40 - 20 + 15;

      const animation = spark.animate([
        { transform: "translate(0, 0) scale(1)", opacity: 0.9 },
        { transform: `translate(${destX}px, ${destY}px) scale(0)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 400,
        easing: "cubic-bezier(0.1, 0.8, 0.3, 1)"
      });

      animation.onfinish = () => spark.remove();
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- 6. HTML5 Scratch Card Foil Initialization ---
  const initScratchCard = () => {
    const canvas = scratchCanvasRef.current;
    const wrapper = scratchWrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    const rect = wrapper.getBoundingClientRect();
    canvas.width = rect.width || 320;
    canvas.height = rect.height || 280;

    // Outer Draw gold foil
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Apply metallic luxury shine gradient
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "rgba(255, 248, 231, 0.35)");
    grad.addColorStop(0.5, "transparent");
    grad.addColorStop(1, "rgba(74, 18, 18, 0.2)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Intricate border lining
    ctx.strokeStyle = "rgba(74, 18, 18, 0.3)";
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);

    // Sacred labels text
    ctx.font = "bold 16px 'Marcellus', serif";
    ctx.fillStyle = "#6A1E1E";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("SCRATCH WITH COIN HERE", canvas.width / 2, canvas.height / 2 - 10);

    ctx.font = "italic 13px 'Playfair Display', serif";
    ctx.fillText("To reveal the wedding details", canvas.width / 2, canvas.height / 2 + 15);
  };

  useEffect(() => {
    if (mainVisible && !scratchRevealed) {
      setTimeout(initScratchCard, 300);
    }
  }, [mainVisible]);

  // Handle Scratch logic
  const handleScratchMove = (clientX: number, clientY: number) => {
    const canvas = scratchCanvasRef.current;
    if (!canvas || scratchRevealed) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 26, 0, Math.PI * 2);
    ctx.fill();

    // Spawning glitter sparkles at scratch coords
    spawnScratchSparkles(clientX + window.scrollX, clientY + window.scrollY);

    // Increase scratched pixel counter in ref (prevents re-renders)
    scratchCounterRef.current += 1;
    if (scratchCounterRef.current > 70 && !scratchRevealed) {
      revealScratchFully();
    }
  };

  const spawnScratchSparkles = (pageX: number, pageY: number) => {
    for (let i = 0; i < 4; i++) {
      const sp = document.createElement("div");
      sp.style.position = "absolute";
      sp.style.width = "6px";
      sp.style.height = "6px";
      sp.style.background = "linear-gradient(to right, #F9E79F, #D4AF37)";
      sp.style.borderRadius = "50%";
      sp.style.left = `${pageX + (Math.random() * 20 - 10)}px`;
      sp.style.top = `${pageY + (Math.random() * 20 - 10)}px`;
      sp.style.pointerEvents = "none";
      sp.style.zIndex = "999";

      document.body.appendChild(sp);

      sp.animate([
        { transform: "scale(1)", opacity: 1 },
        { transform: "scale(0) translate(0px, -15px)", opacity: 0 }
      ], { duration: 600 }).onfinish = () => sp.remove();
    }
  };

  const revealScratchFully = () => {
    setScratchRevealed(true);
    const canvas = scratchCanvasRef.current;
    if (canvas) {
      canvas.style.transition = "opacity 0.6s ease-out";
      canvas.style.opacity = "0";
      setTimeout(() => {
        canvas.style.display = "none";
      }, 600);
    }

    // Trigger premium royal celebration ribbons and confetti bursts!
    // Gold, deep crimson-maroon, warm amber, and cream to fit the Jaipur palace wedding theme
    const colors = ["#D4AF37", "#6A1E1E", "#9A3412", "#F9E79F", "#FFFFFF"];

    // A single highly aesthetic rich, high-density ceremony burst
    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.6 },
      colors: colors,
      disableForReducedMotion: true
    });
  };

  // Touch and mouse helpers
  const onMouseDown = () => { isScratchingRef.current = true; };
  const onMouseUp = () => { isScratchingRef.current = false; };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isScratchingRef.current) return;
    handleScratchMove(e.clientX, e.clientY);
  };

  const onTouchStart = () => { isScratchingRef.current = true; };
  const onTouchEnd = () => { isScratchingRef.current = false; };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!isScratchingRef.current || !e.touches[0]) return;
    handleScratchMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  // --- 7. Royal Wax Seal Envelope Unlock ---
  const handleWaxSealRelease = () => {
    setEnvelopeTransform("scale(0.8) translateY(-100%)");
    setEnvelopeOpacity(0);
    setTimeout(() => {
      setEnvelopeVisible(false);
      setMainVisible(true);
    }, 1200);
  };

  // --- 10. Live Countdown clock logic ---
  useEffect(() => {
    // Wedding celebration: Dec 12, 2026 18:30:00 IST
    const targetTime = new Date("Dec 12, 2026 18:30:00").getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference < 0) {
        setCountdown({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0")
      });
    };

    updateTimer();
    const clockInterval = setInterval(updateTimer, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  // --- 11. Add to Google Calendar logic ---
  const handleCalendarLink = () => {
    const title = encodeURIComponent("Ashish & Vaishnavi - Royal Wedding Union");
    const details = encodeURIComponent("You are cordially invited to celebrate the royal wedding and pheras of Ashish & Vaishnavi. Venue: The City Palace, Jaipur, Rajasthan.");
    const location = encodeURIComponent("The City Palace, Jaipur, Rajasthan, India");

    // Starts Dec 12th 2026 at 18:30 IST (13:00 UTC)
    const start = "20261212T130000Z";
    const end = "20261212T180000Z";

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;

    setCalendarSuccess(true);
    setTimeout(() => {
      window.open(calendarUrl, "_blank");
    }, 800);

    setTimeout(() => {
      setCalendarSuccess(false);
    }, 5000);
  };

  // Slide index changer
  const changeSlide = (offset: number) => {
    let nextIdx = lightboxIndex + offset;
    if (nextIdx < 0) nextIdx = GALLERY_ITEMS.length - 1;
    if (nextIdx >= GALLERY_ITEMS.length) nextIdx = 0;
    setLightboxIndex(nextIdx);
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden select-none">

      {/* Canvas Sparkles Layer */}
      <canvas ref={fireflyCanvasRef} id="fireflies-canvas" className="fixed pointer-events-none inset-0 z-0" />

      {/* 1. PROGRESSIVE LOADER SCREEN */}
      {loaderVisible && (
        <div
          id="loader-screen"
          style={{ opacity: loaderOpacity }}
          className="transition-opacity duration-1000"
        >
          <div className="loader-content flex flex-col items-center">

            {/* Neat and accurate Ganesha loader emblem */}
            <div className="ganesha-loader-img mb-6 relative flex justify-center items-center">
              <div className="absolute inset-0 bg-gold/15 blur-lg rounded-full animate-pulse scale-125 pointer-events-none" />
              <div className="relative p-1.5 rounded-full border-2 border-double border-gold bg-maroon-dark shadow-2xl">
                <img
                  src="https://i.ibb.co/KcbbRjQV/ganesha.avif"
                  alt="Shree Ganesha blessings"
                  className="w-24 h-24 md:w-28 md:h-28 object-contain rounded-full bg-[#4a1212]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <div className="loader-text-wrapper text-center">
              <h2 className="loader-title text-gold-400 font-royal tracking-widest text-lg mb-2">
                Shree Ganeshay Namah
              </h2>
              <div className="progress-bar-container w-64 h-1.5 bg-[#3a1313] rounded-full overflow-hidden mb-3 border border-gold-500/20">
                <div
                  className="progress-bar h-full bg-gradient-to-r from-gold-500 to-gold-200 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="loader-sub text-gold-200 font-heading text-xs tracking-wide">
                Preparing the Royal Scroll...
              </p>
            </div>

          </div>
        </div>
      )}

      {/* 2. ENVELOPE / SCROLL WAX SEAL INTRO CARD */}
      {!loaderVisible && envelopeVisible && (
        <div
          id="scroll-envelope-container"
          style={{ transform: envelopeTransform, opacity: envelopeOpacity }}
          className="fixed inset-0 flex justify-center items-center z-40 bg-[#551313] transition-all duration-1200 ease-out"
        >
          <div className="envelope-outer max-w-[480px] w-[90%] border-4 border-double border-gold-400 p-8 rounded-2xl flex items-center justify-center relative shadow-2xl">
            <div className="envelope-seal-wrapper text-center">

              {/* Clicking the Wax seal triggers interactive release */}
              <button
                onClick={handleWaxSealRelease}
                id="btn-wax-seal"
                className="royal-mandala-seal block w-28 h-28 rounded-full bg-gradient-to-br from-gold-100 via-gold-400 to-gold-600 outline-none hover:scale-105 active:scale-95 transition-all text-maroon-dark shadow-xl hover:shadow-2xl relative mb-4 mx-auto border-4 border-maroon flex items-center justify-center cursor-pointer"
                title="Open Sacred Scroll"
              >
                {/* SVG for rotating mandala & curved letters */}
                <svg viewBox="0 0 100 100" className="w-full h-full select-none absolute inset-0 pointer-events-none p-1">
                  {/* Outer dotted/dashed rings */}
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#6A1E1E" strokeWidth="0.75" strokeDasharray="3,3" />
                  <circle cx="50" cy="50" r="41" fill="none" stroke="#6A1E1E" strokeWidth="1" />

                  {/* Invisible circular path on which letters are placed (inside) */}
                  <path
                    id="mandalaTextPath"
                    d="M 12 50 A 38 38 0 1 1 88 50 A 38 38 0 1 1 12 50"
                    fill="none"
                    stroke="none"
                  />

                  {/* Curved letters along the path */}
                  <text className="font-heading font-black text-[9.5px] fill-[#6A1E1E] uppercase tracking-[0.16em]">
                    <textPath href="#mandalaTextPath" startOffset="0%">
                      ★ ASHISH &amp; VAISHNAVI ★ A &amp; V ★
                    </textPath>
                  </text>

                  {/* Central inner ring containing A & V */}
                  <circle cx="50" cy="50" r="23" fill="none" stroke="#6A1E1E" strokeWidth="1.5" strokeDasharray="2,2" />

                  <g transform="translate(50, 52)">
                    <text
                      textAnchor="middle"
                      className="font-royal font-bold text-[14px] fill-[#6A1E1E] tracking-tight"
                    >
                      A &amp; V
                    </text>
                  </g>
                </svg>
              </button>

              <button
                onClick={handleWaxSealRelease}
                className="seal-instruction font-heading text-gold-100 hover:text-white transition-colors tracking-wide outline-none select-none text-sm cursor-pointer"
                id="btn-wax-seal-label"
              >
                Click the Royal Mandala Seal to Open the Invitation
              </button>

            </div>
          </div>
        </div>
      )}

      {/* MAIN INVITATION ASSEMBLY */}
      {mainVisible && (
        <main id="main-invitation" className="invitation-wrapper w-full relative z-10">

          {/* 3. HERO HEROIC SECTION */}
          <header id="hero-section" className="scroll-section">
            <div className="royal-border-frame"></div>
            <div className="hero-inner text-center max-w-4xl px-6 relative z-10 flex flex-col items-center">

              {/* Shloka Devotional verse */}
              <div className="sanskrit-shloka mb-8">
                <p className="shloka-devanagari font-heading text-maroon font-bold text-center text-lg md:text-xl leading-relaxed mb-3">
                  वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ ।<br />
                  निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥
                </p>
                <p className="shloka-translation font-serif italic text-emerald text-xs md:text-sm max-w-2xl mx-auto">
                  "O Lord Ganesha, of curved trunk and massive body, whose splendor is equal to millions of suns, please make all my works free of obstacles, always."
                </p>
              </div>

              {/* Majestic Ganesha Emblem - with the custom user illustration and golden glowing aura */}
              <div className="hero-ganesha-container mb-6 flex justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/10 to-transparent blur-xl rounded-full scale-125 animate-pulse pointer-events-none" />
                <motion.div
                  className="relative p-2 rounded-full border-2 border-double border-gold/60 bg-maroon-dark/20 backdrop-blur-sm shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <img
                    src="https://i.ibb.co/KcbbRjQV/ganesha.avif"
                    alt="Lord Ganesha blessings"
                    className="w-28 h-28 md:w-32 md:h-32 object-contain rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

              {/* Announcement names header */}
              <div className="wedding-announcement">
                <span className="sub-announcement font-heading text-emerald font-semibold uppercase tracking-widest text-sm mb-4 block">
                  The Auspicious Wedding Invitation of
                </span>
                <h1 className="calligraphy-names font-handwritten text-maroon text-6xl md:text-8xl leading-none flex items-center justify-center gap-3 mb-6 select-none">
                  <span className="name-groom">Ashish</span>
                  <span className="wedding-knot text-3xl md:text-5xl">❤️</span>
                  <span className="name-bride">Vaishnavi</span>
                </h1>
                <p className="wedding-tagline font-heading text-[#6A1E1E] max-w-xl mx-auto text-sm md:text-base leading-relaxed italic">
                  Together with their families, invite you to celebrate their sacred union.
                </p>
              </div>

            </div>
          </header>

          {/* 5. DIGITAL SCRATCH CARD REVEAL */}
          <section id="scratch-reveal-section" className="scroll-section">
            <div className="section-header">
              {/* Swastik spinning / rotating vector animation */}
              <div className="flex justify-center mb-3">
                <div className="relative w-16 h-16 flex items-center justify-center animate-spin" style={{ animationDuration: '20s' }}>
                  <svg viewBox="0 0 100 100" className="w-16 h-16 drop-shadow-md">
                    {/* Outer elegant ring */}
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5,4" />
                    <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="1" />
                    {/* Beautifully drawn Swastika */}
                    <path
                      d="M 50 20 L 50 50 M 50 20 L 80 20 M 50 80 L 50 50 M 50 80 L 20 80 M 20 50 L 50 50 M 20 50 L 20 20 M 80 50 L 50 50 M 80 50 L 80 80"
                      fill="none"
                      stroke="#D4AF37"
                      strokeWidth="5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* 4 dots inside the 4 quadrants of the swastika */}
                    <circle cx="34" cy="34" r="2.5" fill="#D4AF37" />
                    <circle cx="66" cy="34" r="2.5" fill="#D4AF37" />
                    <circle cx="34" cy="66" r="2.5" fill="#D4AF37" />
                    <circle cx="66" cy="66" r="2.5" fill="#D4AF37" />
                  </svg>
                </div>
              </div>
              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                Auspicious Reveal
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                Scratch the Golden Foil to reveal the Wedding Details
              </p>
            </div>

            <div className="scratch-card-outer max-w-[500px] mx-auto bg-[#4a1212] p-4 rounded-2xl border-2 border-gold-400 shadow-2xl mt-8">
              <div
                ref={scratchWrapperRef}
                className="scratch-card-wrapper relative w-full h-72 rounded-xl overflow-hidden bg-amber-50"
              >
                {/* UNDERLYING PRIVATE REVEALED INFO */}
                <div className="scratch-card-underlay absolute inset-0 flex justify-center items-center bg-amber-50 p-6 z-10">
                  <div className="underlay-content text-center border-2 border-dashed border-gold-500/50 p-4 rounded-lg bg-orange-50/30 w-full h-full flex flex-col justify-center items-center">
                    <span className="revealed-tag font-heading text-emerald text-xs font-bold uppercase tracking-widest block mb-2">
                      The Wedding Muhurat
                    </span>
                    <h3 className="font-royal text-maroon text-xl md:text-2xl font-black mb-3">
                      Saturday, Dec 12, 2026
                    </h3>
                    <div className="muhurat-badge bg-maroon border border-gold-400 px-6 py-2 rounded-full inline-block mb-3">
                      <span className="lbl text-gold-200 text-[10px] uppercase font-bold tracking-wider block">
                        Auspicious Time
                      </span>
                      <span className="val text-gold-50 font-heading text-sm md:text-base font-extrabold">
                        Evening 06:30 PM (IST)
                      </span>
                    </div>
                    <p className="revealed-location font-heading text-maroon text-xs md:text-sm flex items-center justify-center gap-1">
                      <MapPin className="w-4.5 h-4.5 text-emerald inline" />
                      The Grand City Palace, Jaipur, Rajasthan
                    </p>
                  </div>
                </div>

                {/* THE GOLD FOIL CANVAS */}
                {!scratchRevealed && (
                  <canvas
                    ref={scratchCanvasRef}
                    id="scratch-canvas"
                    className="absolute inset-0 z-20 cursor-pointer touch-none"
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onMouseMove={onMouseMove}
                    onTouchStart={onTouchStart}
                    onTouchEnd={onTouchEnd}
                    onTouchMove={onTouchMove}
                  />
                )}
              </div>

              {/* Interactive Help banner */}
              <div id="scratch-helper" className="scratch-helper-text text-center text-xs text-gold-100 font-sans tracking-wide mt-3 flex items-center justify-center gap-1.5">
                <Hand className="w-4 h-4 animate-bounce text-gold-300" />
                <span>
                  {scratchRevealed ? "🎉 Muhurat Date Unveiled Successfully! " : "✨ Gently drag or rub with your finger to scratch off the golden veil"}
                </span>
              </div>
            </div>
          </section>

          {/* 6. WEDDING DETAILS & PARENT NAMES CARD PANEL */}
          <section id="wedding-details" className="scroll-section">
            <div className="section-header">
              {/* OM rounded animated */}
              <div className="flex justify-center mb-3">
                <div className="relative w-16 h-16 flex items-center justify-center">
                  {/* Rotating elegant golden rings */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '24s' }}>
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <circle cx="50" cy="50" r="44" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="6,4" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="#D4AF37" strokeWidth="0.75" />
                    </svg>
                  </div>
                  {/* Non-rotating big Devanagari Sanskrit OM character */}
                  <span className="font-heading font-black text-2xl text-maroon/90 select-none drop-shadow-md">
                    ॐ
                  </span>
                </div>
              </div>
              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                The Royal Families
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                With blessings of grandparents and guidance of parents
              </p>
            </div>

            <div className="details-grid mt-12">

              {/* Bride side family card */}
              <div className="family-card bride-side relative">
                <div className="card-inner-frame">
                  <div className="royal-corner-decor" />
                  <h3 className="side-title">Bride's Family</h3>
                  <div className="portrait-placeholder">
                    <img
                      src="https://png.pngtree.com/png-clipart/20250514/original/pngtree-elegant-indian-bride-side-profile-illustration-png-image_20974803.png"
                      alt="Bride Vaishnavi Side Profile"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="family-main-name">Vaishnavi Rangdal</h4>
                  <div className="family-details text-xs md:text-sm font-serif">
                    <strong className="text-gold-400 font-heading">Parents:</strong><br />
                    Late Smt. Surekha &amp; Shri Vijay Rangdal
                  </div>

                  <span className="royal-signature">The Rangdal Family</span>
                </div>
              </div>

              {/* Groom side family card */}
              <div className="family-card groom-side relative">
                <div className="card-inner-frame">
                  <div className="royal-corner-decor" />
                  <h3 className="side-title">Groom's Family</h3>
                  <div className="portrait-placeholder">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShAysEla3v-iOZU7KZ_yKoVuGhAdE_0f1AtbeeQIKebRc9d5xzXZyZPRw&s=10"
                      alt="Groom Ashish Portrait"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h4 className="family-main-name">Ashish Bhagwat</h4>
                  <div className="family-details text-xs md:text-sm font-serif">
                    <strong className="text-gold-400 font-heading">Parents:</strong><br />
                    Late Smt. Ambika &amp; Late Shri. Sanjeev Bhagwat
                  </div>
                  <span className="royal-signature">The Bhagwat Family</span>
                </div>
              </div>

            </div>
          </section>

          {/* 8. PHOTO GALLERY ALBUM SECTION */}
          <section id="gallery-section" className="scroll-section">
            <div className="section-header">
              <div className="mandala-divider" />
              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                Our Beautiful Journey
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                Capturing beautiful memories forever
              </p>
            </div>

            <div className="masonry-gallery-container mt-12">
              {GALLERY_ITEMS.map((item, idx) => (
                <div
                  key={item.title}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setLightboxOpen(true);
                  }}
                  className={`polaroid-card item-${idx + 1}`}
                >
                  <div className="polaroid-img-wrapper">
                    <div className={`polaroid-dummy-img ${item.className}`} />
                  </div>
                  <div className="polaroid-caption">{item.title}</div>
                  <div className="floating-memory-note">
                    {idx === 0 && "Sunsets ✨"}
                    {idx === 1 && "Memories 💍"}
                    {idx === 2 && "Cute Moment ❤️"}
                    {idx === 3 && "Laughters 😄"}
                    {idx === 4 && "Royal Shoots ⚜️"}
                    {idx === 5 && "Soulmates 🕊️"}
                  </div>
                </div>
              ))}
            </div>

            {/* LIGHTBOX SLIDESHOW POPUP */}
            {lightboxOpen && (
              <div className="lightbox-overlay fixed inset-0 bg-[#4a1212c4] z-50 flex justify-center items-center">
                <button
                  onClick={() => setLightboxOpen(false)}
                  className="lightbox-close absolute top-6 right-6 text-gold focus:outline-none p-2 cursor-pointer"
                  aria-label="Close Lightbox"
                >
                  <X className="w-10 h-10" />
                </button>

                <button
                  onClick={() => changeSlide(-1)}
                  className="lightbox-prev"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-12 h-12" />
                </button>

                <button
                  onClick={() => changeSlide(1)}
                  className="lightbox-next"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-12 h-12" />
                </button>

                <div className="lightbox-content-box max-w-[85%] max-h-[80vh] text-center">
                  <img
                    src={
                      lightboxIndex === 0 ? "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800" :
                        lightboxIndex === 1 ? "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800" :
                          lightboxIndex === 2 ? "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800" :
                            lightboxIndex === 3 ? "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800" :
                              lightboxIndex === 4 ? "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800" :
                                "https://t4.ftcdn.net/jpg/01/93/38/99/240_F_193389983_UXs9j5nT7co7x7XLxNWfmLFTqXx0eEwy.jpg?auto=format&fit=crop&q=80&w=800"
                    }
                    className="lightbox-img-placeholder border-4 border-gold rounded-lg shadow-2xl max-w-full max-h-[60vh] object-cover"
                    alt={GALLERY_ITEMS[lightboxIndex].title}
                  />
                  <p id="lightbox-caption" className="font-heading text-gold-200 mt-4 text-base md:text-lg">
                    {GALLERY_ITEMS[lightboxIndex].title}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* 9. SPECIAL INVITATIONS SECTION */}
          <section id="special-invitation-section" className="scroll-section py-16 px-4">
            <div className="section-header">

              {/* Crackers Animation */}
              <div className="crackers-animation-container">
                {/* Left Flower Pot (Anar) */}
                <div className="anar-container">
                  <div className="anar-fountain">
                    <span className="anar-sparkle anar-sparkle-1" />
                    <span className="anar-sparkle anar-sparkle-2" />
                    <span className="anar-sparkle anar-sparkle-3" />
                    <span className="anar-sparkle anar-sparkle-4" />
                    <span className="anar-sparkle anar-sparkle-5" />
                    <span className="anar-sparkle anar-sparkle-6" />
                    <span className="anar-sparkle anar-sparkle-7" />
                    <span className="anar-sparkle anar-sparkle-8" />
                  </div>
                  <div className="anar-pot" />
                </div>

                {/* Central Garland of Crackers (Ladi) */}
                <div className="ladi-container">
                  <div className="ladi-string" />
                  <div className="ladi-crackers-wrapper">
                    <div className="ladi-cracker-pair">
                      <span className="ladi-cracker left" />
                      <span className="ladi-cracker right" />
                    </div>
                    <div className="ladi-cracker-pair">
                      <span className="ladi-cracker left" />
                      <span className="ladi-cracker right" />
                    </div>
                    <div className="ladi-cracker-pair">
                      <span className="ladi-cracker left" />
                      <span className="ladi-cracker right" />
                    </div>
                    <div className="ladi-cracker-pair">
                      <span className="ladi-cracker left" />
                      <span className="ladi-cracker right" />
                    </div>
                    <div className="ladi-fuse">
                      <span className="ladi-fuse-sparkle sparkle-1" />
                      <span className="ladi-fuse-sparkle sparkle-2" />
                      <span className="ladi-fuse-sparkle sparkle-3" />
                      <span className="ladi-fuse-sparkle sparkle-4" />
                      <span className="ladi-fuse-sparkle sparkle-5" />
                      <span className="ladi-fuse-sparkle sparkle-6" />
                      <span className="ladi-fuse-sparkle sparkle-7" />
                      <span className="ladi-fuse-sparkle sparkle-8" />
                    </div>
                  </div>
                </div>

                {/* Right Flower Pot (Anar) */}
                <div className="anar-container">
                  <div className="anar-fountain">
                    <span className="anar-sparkle anar-sparkle-1" />
                    <span className="anar-sparkle anar-sparkle-2" />
                    <span className="anar-sparkle anar-sparkle-3" />
                    <span className="anar-sparkle anar-sparkle-4" />
                    <span className="anar-sparkle anar-sparkle-5" />
                    <span className="anar-sparkle anar-sparkle-6" />
                    <span className="anar-sparkle anar-sparkle-7" />
                    <span className="anar-sparkle anar-sparkle-8" />
                  </div>
                  <div className="anar-pot" />
                </div>
              </div>

              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                Special Invitation
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                With best compliments and love
              </p>
            </div>

            <div className="special-invitation-container max-w-4xl mx-auto px-4 mt-8 flex justify-center">

              {/* Special Invitees Card */}
              <div className="special-invitation-card w-full max-w-md">
                <div className="special-card-body">
                  <div>
                    <h3 className="font-royal text-maroon text-xl font-bold">Special Invitees</h3>
                    <div className="special-card-title-decor" />
                    <div className="special-names-list">
                      <div className="special-name-item">Shubham, Sumit, Prathmesh, Harikesh, Komal, Sanjana, Gajanan, Sharad</div>
                      <div className="special-name-item">All Dear Friends &amp; Colleagues</div>

                    </div>
                  </div>
                  <div className="special-card-footer-quote">
                    Waiting for your arrival...
                  </div>
                </div>
              </div>

            </div>

          </section>

          {/* 10. DIRECTIONS MAP EXERCISES */}
          <section id="venue-experience-section" className="scroll-section">
            <div className="section-header">
              <DholTashaIcon className="w-20 h-20 mx-auto mb-2" />
              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                The Royal Venue Location
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                Experience the Bhokar
              </p>
            </div>

            <div className="venue-card-wrapper flex flex-col md:flex-row mt-12 bg-amber-50 rounded-2xl border border-gold border-r-0 max-w-4xl mx-auto shadow-xl overflow-hidden">
              <div className="venue-info-box flex-1 p-8 relative flex flex-col justify-center">
                <div className="decor-corner top-left" />
                <div className="decor-corner bottom-right" />
                <h3 className="font-royal font-bold text-maroon text-lg md:text-xl mb-2">
                  The Tamsa Balaji Mandir
                </h3>
                <p className="venue-addr-line font-serif text-stone-700 text-xs md:text-sm mb-2 leading-relaxed">
                  Balaji Mandir Road, Tamsa, Maharashtra, 431713
                </p>
                <p className="venue-contact font-sans text-emerald text-[11px] md:text-xs font-semibold mb-6">
                  Vidhyadhar Waichale | 📞 +91 9049398000
                </p>
                <div className="venue-actions">
                  <a
                    href="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357.9404718849231!2d77.6118288634267!3d19.37260028005992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1e8f93e1c0b4b%3A0x2c69abd66e6c430c!2sBalaji%20Mandir%20Rd%2C%20Tamsa%2C%20Maharashtra%20431713!5e0!3m2!1sen!2sin!4v1782391611143!5m2!1sen!2sin"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="royal-btn shadow-md py-3.5 px-6 inline-flex items-center gap-1.5"
                    id="btn-navigate"
                  >
                    <MapPin className="w-4.5 h-4.5 text-maroon-dark inline" />
                    Navigate on Google Maps
                  </a>
                </div>
              </div>

              <div className="venue-map-iframe-container flex-1.2 h-80 min-h-[300px]">
                <iframe
                  title="Google Maps Bhokar Balaji mandir"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d357.9404718849231!2d77.6118288634267!3d19.37260028005992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd1e8f93e1c0b4b%3A0x2c69abd66e6c430c!2sBalaji%20Mandir%20Rd%2C%20Tamsa%2C%20Maharashtra%20431713!5e0!3m2!1sen!2sin!4v1782391611143!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </section>

          {/* 11. CALENDAR BANNER */}
          <section id="calendar-section" className="scroll-section">
            <div className="calendar-card-banner max-w-4xl mx-auto bg-gradient-to-r from-maroon to-maroon-dark p-10 rounded-2xl border-2 border-gold text-center relative overflow-hidden shadow-2xl">
              <div className="shine-sweep-overlay" />
              <h3 className="banner-title text-gold font-royal text-xl md:text-2xl font-black mb-3">
                Block Your Date for the Royal Union
              </h3>
              <p className="banner-dates text-gold-100 font-heading text-lg mb-6">
                Saturday, December 12, 2026
              </p>
              <div className="banner-actions flex justify-center mt-4">
                <button
                  onClick={handleCalendarLink}
                  className="royal-btn cursor-pointer py-3.5 px-8 inline-flex items-center justify-center gap-2 mx-auto shadow-md"
                  id="btn-calendar-add"
                  style={{ display: 'inline-flex' }}
                >
                  <CalendarPlus className="w-5 h-5 flex-shrink-0" />
                  <span>Add to Google Calendar 📅</span>
                </button>
              </div>

              {calendarSuccess && (
                <div className="success-alert-message text-gold-200 mt-4 text-xs font-semibold flex items-center justify-center gap-1.5">
                  <span>🎉 Event details generated successfully! Redirecting check calendar popup.</span>
                </div>
              )}
            </div>
          </section>

          {/* 12. COUNTDOWN TIMER */}
          <section id="countdown-section" className="scroll-section">
            <div className="section-header">
              <KalashIcon className="w-20 h-20 mx-auto mb-2" />
              <h2 className="font-royal text-maroon text-3xl md:text-4xl font-extrabold mt-3">
                Awaiting the Auspicious Day
              </h2>
              <p className="subtitle font-handwritten text-emerald text-2xl mt-1">
                Days remaining until the sacred pheras
              </p>
            </div>

            <div className="countdown-clock-wrapper flex items-center justify-center gap-3 md:gap-4 mt-12 px-4">
              <div className="clock-element">
                <span className="clock-val font-royal font-black text-2xl md:text-4xl text-gold-100">
                  {countdown.days}
                </span>
                <span className="clock-lbl text-[10px] md:text-xs">Days</span>
              </div>
              <div className="clock-colon text-maroon text-2xl select-none">:</div>

              <div className="clock-element">
                <span className="clock-val font-royal font-black text-2xl md:text-4xl text-gold-100">
                  {countdown.hours}
                </span>
                <span className="clock-lbl text-[10px] md:text-xs">Hours</span>
              </div>
              <div className="clock-colon text-maroon text-2xl select-none">:</div>

              <div className="clock-element">
                <span className="clock-val font-royal font-black text-2xl md:text-4xl text-gold-100">
                  {countdown.minutes}
                </span>
                <span className="clock-lbl text-[10px] md:text-xs">Mins</span>
              </div>
              <div className="clock-colon text-maroon text-2xl select-none">:</div>

              <div className="clock-element">
                <span className="clock-val font-royal font-black text-2xl md:text-4xl text-gold-100">
                  {countdown.seconds}
                </span>
                <span className="clock-lbl text-[10px] md:text-xs">Secs</span>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="relative bg-maroon-dark text-gold p-12 text-center mt-20">
            <div className="footer-decor-top" />
            <div className="footer-content max-w-2xl mx-auto">
              <p className="sanskrit-blessing-quote font-heading text-lg md:text-xl text-gold-100 mb-3 font-semibold leading-relaxed">
                "ऋतेन मित्रावरुणावृतावृधावृतेस्पृशा । <br />
                क्रतुं बृहन्तमाशाथे ।। "
              </p>
              <p className="quote-translation font-serif italic text-gold-200/80 text-xs md:text-sm mb-8 leading-relaxed">
                "O Mitra and Varuna, guardians of truth, may our lives be strengthened in divine truth, eternal goodwill, and pure devotion."
              </p>
              <div className="footer-monogram font-royal text-2xl text-gold mb-3">
                A ❤️ V
              </div>
              <h4 className="footer-thanks font-heading text-sm uppercase tracking-widest text-gold-100 mb-6 font-bold">
                Thank you for being part of our beautiful journey!
              </h4>
              <div className="footer-contact-info text-xs text-gold-200/90 mb-6">
                <p>For inquiries, please contact: VIDHYADHAR HIRAMAN WAICHALE | +91 90493 98000</p>
              </div>


              {/* Developer Attribution Footnote from request */}
              <div className="developer-info-block mt-12 pt-6 border-t border-dashed border-gold/10 text-[10px] text-gold-200/60 font-mono tracking-widest uppercase">
                Developed with ❤️ by <a href="https://iamgajanan.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors underline underline-offset-4 decoration-gold/30">Gajanan Waichale</a>
              </div>

            </div>
          </footer>

        </main>
      )
      }

    </div >
  );
}
