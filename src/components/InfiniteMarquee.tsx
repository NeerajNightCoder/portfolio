import type { ReactNode } from 'react';

interface InfiniteMarqueeProps {
    children: ReactNode;
    direction?: 'left' | 'right';
    speed?: string;
    className?: string;
}

const InfiniteMarquee = ({
    children,
    direction = 'left',
    speed = '20s',
    className = ''
}: InfiniteMarqueeProps) => {
    return (
        <div className={`overflow-hidden whitespace-nowrap mask-fade ${className}`}>
            <div
                className={`inline-block ${direction === 'left' ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                style={{ animationDuration: speed }}
            >
                <div className="inline-flex gap-8 px-4">
                    {children}
                </div>
                <div className="inline-flex gap-8 px-4">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default InfiniteMarquee;
