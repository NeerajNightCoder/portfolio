import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

interface ScrollRevealProps {
    children: ReactNode
    direction?: 'up' | 'down' | 'left' | 'right' | 'none'
    delay?: number
    duration?: number
    distance?: number
}

export function ScrollReveal({
    children,
    direction = 'up',
    delay = 0,
    duration = 0.8,
    distance = 50
}: ScrollRevealProps) {
    const bezier = [0.21, 0.47, 0.32, 0.98] as const

    const variants = {
        hidden: {
            opacity: 0,
            y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
            x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
        },
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            transition: {
                duration,
                delay,
                ease: bezier as any,
            },
        } as any,
        exit: {
            opacity: 0,
            y: direction === 'up' ? -distance : direction === 'down' ? distance : 0,
            x: direction === 'left' ? -distance : direction === 'right' ? distance : 0,
            transition: {
                duration: duration * 0.6,
                ease: 'easeInOut',
            },
        },
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            exit="exit"
            viewport={{ once: false, amount: 0.2, margin: "200px 0px -10% 0px" }}
            variants={variants as any}
        >
            {children}
        </motion.div>
    )
}
