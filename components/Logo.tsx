
import React from 'react';

interface LogoProps {
  className?: string;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ className = "text-zinc-900", height = 32 }) => {
  return (
    <svg 
      viewBox="0 0 440 160" 
      height={height} 
      className={className}
      fill="currentColor" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* L */}
      <path d="M20 20V140H140V110H50V20H20Z" />
      {/* Connected OO Loop */}
      <path d="M160 40C132.386 40 110 62.3858 110 90C110 117.614 132.386 140 160 140C187.614 140 210 117.614 210 90C210 62.3858 187.614 40 160 40ZM160 115C146.193 115 135 103.807 135 90C135 76.1929 146.193 65 160 65C173.807 65 185 76.1929 185 90C185 103.807 173.807 115 160 115Z" />
      <path d="M250 40C222.386 40 200 62.3858 200 90C200 117.614 222.386 140 250 140C277.614 140 300 117.614 300 90C300 62.3858 277.614 40 250 40ZM250 115C236.193 115 225 103.807 225 90C225 76.1929 236.193 65 250 65C263.807 65 275 76.1929 275 90C275 103.807 263.807 115 250 115Z" />
      {/* P connected to last O */}
      <path d="M290 40V140H320V105H370C397.614 105 420 82.6142 420 55C420 27.3858 397.614 5 370 5H290V40ZM320 35H370C381.046 35 390 43.9543 390 55C390 66.0457 381.046 75 370 75H320V35Z" />
      {/* Connectivity bars to match the 'Loop' feel */}
      <rect x="180" y="65" width="40" height="15" />
      <rect x="270" y="65" width="40" height="15" />
    </svg>
  );
};

export default Logo;
