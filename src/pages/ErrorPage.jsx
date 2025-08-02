import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.3, delayChildren: 0.2, ease: "easeOut" },
  },
};

const bounce = {
  hidden: { y: 0 },
  visible: {
    y: [0, -15, 0],
    transition: {
      duration: 1.8,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
};

const fadeScaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 120, damping: 14 },
  },
};

const rotateHand = {
  rotate: [0, 20, -20, 0],
  transition: { repeat: Infinity, duration: 5, ease: "easeInOut" },
};

const ErrorPage = () => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-screen bg-base-200 px-6"
    >
      {/* Smooth bouncing 404 */}
      <motion.h1
        variants={bounce}
        className="text-8xl md:text-9xl font-extrabold text-primary mb-8 select-none"
      >
        404
      </motion.h1>

      {/* Fade & scale text */}
      <motion.p
        variants={fadeScaleIn}
        className="text-lg md:text-xl text-center max-w-xl mb-12 text-white"
      >
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </motion.p>

      {/* Pulsing button */}
      <motion.div
        variants={fadeScaleIn}
        whileHover={{ scale: 1.1, boxShadow: "0 8px 20px rgba(59,130,246,0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          to="/"
          className="btn btn-primary btn-lg shadow-md"
          aria-label="Go to homepage"
        >
          Go Home
        </Link>
      </motion.div>

      {/* Gentle rotating clock hand icon */}
      <motion.div
        className="mt-20 text-primary"
        aria-hidden="true"
        animate={rotateHand}
        style={{ originX: 0.5, originY: 0.5 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-28 w-28 md:h-32 md:w-32"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 8v4l3 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ErrorPage;
