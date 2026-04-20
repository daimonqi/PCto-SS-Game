import React, { useState, useEffect } from 'react';

export default function GameSpace({ onClose }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger enter animation after mount
        const timer = setTimeout(() => setIsVisible(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onClose, 400); // Wait for exit animation
    };

    return (
        <div
            className={`fixed inset-0 z-50 bg-[#0a0a0c] text-white flex flex-col overflow-hidden transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'
                }`}
            style={{
                // Note: For a true landscape feel on mobile portrait, you would rotate the container:
                // transform: 'rotate(90deg)', transformOrigin: 'center center', width: '100vh', height: '100vw'
                // However, for web preview desktop, normal layout is better. We'll add styling that feels like a full-screen landscape game dashboard.
            }}
        >
            {/* Background Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/10 via-black to-black opacity-60"></div>

            {/* Top Navigation / Header */}
            <div className="relative z-10 w-full h-[64px] px-8 flex justify-between items-center bg-black/40 backdrop-blur-md border-b border-white/10">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
                        <span className="material-icons text-black text-sm">sports_esports</span>
                    </div>
                    <span className="text-lg font-bold tracking-widest text-[#e0e0e0]">NEXUS <span className="text-accent">SPACE</span></span>
                </div>

                <div className="flex items-center gap-6">
                    <div className="flex gap-4">
                        <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition">Library</span>
                        <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition">Store</span>
                        <span className="text-sm font-medium text-gray-400 hover:text-white cursor-pointer transition">Community</span>
                    </div>
                    <button
                        onClick={handleClose}
                        className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition ml-4 border border-white/10"
                    >
                        <span className="material-icons text-white">close</span>
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 flex p-8 gap-8 overflow-hidden">

                {/* Left: Recently Played / Featured Game */}
                <div className="flex-1 rounded-2xl overflow-hidden relative group cursor-pointer border border-white/10">
                    <img
                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"
                        alt="Cyberpunk Game"
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                    <div className="absolute bottom-0 left-0 p-8 w-full">
                        <div className="bg-accent text-black text-xs font-bold px-3 py-1 rounded w-fit mb-3 tracking-wider">RESUME</div>
                        <h1 className="text-5xl font-black mb-2 text-white drop-shadow-lg">CYBER NEON 2077</h1>
                        <p className="text-gray-300 text-sm max-w-md mb-6 line-clamp-2">Continue your journey in Night City. Your latest save is ready.</p>

                        <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-accent transition flex items-center gap-2">
                            <span className="material-icons">play_arrow</span>
                            PLAY NOW
                        </button>
                    </div>
                </div>

                {/* Right: Quick Launch / Stats */}
                <div className="w-[350px] flex flex-col gap-6">
                    {/* Stats Widget */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                        <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Player Stats</h3>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-3xl font-light">Level <span className="font-bold text-accent">42</span></div>
                                <div className="text-xs text-gray-500 mt-1">1,240 XP to next level</div>
                            </div>
                            <div className="w-12 h-12 rounded-full border-2 border-accent p-1">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100" alt="Avatar" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </div>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
                            <div className="bg-accent h-full w-[70%]"></div>
                        </div>
                    </div>

                    {/* Quick Friends */}
                    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Friends Online</h3>
                            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">3</span>
                        </div>

                        <div className="flex flex-col gap-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition">
                                    <div className="relative">
                                        <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden">
                                            <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="Friend" />
                                        </div>
                                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                                    </div>
                                    <div>
                                        <div className="text-sm font-bold">Player_{i}99</div>
                                        <div className="text-xs text-gray-500 truncate">Playing Valorant</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
            `}} />
        </div>
    );
}
