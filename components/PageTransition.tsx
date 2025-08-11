'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

export default function PageTransition({ children }: PropsWithChildren) {
  const pathname = usePathname()

  // Single-phase enter animation only (no exit), to avoid double fade
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
    >
      {children}
    </motion.main>
  )
}

