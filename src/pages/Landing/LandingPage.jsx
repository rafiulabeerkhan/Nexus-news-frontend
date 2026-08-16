import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaFacebook, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa6";
import {
  FiClock,
  FiMail,
  FiMapPin,
  FiMenu,
  FiPhoneCall,
  FiX,
} from "react-icons/fi";
import InternationalNews from "./NewsPages/InternationalNews";
import LatestNews from "./NewsPages/LatestNews";
import { useNavigate } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Navbar from "./Navbar/Navbar";
import useNews from "../../hooks/useNews";
import { formatDate } from "../../utils/dateConverter";
import { getImageUrl } from "../../utils/getImageUrl";
import Hero from "./components/Hero";
import FeaturedCategories from "./components/FeaturedCategories";
import Footer from "./components/Footer";
/* ── MODERN SHADOWS & COLORS (LIGHT-THEME PALETTE) ── */
// const C = {
//   bgDark: "#F8FAFC", // light gray background (halka gray)
//   bgCard: "#ffffff", // white card background
//   bgCardHover: "#ffffff",
//   borderWhite: "rgba(15, 23, 42, 0.06)", // light slate border
//   navy: "#1A3A5F", // primary brand navy
//   navyD: "#0F172A", // deep dark slate text
//   navyL: "#1E293B", // medium slate text
//   primary: "#d4af37", // Emerald green standard buttons
//   primaryHover: "#d4af37",
//   primaryDark: "#10b981",
//   primaryL: "rgba(5, 150, 105, 0.15)",
//   white: "#ffffff",
//   offW: "#F1F5F9",
//   gray: "#64748B", // slate gray for description text
//   grayL: "#E2E8F0", // border gray
//   text: "#0F172A", // main text color
// };

/* ── DYNAMIC BACKGROUND BLOBS ───────────────────────── */
function BackgroundBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Soft Pastel Glow Blob 1 */}
      <motion.div
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -50, 70, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[10%] left-[5%] w-[350px] h-[350px] md:w-[500px] md:h-[500px] rounded-full bg-blue-400/5 blur-[120px]"
      />
      {/* Soft Pastel Glow Blob 2 */}
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 70, -60, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] right-[10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[#d4af37]/5 blur-[130px]"
      />
      {/* Soft Pastel Glow Blob 3 */}
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, 80, 40, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] md:w-[450px] md:h-[450px] rounded-full bg-indigo-400/5 blur-[110px]"
      />
      {/* Soft Dark Tech Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)]" />
    </div>
  );
}

/* ── CUSTOM SECTION ANIMATIONS ───────────────────────── */
// Stagger container
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.05,
    },
  },
};

