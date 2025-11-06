import React from 'react';

// Exported for reuse
export const UniversalLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative text-accent ${className || 'h-10 w-10'}`} style={{ filter: 'drop-shadow(0 0 6px rgb(var(--color-accent) / 0.6))' }}>
       <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
           <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin='round' fill="none">
                {/* Arc */}
                <path d="M44 26C44 15.5066 35.4934 7 25 7C14.5066 7 6 15.5066 6 26" />
                
                {/* Flame/Lotus */}
                <path d="M25 45 C 18 35, 18 25, 25 19 C 32,25, 32,35, 25 45 Z" />
                <path d="M25 24 C 20 28, 17 45, 17 45" />
                <path d="M25 24 C 30 28, 33 45, 33 45" />
           </g>
       </svg>
   </div>
);

const Logo: React.FC = () => {
    return (
        <div className="flex items-center space-x-3">
            <UniversalLogoIcon />
            <div>
                <span className="block font-serif text-2xl font-bold tracking-widest text-primary leading-none">AURALIS</span>
                <span className="block font-sans text-[10px] text-text-secondary tracking-[0.2em] -mt-0.5">by Alice</span>
            </div>
        </div>
    );
};

export default Logo;