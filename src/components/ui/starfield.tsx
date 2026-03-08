"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function Starfield() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -140]);

  return (
    <motion.div style={{ y }} className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(214,171,73,0.16),transparent_40%),radial-gradient(circle_at_72%_10%,rgba(139,166,217,0.16),transparent_34%),radial-gradient(circle_at_85%_80%,rgba(227,235,255,0.09),transparent_30%)]" />
      <div className="stars-layer-1 absolute inset-0" />
      <div className="stars-layer-2 absolute inset-0" />
      <div className="stars-layer-3 absolute inset-0" />
    </motion.div>
  );
}
