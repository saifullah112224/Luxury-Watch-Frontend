import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Loader.css";

function Loader() {
const loaderRef = useRef(null);

useEffect(() => {
  const tl = gsap.timeline();

  tl.from(loaderRef.current, {
    opacity: 0,
    duration: 0.8,
  });

  tl.from(".ring", {
    scale: 0,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.2,
  });

tl.from(".logo", {
  y: 120,
  opacity: 0,
  scale: 0.5,
  duration: 2,
  ease: "power4.out",
});

  tl.from(".subtitle", {
    y: 30,
    opacity: 0,
    duration: 0.8,
  });

}, []);

  return (
<motion.div
  ref={loaderRef}
  className="loader-container"
  initial={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.8 }}
>

    <div className="blur1"></div>

<div className="blur2"></div>

        {/* Floating Particles */}
<div className="particle p1"></div>
<div className="particle p2"></div>
<div className="particle p3"></div>
<div className="particle p4"></div>
<div className="particle p5"></div>
<div className="particle p6"></div>
<div className="particle p7"></div>
<div className="particle p8"></div>

      {/* Background Glow */}
      <div className="loader-glow"></div>

      {/* Rotating Ring */}
      <motion.div
        className="ring"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 6,
          ease: "linear",
        }}
      />

      {/* Second Ring */}
      <motion.div
        className="ring ring2"
        animate={{ rotate: -360 }}
        transition={{
          repeat: Infinity,
          duration: 10,
          ease: "linear",
        }}
      />

      {/* Logo */}
     <div className="crown">
<motion.h1
  className="logo"
  initial={{
    opacity: 0,
    y: 60,
    scale: 0.8,
  }}
  animate={{
    opacity: 1,
    y: 0,
    scale: [1, 1.03, 1],
  }}
  transition={{
    opacity: {
      duration: 1.5,
      delay: 1,
    },
    y: {
      duration: 1.5,
      delay: 1,
    },
    scale: {
      duration: 2,
      repeat: Infinity,
    },
  }}
>
  TimeLuxe
</motion.h1>

  <div className="shine"></div>
</div>

      <motion.p
        className="subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 1,
        }}
      >
        Luxury Watches
      </motion.p>

    </motion.div>
  );
}

export default Loader;