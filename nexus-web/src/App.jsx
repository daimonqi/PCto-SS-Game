import { useState } from 'react'
import Installer from './Installer'
import SplashScreen from './SplashScreen'
import HomePage from './HomePage'

function App() {
  const [currentScreen, setCurrentScreen] = useState("installer"); // "installer", "splash", "home"

  return (
    <div className="w-full h-screen overflow-hidden bg-black text-white selection:bg-accent selection:text-black relative">

      {/* Dev Navigation Floating Bar for easy switching */}
      <div className="fixed top-2 left-2 z-[9999] flex gap-2 bg-black/50 p-2 rounded-lg backdrop-blur-md border border-white/10">
        <button
          onClick={() => setCurrentScreen("installer")}
          className={`text-xs px-3 py-1 rounded transition ${currentScreen === 'installer' ? 'bg-accent text-black font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          安装向导
        </button>
        <button
          onClick={() => setCurrentScreen("home")}
          className={`text-xs px-3 py-1 rounded transition ${currentScreen === 'home' ? 'bg-accent text-black font-bold' : 'text-gray-400 hover:text-white'}`}
        >
          游戏主页 (测试)
        </button>
      </div>

      {currentScreen === "installer" && (
        <Installer onComplete={() => setCurrentScreen("splash")} />
      )}

      {currentScreen === "splash" && (
        <SplashScreen onComplete={() => setCurrentScreen("home")} />
      )}

      {currentScreen === "home" && (
        <HomePage />
      )}
    </div>
  )
}

export default App
