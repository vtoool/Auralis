import React from 'react';

// Exported for reuse
export const UniversalLogoIcon: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`relative text-accent ${className || 'h-10 w-10'}`} style={{ filter: 'drop-shadow(0 0 6px rgb(var(--color-accent) / 0.6))' }}>
       <svg viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
           <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin='round'>
               {/* Arc */}
               <path d="M43 27C43 16.5066 34.4934 8 24 8C13.5066 8 5 16.5066 5 27" />
               
               {/* Circle */}
               <circle cx="24" cy="19" r="2" fill="currentColor" stroke="none" />
               
               {/* Petals */}
               <path d="M24 27.5 C 19 32 17 42 17 42" />
               <path d="M24 27.5 C 29 32 31 42 31 42" />

               <path d="M24 27.5 C 21.5 33 20.5 42 20.5 42" />
               <path d="M24 27.5 C 26.5 33 27.5 42 27.5 42" />
               
               <path d="M24 27.5 C 24 34 24 42 24 42" />

               {/* Inner lines for petals */}
                <path d="M24 33 C 22.5 35.5 22 42 22 42" strokeWidth="0.75" />
                <path d="M24 33 C 25.5 35.5 26 42 26 42" strokeWidth="0.75" />
           </g>
       </svg>
   </div>
);

const Logo: React.FC = () => {
    return (
        <div className="flex items-center space-x-2">
            <UniversalLogoIcon />
            <span className="font-serif text-2xl font-bold text-primary">Auralis</span>
        </div>
    );
};

export default Logo;