import React, { useState, useRef, useEffect } from 'react';
import BrandedLoader from './BrandedLoader';
import GameSpace from './GameSpace';

// Reusable Game Card Component
function GameCard({ title, tag1, tag2, price, imgSrc }) {
    return (
        <div className="w-[260px] flex-shrink-0 flex flex-col bg-bgSecondary rounded-lg overflow-hidden group cursor-pointer border border-transparent hover:border-borderColor transition-all duration-300">
            <div className="w-full h-[160px] bg-bgPrimary overflow-hidden relative">
                <img
                    src={imgSrc || "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop"}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bgSecondary to-transparent opacity-60"></div>
            </div>

            <div className="flex flex-col p-4 gap-3">
                <h3 className="text-textPrimary font-bold text-base truncate">{title}</h3>
                <div className="flex gap-2">
                    <span className="text-textSecondary text-xs">{tag1}</span>
                    <span className="text-textSecondary text-xs">&bull;</span>
                    <span className="text-textSecondary text-xs">{tag2}</span>
                </div>

                <div className="flex justify-between items-center mt-1">
                    <span className="text-textPrimary font-bold text-sm">{price}</span>
                    <button className="bg-[#2A2A2A] hover:bg-borderColor px-4 py-1.5 rounded-full text-textPrimary text-xs font-bold transition">获取</button>
                </div>
            </div>
        </div>
    );
}

