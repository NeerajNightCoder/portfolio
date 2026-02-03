import { ReactLenis } from '@studio-freight/react-lenis'
import type { ReactNode } from 'react'

interface SmoothScrollProps {
    children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.05,
                duration: 2,
                smoothWheel: true,
                wheelMultiplier: 1.2,
                touchMultiplier: 2.5,
                infinite: false,
            }}
        >
            {children as any}
        </ReactLenis>
    )
}
