import { useEffect } from "react";

export default function SplashScreen({ onComplete }) {
    useEffect(() => {
        // Simulate loading internal modules
        const timer = setTimeout(() => {
            onComplete();
        }, 2500);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="w-full h-screen bg-bgPrimary flex flex-col items-center justify-center font-sans relative">
            {/* Ambient glowing effect */}
            <div className="absolute w-[400px] h-[400px] bg-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="w-32 h-32 flex items-center justify-center mb-8 relative z-10">
                <span className="text-[100px] material-icons text-accent drop-shadow-[0_0_20px_rgba(255,114,16,0.6)]">api</span>
            </div>

            <div className="flex flex-col items-center gap-4 z-10 w-[300px]">
                <h1 className="text-2xl font-bold tracking-[4px] text-textPrimary">NEXUS PLATFORM</h1>
                <div className="w-[180px] h-1 bg-bgSecondary rounded-sm overflow-hidden relative">
                    <div className="absolute top-0 left-0 h-full bg-accent rounded-sm animate-[loading_2s_ease-in-out_forwards]"></div>
                </div>
                <span className="text-xs text-textSecondary mt-2">Connecting to servers...</span>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
         @keyframes loading {
           0% { width: 0%; transform: translateX(0); }
           50% { width: 40%; transform: translateX(30%); }
           100% { width: 60%; transform: translateX(70%); }
         }
       `}} />
        </div>
    );
}