export default function HomePage() {
    const [pullDistance, setPullDistance] = useState(0);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isGameSpaceOpen, setIsGameSpaceOpen] = useState(false);

    const startY = useRef(0);
    const currentY = useRef(0);
    const scrollContainerRef = useRef(null);
    const PULL_THRESHOLD = 150; // Distance required to trigger Game Space

    const handleTouchStart = (e) => {
        if (scrollContainerRef.current && scrollContainerRef.current.scrollTop === 0) {
            startY.current = e.touches[0].clientY;
            currentY.current = e.touches[0].clientY;
        } else {
            startY.current = null;
        }
    };

    const handleTouchMove = (e) => {
        if (startY.current === null || isRefreshing) return;

        const y = e.touches[0].clientY;
        // Only pull if swiping down from the very top
        if (y > startY.current) {
            // Apply resistance formula
            const distance = (y - startY.current) * 0.4;
            setPullDistance(distance);

            // Prevent default scroll behavior while pulling down
            if (e.cancelable) {
                e.preventDefault();
            }
        }
    };

    const handleTouchEnd = () => {
        if (startY.current === null || isRefreshing) return;

        if (pullDistance >= PULL_THRESHOLD) {
            // Trigger transition to Game Space
            setIsRefreshing(true);

            // Snap the loader to full height temporarily
            setPullDistance(window.innerHeight / 2);

            setTimeout(() => {
                setIsGameSpaceOpen(true);
                setIsRefreshing(false);
                setPullDistance(0);
            }, 600); // Wait for loader animation to feel complete

        } else {
            // Cancel pull
            setPullDistance(0);
        }

        startY.current = null;
    };

    // New Click Handler for easier desktop testing
    const handleTriggerGameSpace = () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        setPullDistance(window.innerHeight / 2);
        setTimeout(() => {
            setIsGameSpaceOpen(true);
            setIsRefreshing(false);
            setPullDistance(0);
        }, 600);
    };

    // Close handler
    const handleCloseGameSpace = () => {
        setIsGameSpaceOpen(false);
    };

    return (
        <div className="w-full h-screen bg-bgPrimary flex overflow-hidden font-sans text-textPrimary relative">

            {/* Pull-down Branded Loader */}
            <BrandedLoader pullDistance={pullDistance} threshold={PULL_THRESHOLD} />

            {/* Main App Container - wrapped to slide down */}
            <div
                className="w-full h-full flex transition-transform duration-200"
                style={{
                    transform: `translateY(${pullDistance}px)`,
                    // Use a faster snap back transition if distance is 0 and not refreshing
                    transitionTimingFunction: pullDistance === 0 ? 'cubic-bezier(0.4, 0, 0.2, 1)' : 'linear'
                }}
            >
                {/* Sidebar Navigation */}
                <div className="w-[240px] h-full bg-bgSecondary flex flex-col p-6 gap-8 flex-shrink-0 border-r border-borderColor">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center pointer-events-none shadow-[0_0_10px_rgba(255,215,0,0.3)]">
                            <span className="material-icons text-black text-lg">sports_esports</span>
                        </div>
                        <span className="text-lg font-bold tracking-widest">NEXUS</span>
                    </div>

                    <nav className="flex flex-col gap-2 relative">
                        {/* Pull Down Hint on Desktop */}
                        <div className="absolute -top-6 left-0 right-0 flex justify-center opacity-50 text-xs">
                            <span className="material-icons animate-bounce text-sm text-accent">keyboard_arrow_down</span>
                        </div>

                        <a href="#" className="flex items-center gap-3 px-4 py-3 bg-[#2A2A2A] rounded-lg group">
                            <span className="material-icons text-accent">home</span>
                            <span className="text-sm font-bold">发现游戏</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bgPrimary/50 transition group">
                            <span className="material-icons text-textSecondary group-hover:text-textPrimary transition">storefront</span>
                            <span className="text-sm text-textSecondary group-hover:text-textPrimary transition">游戏商店</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bgPrimary/50 transition group">
                            <span className="material-icons text-textSecondary group-hover:text-textPrimary transition">grid_view</span>
                            <span className="text-sm text-textSecondary group-hover:text-textPrimary transition">我的库</span>
                        </a>
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bgPrimary/50 transition group">
                            <span className="material-icons text-textSecondary group-hover:text-textPrimary transition">forum</span>
                            <span className="text-sm text-textSecondary group-hover:text-textPrimary transition">玩家社区</span>
                        </a>
                    </nav>

                    <div className="mt-auto">
                        {/* Bottom items like settings can go here */}
                        <a href="#" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-bgPrimary/50 transition group">
                            <span className="material-icons text-textSecondary group-hover:text-textPrimary transition">settings</span>
                            <span className="text-sm text-textSecondary group-hover:text-textPrimary transition">系统设置</span>
                        </a>
                    </div>
                </div>

                {/* Main Area */}
                <div className="flex-1 flex flex-col min-w-0 bg-bgPrimary shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-10">

                    {/* Topbar */}
                    <div className="h-[72px] bg-bgPrimary px-10 flex items-center justify-between flex-shrink-0 z-10 sticky top-0">
                        <button
                            className="font-bold text-sm text-textSecondary flex items-center gap-2 bg-[#121212] px-4 py-2 rounded-full border border-white/5 hover:border-accent hover:text-white transition group cursor-pointer"
                            onClick={handleTriggerGameSpace}
                        >
                            <span className="material-icons text-accent text-sm group-hover:animate-bounce">keyboard_double_arrow_down</span>
                            <span className="hidden sm:inline">点击探索游戏空间</span>
                            <span className="sm:hidden">点击探索</span>
                        </button>

                        <div className="flex items-center bg-bgSecondary h-10 px-4 rounded-full w-[300px] border border-transparent focus-within:border-borderColor transition mr-4 ml-auto">
                            <span className="material-icons text-textSecondary text-sm mr-2">search</span>
                            <input type="text" placeholder="搜索 233乐园 游戏库..." className="bg-transparent border-none outline-none text-sm text-textPrimary placeholder-textSecondary w-full" />
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="hover:text-accent transition relative">
                                <span className="material-icons text-textSecondary hover:text-textPrimary transition">notifications</span>
                                <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full border border-bgPrimary"></span>
                            </button>
                            <div className="w-9 h-9 rounded-full bg-borderColor overflow-hidden cursor-pointer border-2 border-transparent hover:border-accent transition">
                                <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100" alt="User Avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Scrollable Content with Pull-Down Tracking */}
                    <div
                        ref={scrollContainerRef}
                        className="flex-1 overflow-y-auto px-10 pb-10 flex flex-col gap-12 custom-scrollbar relative"
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >

                        {/* Hero Banner */}
                        <div className="w-full h-[380px] bg-bgSecondary rounded-2xl relative overflow-hidden group cursor-pointer mt-2 border border-white/5">
                            <img
                                src="https://img.tapimg.net/market/images/ff5c3665c4fbe7f68feff3ab190323f9.png"
                                alt="Rainbow Six Mobile"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/50 to-transparent"></div>

                            <div className="absolute inset-0 p-10 flex flex-col justify-end gap-4 pointer-events-none">
                                <div className="bg-accent px-3 py-1 rounded-full w-fit">
                                    <span className="text-black text-xs font-bold tracking-wide">Featured</span>
                                </div>
                                <h1 className="text-5xl font-bold text-textPrimary tracking-wide drop-shadow-lg">Rainbow Six Mobile</h1>
                                <p className="text-[#D0D0D0] text-base max-w-[600px] leading-relaxed">Experience the next generation of tactical shooters on your mobile device.</p>

                                <div className="flex gap-4 pt-4 pointer-events-auto">
                                    <button className="flex items-center gap-2 bg-textPrimary text-black px-8 py-3 rounded-lg hover:bg-gray-200 transition font-bold">
                                        <span className="material-icons">play_arrow</span>
                                        马上进入
                                    </button>
                                    <button className="px-8 py-3 rounded-lg border-2 border-textPrimary text-textPrimary font-bold hover:bg-white/10 transition backdrop-blur-sm">
                                        了解更多
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Recommended Section */}
                        <div className="flex flex-col gap-4">
                            <h2 className="text-xl font-bold text-textPrimary">为您推荐</h2>
                            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x">
                                <GameCard title="Night of the Extinct" tag1="Action" tag2="RPG" price="免费" imgSrc="https://img.tapimg.net/market/images/98e59c35c2c2a190f7d57bb57485cb71.png" />
                                <GameCard title="HEAVENHELLS" tag1="RPG" tag2="Simulation" price="免费" imgSrc="https://img.tapimg.net/market/images/b159614609daf88f179354f1dceb49f2.png" />
                                <GameCard title="Where Winds Meet" tag1="Editors' Choice" tag2="Action" price="免费" imgSrc="https://img.tapimg.net/market/images/9440224e4b45116968d93fa4ebc44ab8.jpg" />
                                <GameCard title="Heartopia" tag1="Simulation" tag2="Casual" price="免费" imgSrc="https://img.tapimg.net/market/images/bb9c6714cfb01e14df13909fc472536d.jpg" />
                                <GameCard title="Return to Abyss" tag1="Action" tag2="Roguelike" price="免费" imgSrc="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" />
                            </div>
                        </div>

                        {/* New & Trending Section */}
                        <div className="flex flex-col gap-4 pb-8">
                            <h2 className="text-xl font-bold text-textPrimary">最新上线 & 热门</h2>
                            <div className="flex gap-6 overflow-x-auto pb-4 custom-scrollbar snap-x">
                                <GameCard title="Night of the Extinct" tag1="Action" tag2="RPG" price="免费" imgSrc="https://img.tapimg.net/market/images/98e59c35c2c2a190f7d57bb57485cb71.png" />
                                <GameCard title="HEAVENHELLS" tag1="RPG" tag2="Simulation" price="免费" imgSrc="https://img.tapimg.net/market/images/b159614609daf88f179354f1dceb49f2.png" />
                                <GameCard title="Where Winds Meet" tag1="Editors' Choice" tag2="Action" price="免费" imgSrc="https://img.tapimg.net/market/images/9440224e4b45116968d93fa4ebc44ab8.jpg" />
                                <GameCard title="Heartopia" tag1="Simulation" tag2="Casual" price="免费" imgSrc="https://img.tapimg.net/market/images/bb9c6714cfb01e14df13909fc472536d.jpg" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Render Game Space over everything when active */}
            {isGameSpaceOpen && <GameSpace onClose={handleCloseGameSpace} />}

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          height: 6px;
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #333;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}} />
        </div>
    );
}
