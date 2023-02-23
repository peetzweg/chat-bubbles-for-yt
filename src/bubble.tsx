import React from 'react'
import { motion, usePresence } from 'framer-motion'
import './bubble.css'

const transition = {
  type: 'spring',
  stiffness: 500,
  damping: 50,
  default: {
    duration: 0.4
  }
}

interface BubbleProps {
  id: number
  dy: number
  children: React.ReactNode
}

const Bubble = ({ id, children, dy }: BubbleProps) => {
  const [isPresent, safeToRemove] = usePresence()

  const animations = {
    layout: true,
    initial: 'out',

    animate: 'in',
    variants: {
      in: { opacity: 1, translateY: 0 },
      out: { opacity: 1, translateY: `${dy}px` }
    },
    exit: { opacity: 0, translateY: 0 },
    onAnimationComplete: () => !isPresent && safeToRemove(),
    transition
  }

  return (
    <div style={{ position: 'static' }}>
      <motion.div key={id} className="bubble" {...animations}>
        <div className="bubble-content">{children}</div>
      </motion.div>
    </div>
  )
}

export default Bubble
