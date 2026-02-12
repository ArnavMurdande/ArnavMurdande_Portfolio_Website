import React, { useEffect, useRef } from 'react';
import './InteractiveCat.css';
import { useMobile } from '../hooks/useMobile';
import { useStore } from '../store';

const InteractiveCat = () => {
  const isMobile = useMobile();
  const { phase } = useStore();
  
  const catWrapperRef = useRef(null);
  const catRef = useRef(null);
  const headRef = useRef(null);
  const wrapperRef = useRef(null);
  
  // State refs
  const mousePos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 }); // Current cat position
  const animationRef = useRef(null);
  const isPaused = useRef(false); // New pause state for jumping

  useEffect(() => {
    // Only run logic if not mobile and in 'hero' phase
    if (isMobile || phase !== 'hero') return;

    const catWrapper = catWrapperRef.current;
    const cat = catRef.current;
    const head = headRef.current;
    const wrapper = wrapperRef.current;
    const legs = wrapper.querySelectorAll('.leg');

    // Initialize position clearly if it wasn't set
    if (currentPos.current.x === 0) {
      currentPos.current.x = 100;
      // Also initialize mousePos to avoid initial jump
      mousePos.current.x = 100;
    }

    const handleMouseMotion = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    const handleJump = () => {
      if (isPaused.current) return; // Prevent double jumps

      isPaused.current = true;
      catWrapper.classList.remove('jump');
      
      // Stop walking animation immediately
      legs.forEach(leg => leg.classList.remove('walk'));

      // Trigger jump
      // Small delay to ensure class removal runs
      setTimeout(() => {
        catWrapper.classList.add('jump');
      }, 10);

      // Reset after animation (1s matches CSS animation time)
      setTimeout(() => {
        catWrapper.classList.remove('jump');
        isPaused.current = false;
      }, 1000);
    };

    const update = () => {
      if (!cat) return;

      // If paused (jumping), stop movement logic
      if (isPaused.current) {
        animationRef.current = requestAnimationFrame(update);
        return;
      }

      const targetX = mousePos.current.x;
      const dx = targetX - currentPos.current.x;
      const distance = Math.abs(dx);

      // 1. Calculate step with Speed Limit
      let step = dx * 0.08; // Normal lerp (0.08 factor)
      const maxSpeed = 5;   // Maximum 5 pixels per frame to prevent sliding

      // Clamp the speed
      if (Math.abs(step) > maxSpeed) {
        step = Math.sign(dx) * maxSpeed;
      }

      // Only move if significantly far (prevents micro-jitter)
      if (distance > 1) {
        currentPos.current.x += step;
        
        // Face Direction
        if (dx > 2) {
          cat.classList.remove('face_left');
          cat.classList.add('face_right');
        } else if (dx < -2) {
          cat.classList.remove('face_right');
          cat.classList.add('face_left');
        }

        // Walk Animation
         cat.classList.remove('first_pose');
         legs.forEach(leg => leg.classList.add('walk'));
      } else {
        // Stop Animation
        legs.forEach(leg => leg.classList.remove('walk'));
      }

      // Apply Position
      // Subtracting offset to center the cat (width 60px -> center ~30px)
      cat.style.left = `${currentPos.current.x - 30}px`;


      // 2. Head Logic
      const windowHeight = window.innerHeight;
      if (mousePos.current.y > (windowHeight - 100)) {
        head.style.top = '-15px'; // Look down/normal
      } else {
        head.style.top = '-30px'; // Look up
      }

      // Loop
      animationRef.current = requestAnimationFrame(update);
    };

    // Start Loop
    animationRef.current = requestAnimationFrame(update);
    
    // Listeners
    window.addEventListener('mousemove', handleMouseMotion);
    window.addEventListener('click', handleJump);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('mousemove', handleMouseMotion);
      window.removeEventListener('click', handleJump);
    };
  }, [isMobile, phase]);

  if (isMobile || phase !== 'hero') return null;

  return (
    <div className="cat-container" ref={wrapperRef}>
      <div className="cat_wrapper" ref={catWrapperRef}>
        <div className="cat first_pose" ref={catRef}>
          
          <div className="cat_head" ref={headRef}>
            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 76.4 61.2">
              <polygon className="eyes" points="63.8,54.1 50.7,54.1 50.7,59.6 27.1,59.6 27.1,54.1 12.4,54.1 12.4,31.8 63.8,31.8 "/>
              <path d="M15.3,45.9h5.1V35.7h-5.1C15.3,35.7,15.3,45.9,15.3,45.9z M45.8,56.1V51H30.6v5.1H45.8z M61.1,35.7H56v10.2h5.1 V35.7z M10.2,61.2v-5.1H5.1V51H0V25.5h5.1V15.3h5.1V5.1h5.1V0h5.1v5.1h5.1v5.1h5.1v5.1c0,0,15.2,0,15.2,0v-5.1h5.1V5.1H56V0h5.1v5.1 h5.1v10.2h5.1v10.2h5.1l0,25.5h-5.1v5.1h-5.1v5.1H10.2z"/>
            </svg>
          </div>

          <div className="body">
            <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 91.7 40.8">
              <path className="st0" d="M91.7,40.8H0V10.2h5.1V5.1h5.1V0h66.2v5.1h10.2v5.1h5.1L91.7,40.8z"/>
            </svg>

            <div className="tail">
              <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 25.5 61.1">
                <polygon className="st0" points="10.2,56 10.2,50.9 5.1,50.9 5.1,40.7 0,40.7 0,20.4 5.1,20.4 5.1,10.2 10.2,10.2 10.2,5.1 15.3,5.1 15.3,0 25.5,0 25.5,10.2 20.4,10.2 20.4,15.3 15.3,15.3 15.3,20.4 10.2,20.4 10.2,40.7 15.3,40.7 15.3,45.8 20.4,45.8 20.4,50.9 25.5,50.9 25.5,61.1 15.3,61.1 15.3,56 "/>
              </svg>
            </div>
          </div>
          
          <div className="front_legs">
            <div className="leg one">
              <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 14 30.5">
                <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 "/>
              </svg>
            </div>
            <div className="leg two">
              <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 14 30.5">
                <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 "/>
              </svg>
            </div>  
          </div>
          
          <div className="back_legs">
            <div className="leg three">
              <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 14 30.5">
                <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 "/>
              </svg>
            </div>
            <div className="leg four">
              <svg x="0px" y="0px" width="100%" height="100%" viewBox="0 0 14 30.5">
                <polygon points="15.3,30.5 5.1,30.5 5.1,25.4 0,25.4 0,0 15.3,0 "/>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default InteractiveCat;
