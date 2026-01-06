"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: "16px 24px",
      }}
    >
      <Link href="/" style={{ display: "inline-block" }}>
        <Image
          src="/logos/rebuild4.png"
          alt="re.build"
          width={140}
          height={40}
          style={{ width: "140px", height: "auto" }}
          priority
        />
      </Link>
    </motion.header>
  );
}
