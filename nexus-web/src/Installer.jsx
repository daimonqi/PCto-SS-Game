import { useState, useEffect } from "react";

export default function Installer({ onComplete }) {
    const [step, setStep] = useState("welcome");
    const [progress, setProgress] = useState(0);
    const [agreed, setAgreed] = useState(false);
    const [showCustomOptions, setShowCustomOptions] = useState(false);

    useEffect(() => {
        if (step === "progress") {
            const interval = setInterval(() => {
                setProgress((old) => {
                    if (old >= 100) {
                        clearInterval(interval);
                        setStep("complete");
                        return 100;
                    }
                    return old + 2;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [step]);

    return (
        <div className="w-full h-screen bg-black/80 flex items-center justify-center font-sans">
            <div className="w-[500px] h-[400px] bg-bgSecondary rounded-xl flex flex-col overflow-hidden shadow-2xl relative border border-white/5">

                {/* Top Banner */}
                <div className="w-full h-[160px] relative flex flex-col justify-center items-center overflow-hidden flex-shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
                        alt="Banner Background"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bgSecondary to-transparent"></div>

                    {/* Top Left Logo Area */}
                    <div className="absolute top-0 left-0 p-4 flex items-center gap-2 z-20 text-white">
                        <span className="material-icons text-lg text-accent">sports_esports</span>
                        <span className="font-bold tracking-widest text-xs">NEXUS</span>
                    </div>

                    {/* Header Window Controls (Minimize, Close/Cancel) */}
                    <div className="absolute top-0 right-0 p-3 flex gap-3 z-20 text-white/50">
                        <button className="hover:text-white transition" title="最小化"><span className="material-icons text-base">remove</span></button>
                        <button className="hover:text-accent transition" onClick={onComplete} title="取消安装/关闭"><span className="material-icons text-base">close</span></button>
                    </div>

                    <div className="relative z-10 flex flex-col items-center drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] text-white mt-4">
                        {step === "progress" ? (
                            <>
                                <span className="text-2xl font-bold tracking-widest mt-1">正在为您安装美好世界</span>
                            </>
                        ) : (
                            <>
                                <span className="text-3xl font-bold tracking-[0.4em] mt-2 drop-shadow-md">次世代游戏平台</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Bottom Content Area */}
                <div className="flex-1 p-6 pb-6 flex flex-col bg-bgSecondary text-textPrimary">

                    {step === "welcome" && (
                        <div className="flex flex-col h-full items-center justify-center w-full px-4 relative mt-2">

                            {/* Main Install Button (Centered) */}
                            <button
                                onClick={() => {
                                    if (agreed) setStep("progress");
                                }}
                                className={`w-full max-w-[280px] py-3 rounded-lg font-bold text-base transition-all mb-4 ${agreed
                                        ? "bg-accent text-black hover:opacity-90 hover:shadow-[0_0_15px_rgba(255,114,16,0.4)] active:scale-[0.98]"
                                        : "bg-white/10 text-white/40 cursor-not-allowed"
                                    }`}
                            >
                                立即安装
                            </button>

                            {/* Terms and Custom Options Row */}
                            <div className={`w-full max-w-[380px] flex items-center justify-between mt-2 text-xs text-textSecondary pb-3 ${showCustomOptions ? 'border-b border-white/10' : ''}`}>
                                {/* Terms Checkbox (Left) */}
                                <label className="flex items-center gap-1.5 cursor-pointer group">
                                    <div
                                        onClick={() => setAgreed(!agreed)}
                                        className={`w-3.5 h-3.5 rounded-full flex items-center justify-center transition-colors ${agreed ? "bg-accent" : "border border-textSecondary bg-transparent"
                                            }`}
                                    >
                                        {agreed && <span className="material-icons text-black font-bold text-[10px]">check</span>}
                                    </div>
                                    <span onClick={() => setAgreed(!agreed)} className="group-hover:text-white transition whitespace-nowrap">我已经阅读并同意 <a href="#" className="text-textSecondary hover:text-white transition">《服务协议》</a> & <a href="#" className="text-textSecondary hover:text-white transition">《隐私政策》</a></span>
                                </label>

                                {/* Custom Toggle (Right) */}
                                <button
                                    onClick={() => setShowCustomOptions(!showCustomOptions)}
                                    className="flex items-center gap-0.5 hover:text-white transition whitespace-nowrap"
                                >
                                    自定义选项
                                    <span className="material-icons text-[14px]">
                                        {showCustomOptions ? "expand_less" : "expand_more"}
                                    </span>
                                </button>
                            </div>

                            {/* Expandable Custom Options */}
                            {showCustomOptions && (
                                <div className="w-full max-w-[380px] mt-4 flex flex-col gap-3 animate-fade-in text-left">
                                    {/* Path Selector */}
                                    <div className="w-full flex items-center justify-between gap-3">
                                        <div className="flex-1 flex items-center bg-bgPrimary rounded overflow-hidden border border-borderColor p-1.5 px-3 h-8">
                                            <div className="flex-1 text-xs text-textPrimary truncate">C:\Program Files\Nexus Platform\</div>
                                        </div>
                                        <button className="text-accent hover:text-white text-xs whitespace-nowrap transition cursor-pointer shrink-0">
                                            更改位置
                                        </button>
                                    </div>

                                    {/* Storage Info */}
                                    <div className="flex gap-6 text-[10px] text-textSecondary ml-1">
                                        <span>所需空间: 279 MB</span>
                                        <span>可用空间: 183.387 GB</span>
                                    </div>

                                    {/* Checkboxes */}
                                    <div className="w-full flex gap-8 mt-1 text-xs text-textSecondary font-bold">
                                        <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <div className="w-3.5 h-3.5 rounded-full bg-accent flex items-center justify-center">
                                                <span className="material-icons text-black text-[10px] font-bold">check</span>
                                            </div>
                                            <span className="group-hover:text-accent transition text-accent">创建桌面快捷方式</span>
                                        </label>
                                        <label className="flex items-center gap-1.5 cursor-pointer group">
                                            <div className="w-3.5 h-3.5 rounded-full bg-accent flex items-center justify-center">
                                                <span className="material-icons text-black text-[10px] font-bold">check</span>
                                            </div>
                                            <span className="group-hover:text-accent transition text-accent">开机启动</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                        </div>
                    )}

                    {step === "progress" && (
                        <div className="flex flex-col h-full justify-center items-center w-full px-4">
                            <h2 className="text-xl font-bold mb-6 text-textPrimary">精彩直播美好正在发生</h2>

                            <div className="w-full">
                                <div className="w-full h-1.5 bg-bgPrimary rounded-full overflow-hidden mb-2">
                                    <div className="h-full bg-accent transition-all duration-75 relative rounded-full shadow-[0_0_8px_rgba(255,114,16,0.5)]" style={{ width: `${progress}%` }}>
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md scale-[1.2]"></div>
                                    </div>
                                </div>
                                <div className="flex justify-between text-[10px] text-textSecondary px-1 mt-2">
                                    <span>正在下载客户端，已完成 {progress}%</span>
                                    <span>速度 11MB/s 剩余: --分--秒</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {step === "complete" && (
                        <div className="flex flex-col h-full justify-center items-center">
                            <h2 className="text-2xl font-bold text-textPrimary mb-5">NEXUS安装完成</h2>

                            {/* Main Start Button */}
                            <button
                                onClick={onComplete}
                                className="w-[200px] py-3 rounded-lg bg-accent text-black font-bold text-base hover:opacity-90 hover:shadow-[0_0_15px_rgba(255,114,16,0.4)] transition-all active:scale-[0.98]"
                            >
                                立即体验
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
