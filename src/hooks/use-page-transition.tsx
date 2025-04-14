
import * as React from "react"
import { useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useNetworkStatus } from "./use-network"
import { useDeviceOrientation } from "./use-orientation"

interface PageTransitionProps {
  children: React.ReactNode
}

export const pageVariants = {
  initial: {
    opacity: 0,
    x: 20
  },
  in: {
    opacity: 1,
    x: 0
  },
  out: {
    opacity: 0,
    x: -20
  }
}

export const pageTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2
}

export function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const { isOnline } = useNetworkStatus();
  const orientation = useDeviceOrientation();
  
  // Prevent transitions when offline to improve performance
  const shouldAnimate = isOnline;
  
  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={location.pathname}
        initial={shouldAnimate ? "initial" : false}
        animate={shouldAnimate ? "in" : { opacity: 1, x: 0 }}
        exit={shouldAnimate ? "out" : false}
        variants={pageVariants}
        transition={pageTransition}
        className="min-h-screen w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
