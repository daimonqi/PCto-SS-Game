import React from 'react';

export default function BrandedLoader({ pullDistance, threshold }) {
    // Calculate progress from 0 to 1 based on pull distance
    const progress = Math.min(pullDistance / threshold, 1);
    
    return (
        <div 
            className="absolute top-0 left-0 w-full flex items-center justify-center overflow-hidden bg-black z-0"
            style={{ 
                height: `${pullDistance}px`,
                opacity: progress > 0.2 ? 1 : 0, 
                transition: 'opacity 0.2s'
            }}
        >
            <div 
                className="flex flex-col items-center justify-center gap-3 transition-transform duration-100"
                style={{
                    transform: `scale(${0.8 + (progress * 0.2)}) translateY(${(1 - progress) * 20}px)`,
                    opacity: progress
                }}
            >
                {/* Brand Logo / Icon */}
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                    <span className="material-icons text-black text-2xl animate-pulse">sports_esports</span>
                </div>
                
                {/* Brand Text & Hint */}
                <div className="flex flex-col items-center">
                    <span className="text-xl font-bold tracking-[0.3em] text-white">NEXUS</span>
                    <span className="text-xs text-textSecondary mt-1">
                        {progress >= 1 ? 'Release to enter Game Space' : 'Keep pulling...'}
                    </span>
                </div>
            </div>
            
            {/* Optional: progress bar indicator at the bottom of the loader area */}
            <div className="absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-100" style={{ width: `${progress * 100}%` }}></div>
        </div>
    );
}
