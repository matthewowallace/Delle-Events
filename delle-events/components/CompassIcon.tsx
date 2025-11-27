import React from "react";
type IconProps = {
    size?: number | string;
    className?: string;
    strokeWidth?: number;
    title?: string;
};

export const CompassIcon: React.FC<IconProps> = ({ size = 24, className = "", strokeWidth = 2, title = "Compass" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-hidden={!title}
        role={title ? "img" : "presentation"}
    >
        {title ? <title>{title}</title> : null}
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth={strokeWidth} />
        <polygon points="10.5,7.5 13.5,9 11.5,13 8.5,11" fill="currentColor" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
);

// === Animated Compass Icon ===
export const AnimatedCompass: React.FC<IconProps> = ({ size = 48, className = "", strokeWidth = 2, title = "Animated Compass" }) => (
    <div style={{ width: typeof size === 'number' ? size : undefined, height: typeof size === 'number' ? size : undefined }} className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
        {/* Inline styles for animation kept local to the component */}
        <style>{`
@keyframes compass-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes needle-swing { 0% { transform: rotate(-15deg); } 50% { transform: rotate(15deg); } 100% { transform: rotate(-15deg); } }
.compass-rotator { animation: compass-spin 8s linear infinite; transform-origin: 50% 50%; }
.compass-needle { transform-origin: 50% 50%; animation: needle-swing 1.8s ease-in-out infinite; }
`}</style>


        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {title ? <title>{title}</title> : null}


            {/* Outer ring */}
            <g className="compass-rotator">
                <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth={strokeWidth} fill="none" opacity="0.12" />
                <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth={strokeWidth} fill="none" />


                {/* Cardinal markers */}
                <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
                    <path d="M24 6 L24 10" />
                    <path d="M24 38 L24 42" />
                    <path d="M6 24 L10 24" />
                    <path d="M38 24 L42 24" />
                </g>
            </g>


            {/* Needle - uses its own swinging animation */}
            <g className="compass-needle">
                <path d="M24 12 L30 24 L24 28 L18 24 Z" fill="currentColor" />
                <circle cx="24" cy="24" r="2" fill="currentColor" />
            </g>
        </svg>
    </div>
);


// Note: AnimatedCompass is added to this file. To use it in your app:
// import { AnimatedCompass } from './ExploreIcons';
// <AnimatedCompass size={80} className="text-blue-600" />