// Hero Banner Left (Text slides in from left)
const bannerLeftVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const bannerItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// Hero Banner Right (Image slides in from right)
const bannerRightVariants = {
  hidden: { opacity: 0, x: 100, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

// Stats item skew reveal
const statItemVariants = {
  hidden: { opacity: 0, y: 45, skewY: 3 },
  visible: {
    opacity: 1,
    y: 0,
    skewY: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// How It Works / Steps card (niche theke asbe staggered)
const howCardVariants = {
  hidden: { opacity: 0, y: 70 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

// Features card pop & spring
const featureCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 85,
      damping: 14,
    },
  },
};

// Subjects card pop & rotate spring
const subjectCardVariants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -3 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// Testimonials card slide & tilt
const testimonialCardVariants = {
  hidden: { opacity: 0, y: 40, x: -25 },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// Download left-to-right content
const downloadLeftVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

const downloadRightVariants = {
  hidden: { opacity: 0, x: 80, scale: 0.95 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ── SCROLL ANIMATE-IN WRAPPER ───────────────────────── */
function ScrollReveal({ children, delay = 0, y = 35 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ── SECTION LABEL ──────────────────────────────────── */
function SectionTag({ children }) {
  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className="inline-block text-xs font-bold bg-[#1A3A5F]/5 text-[#1A3A5F] border border-[#1A3A5F]/15 rounded-full px-4 py-1.5 mb-4 tracking-widest uppercase shadow-sm"
    >
      {children}
    </motion.span>
  );
}

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  const navigate = useNavigate();


  const handleNavClick = (item) => {
    switch (item.type) {
      case "route":
        navigate(item.path);
        break;

      case "category":
        navigate(item.path);
        break;

      case "section": {
        const section = document.getElementById(item.path);

        if (section) {
          section.scrollIntoView({
            behavior: "smooth",
          });
        } else {
          navigate("/", {
            state: {
              scrollTo: item.path,
            },
          });
        }

        break;
      }

      default:
        break;
    }

    setOpen(false);
  };
  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-white/80 backdrop-blur-xl border-b border-slate-200/50 shadow-sm py-3"
          : "bg-transparent border-b border-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between">
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-extrabold text-[#1A3A5F] cursor-pointer"
        >
          NexusNews
        </motion.div>

        {/* DESKTOP MENU */}

        <Navbar handleNavClick={handleNavClick} />

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-3"></div>

        {/* MOBILE TOGGLE */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl text-[#1A3A5F]"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-5 flex flex-col gap-4"
          >
            <Navbar
              handleNavClick={(item) => {
                handleNavClick(item);
                setOpen(false);
              }}
              mobile
            />
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
/* ── HERO EXTRACTED ───────────────────────────────────────────── */

/* ── NEWS GRID EXTRACTED ───────────────────────────────────────────── */

function Stats() {
  return (
    <section className="relative py-8 md:py-10 border-y border-slate-200/60 bg-gradient-to-r from-slate-50 via-slate-100/50 to-slate-50 z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 justify-center"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={statItemVariants}
              whileHover={{ y: -5, scale: 1.03 }}
              className="text-center p-6 rounded-2xl bg-white border border-slate-200/50 shadow-md"
            >
              <div className="text-3xl md:text-4xl font-black text-[#1A3A5F] tracking-tight">
                <Counter value={s.val} suffix={s.suffix} />
              </div>
              <div className="text-xs md:text-sm text-slate-500 mt-2 font-semibold tracking-wide uppercase">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── CONTACT US ─────────────────────────────────────── */
function ContactUs() {
  const contactInfo = [
    {
      icon: <FiMapPin size={22} />,
      title: "Office Address",
      detail: "NexusNews Office, Maijdee, Noakhali, Bangladesh",
      color: "bg-red-500/10 text-red-600",
    },
    {
      icon: <FiPhoneCall size={22} />,
      title: "Helpline",
      detail: "+880 1900-NEWS-01 / +880 1700-NEWS-02",
      color: "bg-[#0F172A]/10 text-[#0F172A]",
    },
    {
      icon: <FiMail size={22} />,
      title: "Email",
      detail: "news@nexusnews.com / info@nexusnews.com",
      color: "bg-amber-500/10 text-amber-600",
    },
    {
      icon: <FiClock size={22} />,
      title: "Editorial Hours",
      detail: "9:00 AM - 9:00 PM (Daily)",
      color: "bg-emerald-500/10 text-emerald-600",
    },
  ];

  return (
    <section
      id="contact-us"
      className="relative py-12 md:py-16 bg-white text-slate-800 z-10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* HEADER */}
        <div className="text-center mb-10 max-w-xl mx-auto">
          <span className="inline-block bg-red-200 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
            Contact
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight mt-3">
            Get In Touch
          </h2>

          <p className="text-base md:text-lg text-slate-500 mt-4 leading-relaxed">
            Contact our office to submit news, advertisements, or reports.
          </p>
        </div>

        <div className="grid md:grid-cols-12 gap-10 items-center">
          {/* LEFT SIDE - CONTACT INFO */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-6 space-y-5"
          >
            {contactInfo.map((item) => (
              <motion.div
                key={item.title}
                whileHover={{ x: 6, scale: 1.01 }}
                className="flex gap-5 items-center p-5 rounded-2xl border border-slate-200/60 bg-slate-50/50 hover:bg-white hover:shadow-lg transition-all"
              >
                <div
                  className={`w-12 h-12 min-w-12 rounded-xl flex items-center justify-center font-bold ${item.color}`}
                >
                  {item.icon}
                </div>

                <div className="text-left">
                  <h4 className="text-base font-bold text-[#0F172A]">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-600 mt-1 font-medium">
                    {item.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* RIGHT SIDE - NEWS OFFICE SUPPORT CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="md:col-span-6 flex justify-center relative"
          >
            {/* background glow */}
            <div className="absolute w-[280px] h-[280px] rounded-full bg-red-500/10 blur-[60px] -z-10" />
            <div className="absolute w-[180px] h-[180px] rounded-full bg-amber-400/10 blur-[40px] -z-10" />

            <div className="w-full max-w-[400px] bg-slate-50 border border-slate-200/80 rounded-3xl p-8 text-center shadow-xl relative">
              {/* icon */}
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#0F172A] to-[#1E293B] text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <FiPhoneCall size={34} />
              </div>

              <h3 className="text-xl font-extrabold text-[#0F172A] mb-2">
                News Desk Support
              </h3>

              <p className="text-sm text-slate-500 leading-relaxed max-w-[260px] mx-auto mb-6">
                Share local news, complaints, or important information with our news team.
              </p>

              <motion.a
                href="tel:+8801900000000"
                whileHover={{
                  scale: 1.05,
                  background: "#0F172A",
                  boxShadow: "0 8px 20px rgba(15,23,42,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-3 bg-[#0F172A] text-white font-bold text-sm px-6 py-3.5 rounded-xl transition-all"
              >
                <FiPhoneCall size={16} />
                Call: News Desk
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialMedia() {
  const socials = [
    {
      name: "Facebook",
      link: "https://facebook.com/",
      desc: "Follow for the latest news and updates",
      color: "bg-blue-500/10 text-blue-600",
      icon: <FaFacebook size={22} />,
    },
    {
      name: "YouTube",
      link: "https://youtube.com",
      desc: "Watch video news and reports",
      color: "bg-red-500/10 text-red-600",
      icon: <FaYoutube size={22} />,
    },
    {
      name: "WhatsApp Channel",
      link: "https://whatsapp.com",
      desc: "Get instant breaking news",
      color: "bg-green-500/10 text-green-600",
      icon: <FaWhatsapp size={22} />,
    },
    {
      name: "Twitter / X",
      link: "https://twitter.com",
      desc: "Live updates and trending news",
      color: "bg-slate-900/10 text-slate-800",
      icon: <FaTwitter size={22} />,
    },
  ];

  return (
    <section
      id="social-media"
      className="py-14 md:py-20 bg-white text-slate-800"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* HEADER */}
        <div className="text-center mb-12">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full">
            Social Media
          </span>

          <h2 className="text-3xl md:text-5xl font-extrabold mt-3 text-[#0F172A]">
            Connect with NexusNews
          </h2>

          <p className="text-slate-500 mt-4 max-w-xl mx-auto">
            Stay connected on our social media platforms and get the latest news first.
          </p>
        </div>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socials.map((item) => (
            <a
              key={item.name}
              href={item.link}
              target="_blank"
              rel="noreferrer"
              className="group p-6 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-lg transition-all duration-300"
            >
              {/* ICON */}
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}
              >
                {item.icon}
              </div>

              {/* TEXT */}
              <h3 className="text-lg font-bold text-black group-hover:text-primary-600 transition">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                {item.desc}
              </p>

              <div className="mt-4 text-sm font-semibold text-red-600 opacity-0 group-hover:opacity-100 transition">
                Follow →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── FOOTER EXTRACTED ───────────────────────────────────────────── */

/* ── ROOT LANDING PAGE ──────────────────────────────── */
export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="bg-[#F8FAFC] min-h-screen text-[#0F172A] font-sans antialiased overflow-x-hidden relative selection:bg-primary-600 selection:text-white">
      {/* Scroll indicator bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-600 via-primary-500 to-primary-400 origin-[0%] z-50 shadow-sm"
      />

      {/* Dynamic Animated Grid/Blobs background */}
      <BackgroundBlobs />

      <div className="relative z-10">
        <Nav />
        <Hero />
        <FeaturedCategories />

        <InternationalNews id="international" />
        <LatestNews id="latest" />
        <ContactUs />
        <SocialMedia />
        <Footer />
      </div>
    </div>
  );
}
