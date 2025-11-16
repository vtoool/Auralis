import React from 'react';

export const SpiritulNostruLogo: React.FC<{ className?: string }> = ({ className }) => (
    <div className={`flex items-center space-x-3 ${className}`}>
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-10 w-10">
            <path d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42" stroke="rgb(var(--color-accent))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6" stroke="rgb(var(--color-primary-light))" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3"/>
            <path d="M24 14C18.4772 14 14 18.4772 14 24C14 29.5228 18.4772 34 24 34C29.5228 34 34 29.5228 34 24C34 22.086 33.4022 20.3235 32.3852 18.892" stroke="rgb(var(--color-primary))" strokeWidth="2" strokeLinecap="round"/>
        </svg>
        <span className="font-serif text-xl font-bold text-primary">Spiritul Nostru</span>
    </div>
);