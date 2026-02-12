// src/App.jsx
import React, { useState, useCallback } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useStore } from "./store";

// Components
import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import CustomCursor from "./components/CustomCursor";
import DevicePreview from "./components/DevicePreview";
import InteractiveCat from "./components/InteractiveCat";

// Pages
import Home from "./pages/Home";


function Layout() {
  const { phase, setPhase, scrollProgress } = useStore();

  const [showPreloader, setShowPreloader] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const onPreloaderComplete = useCallback(() => {
    setShowPreloader(false);
    setPhase("device");
  }, [setPhase]);

  const handleLogoClick = (e) => {
    if (e) e.preventDefault();
    window.location.href = "/";
  };

  const handleSkip = () => {
    setShowPreloader(false);
    setPhase("hero");
  };

  const navbarHidden =
    (phase === "device" && location.pathname === "/") || showPreloader;

  const isSkipFaded = phase === "device" && scrollProgress > 0.01;

  return (
    <div
      className="App"
      style={{
        minHeight: "100vh",
        width: "100vw",
        background: "#000000",
        overflow: showPreloader ? "hidden" : "unset",
      }}
    >
      <CustomCursor />

      {/* PRELOADER */}
      {showPreloader && (
        <Preloader mode="hello" onComplete={onPreloaderComplete} />
      )}

      {/* NAVBAR */}
      <div
        style={{
          opacity: navbarHidden ? 0 : 1,
          transition: "opacity 1s ease",
          pointerEvents: navbarHidden ? "none" : "all",
          position: "fixed",
          zIndex: 100,
          width: "100%",
        }}
      >
        <Navbar onLogoClick={handleLogoClick} />
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <>
              {phase === "device" && !showPreloader && <DevicePreview />}

              {phase === "hero" && (
                <div
                  style={{
                    width: "100%",
                    minHeight: "100vh",
                    position: "relative"
                  }}
                >
                  <Home />
                </div>
              )}
            </>
          }
        />
      </Routes>

      {/* SKIP INTRO BUTTON */}
      {(showPreloader || phase === "device") && (
        <button
          onClick={handleSkip}
          className={`fixed bottom-5 right-5 md:bottom-8 md:right-8 z-[10000] px-4 py-1.5 text-xs md:px-6 md:py-2 md:text-base rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-all duration-500 ease-in-out ${
            isSkipFaded
              ? "opacity-0 pointer-events-none translate-y-4"
              : "opacity-100 translate-y-0"
          }`}
        >
          Skip Intro
        </button>
      )}

      {/* LIVE LOCATION WIDGET */}
      {!showPreloader && phase !== "device" && <MumbaiTime />}

      {/* INTERACTIVE CAT */}
      <InteractiveCat />
    </div>
  );
}

const MumbaiTime = () => {
  const [time, setTime] = useState("");

  React.useEffect(() => {
    const updateTime = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000); // Update every second to be accurate
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-2 left-2 md:bottom-8 md:left-8 z-[1000] flex items-center gap-2 md:gap-3 px-2 py-1 md:px-4 md:py-2 text-[10px] md:text-sm font-medium text-gray-300 select-none transform scale-75 md:scale-100 origin-bottom-left">
      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]" />
      <span className="tracking-widest">MUMBAI - {time}</span>
    </div>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}
