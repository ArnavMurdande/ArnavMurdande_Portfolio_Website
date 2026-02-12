import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useStore } from '../store';
import Home from '../pages/Home';
import Navbar from './Navbar';

// Import device images
import LaptopImage from '../assets/images/Laptop.png';
import iPhoneImage from '../assets/images/iPhone (2).png';
import SwipeIcon from '../assets/images/icons8-one-finger-48.apng';

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother, ScrollToPlugin);

const DevicePreview = () => {
  const { setPhase, setScrollProgress } = useStore();
  const containerRef = useRef(null); // The tall scroll container
  const stickyRef = useRef(null);    // The fixed visual element
  const deviceRef = useRef(null);
  const hintRef = useRef(null);
  
  const [isMobile, setIsMobile] = useState(null);
  const [switching, setSwitching] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Detect mobile device & Handle Resize with Debounce
  useEffect(() => {
    let timeoutId;

    const performCheck = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setWindowSize({ width, height });

      // STRICT RULES:
      // Mobile/Tablet = Width < 1024
      // Laptop/Desktop = Width >= 1024
      const newIsMobile = width <= 1024;

      setIsMobile(prev => {
        if (prev !== newIsMobile) {
          // Device Type Changed -> Trigger Switching
          setSwitching(true);
          setImageSize({ width: 0, height: 0 }); // Reset to force recalc
          return newIsMobile;
        }
        return prev;
      });
    };

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(performCheck, 100); // 100ms Debounce
    };

    // Initial check
    performCheck();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleImageLoad = (e) => {
    setImageSize({
      width: e.target.naturalWidth,
      height: e.target.naturalHeight
    });
    setSwitching(false); // Image loaded, show frame
  };

  // --- Dynamic Layout Calculation ---
  const windowWidth = windowSize.width;
  const windowHeight = windowSize.height;

  // Define specs (width/height use windowSize)
  const mobileSpecs = {
    imageWidth: 360, 
    screenLeft: '6.5%', screenTop: '2.8%', screenWidthPct: '87%', screenHeightPct: '94%',
    borderRadius: '40px',
    referenceWidth: windowWidth, 
    referenceHeight: windowHeight,
  };

  const laptopSpecs = {
    imageWidth: 1000,
    screenLeft: '11.5%', screenTop: '3%', screenWidthPct: '77%', screenHeightPct: '89%',
    borderRadius: '2px',
    referenceWidth: windowWidth, 
    referenceHeight: windowHeight,
  };

  // Safe fallback if isMobile is null
  const deviceSpecs = (isMobile === true) ? mobileSpecs : laptopSpecs;

  // 1. Calculate Scale Factor (WIDTH-based to preserve natural zoom)
  const getPct = (str) => parseFloat(str);
  const holeWidthPx = deviceSpecs.imageWidth * (getPct(deviceSpecs.screenWidthPct) / 100);
  const scaleFactor = holeWidthPx / deviceSpecs.referenceWidth;
  
  // Calculate actual hole height based on loaded image dimensions
  const imgAspect = imageSize.height > 0 ? (imageSize.height / imageSize.width) : (isMobile ? 2 : 0.625);
  const renderedImageHeight = deviceSpecs.imageWidth * imgAspect;
  const holeHeightPx = renderedImageHeight * (getPct(deviceSpecs.screenHeightPct) / 100);

  // Content height must fill hole: contentHeight * scaleFactor >= holeHeightPx
  const minContentHeight = holeHeightPx / scaleFactor;
  const finalContentHeight = Math.max(deviceSpecs.referenceHeight, minContentHeight);


  // 2. Calculate Final Zoom to expand the "Device" so that the Content matches 1:1 with Viewport
  const targetZoom = scaleFactor > 0 ? (1 / scaleFactor) : 1;

  // 3. Calculate Transform Origin (Center of the Screen Area relative to Image)
  const originX = getPct(deviceSpecs.screenLeft) + getPct(deviceSpecs.screenWidthPct) / 2;
  const originY = getPct(deviceSpecs.screenTop) + getPct(deviceSpecs.screenHeightPct) / 2;
  const transformOrigin = `${originX}% ${originY}%`;

  // 4. Style for the inner content wrapper
  const contentStyle = {
    width: `${deviceSpecs.referenceWidth}px`,
    height: `${finalContentHeight}px`,
    transform: `scale(${scaleFactor})`,
    transformOrigin: 'top left',
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    backgroundColor: '#050505',
    pointerEvents: 'none',
    willChange: 'transform',
  };

  useGSAP(() => {
    if (isMobile === null) return;

    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    ScrollTrigger.refresh();

    // Configuration
    const config = isMobile ? {
      initialScale: 0.65,
      finalScale: targetZoom,
    } : {
      initialScale: 0.65,
      finalScale: targetZoom,
    };

    // Initial state
    const xOffset = -(originX - 50);
    const yOffset = -(originY - 50);

    gsap.set(deviceRef.current, {
      scale: config.initialScale,
      transformOrigin: transformOrigin,
      xPercent: xOffset,
      yPercent: yOffset,
      opacity: 1,
      // Ensure GPU acceleration
      willChange: 'transform',
    });

    // The Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // High scrub for precise control
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          if (self.progress > 0.995) {
            setPhase('hero');
          }
        },
      },
    });

    // Zoom in
    tl.to(deviceRef.current, {
      scale: config.finalScale,
      ease: 'power3.inOut', // smoother acceleration
      duration: 1,
      force3D: true, // Force GPU acceleration
    });

    // Fade out hint
    tl.to(hintRef.current, { autoAlpha: 0, duration: 0.2 }, 0);
    
  }, { scope: containerRef, dependencies: [isMobile, setPhase, targetZoom, transformOrigin] });

  // Handle Initial Loading state before first check is done
  if (isMobile === null) {
    return (
      <div className="w-full h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Scroll Container */}
      <div 
        ref={containerRef}
        style={{ 
          height: '250vh', 
          width: '100%',
        }}
      >
        {/* Fixed Viewport */}
        <div 
          ref={stickyRef}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'black',
            overflow: 'hidden',
          }}
        >
          {/* Zoomable Device Group */}
          <div 
            ref={deviceRef}
            style={{
              position: 'relative',
              width: deviceSpecs.imageWidth,
              willChange: 'transform',
              opacity: switching ? 0 : 1, // Hide during switch to prevent glitches
              transition: 'opacity 0.2s ease-in-out', // Smooth fade
            }}
          >
            {/* 1. Device Frame Image (ON TOP) */}
            <img 
              src={isMobile ? iPhoneImage : LaptopImage}
              alt="Device"
              onLoad={handleImageLoad}
              style={{
                width: '100%',
                height: 'auto',
                position: 'relative',
                zIndex: 20, // Frame sits ON TOP of content
                pointerEvents: 'none',
                display: 'block', // Removes bottom space quirk
              }}
            />

            {/* 2. Screen Content (BEHIND) */}
            <div 
              style={{
                position: 'absolute',
                zIndex: 1, // Content sits BEHIND frame
                left: deviceSpecs.screenLeft,
                top: deviceSpecs.screenTop,
                width: deviceSpecs.screenWidthPct,
                height: deviceSpecs.screenHeightPct,
                borderRadius: deviceSpecs.borderRadius,
                overflow: 'hidden', 
                backgroundColor: 'black',
              }}
            >
              <div style={contentStyle}>
                {/* Navbar inside Preview */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 50 }}>
                   <Navbar />
                </div>
                {/* Actual Home Page */}
                <Home previewOnly={true} />
              </div>
            </div>
          </div>

          {/* Scroll Hint Overlay */}
          <div 
            ref={hintRef}
            className="absolute bottom-32 md:bottom-10 flex flex-col items-center justify-center gap-2 opacity-80 pointer-events-none"
            style={{ zIndex: 10 }} // Below device (20) but above background
          >
             {isMobile ? (
              // Mobile: Swipe Up Hand Icon
              <>
                <img 
                  src={SwipeIcon} 
                  alt="Swipe Up" 
                  className="w-12 h-12 object-contain opacity-90" 
                />
                <span className="text-white font-[Poppins] text-sm tracking-widest font-light uppercase opacity-90">Swipe up to Explore</span>
              </>
             ) : (
               // Desktop: Mouse Icon
               <>
                 <svg width="32" height="48" viewBox="0 0 24 36" fill="none" stroke="white" strokeWidth="2" className="opacity-90">
                    <rect x="3" y="3" width="18" height="30" rx="9" />
                    <line x1="12" y1="8" x2="12" y2="14" />
                 </svg>
                 <span className="text-white font-[Poppins] text-sm tracking-widest font-light uppercase opacity-90">Scroll down to Explore</span>
               </>
             )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DevicePreview;