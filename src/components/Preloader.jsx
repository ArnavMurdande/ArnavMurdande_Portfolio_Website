import React, { useEffect, useState, useRef } from 'react';

const Preloader = ({ mode, onComplete }) => {
  const [text, setText] = useState('');
  const [font, setFont] = useState("'Poppins', sans-serif");
  const [opacity, setOpacity] = useState(0);
  const [counter, setCounter] = useState(0);

  const onCompleteRef = useRef(onComplete);
  const audioRef = useRef(null);
  const indexRef = useRef(0);
  const timeoutRef = useRef(null);

  const greetings = [
    { text: '• Hello', font: "'Poppins', sans-serif" },
    { text: '• नमस्ते', font: "'Noto Sans Devanagari', sans-serif" },
    { text: '• Hola', font: "'Poppins', sans-serif" },
    { text: '• Bonjour', font: "'Poppins', sans-serif" },
    { text: '• こんにちは', font: "'Noto Sans JP', sans-serif" },
    { text: '• Hallo', font: "'Poppins', sans-serif" },
    { text: '• Ciao', font: "'Poppins', sans-serif" },
    { text: '• Olá', font: "'Poppins', sans-serif" },
    { text: '• 안녕하세요', font: "'Noto Sans KR', sans-serif" },
    { text: '• مرحبا', font: "'Noto Sans Arabic', sans-serif" },
  ];

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(
        'https://assets.codepen.io/7558/preloader-3s-002.mp3'
      );
      audioRef.current.volume = 0.5;
    }
  }, []);

  useEffect(() => {
    if (!mode) return;

    // ---------- HELLO MODE ----------
    if (mode === 'hello') {
      indexRef.current = 0;

      const showGreeting = () => {
        if (indexRef.current >= greetings.length) {
          onCompleteRef.current?.();
          return;
        }

        const g = greetings[indexRef.current];
        setText(g.text);
        setFont(g.font);
        setOpacity(1);

        timeoutRef.current = setTimeout(() => {
          setOpacity(0);

          timeoutRef.current = setTimeout(() => {
            indexRef.current += 1;
            showGreeting();
          }, 200);
        }, 250);
      };

      showGreeting();
    }

    // ---------- RELOADING MODE ----------
    if (mode === 'reloading') {
      let count = 0;
      setCounter(0);

      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});

      const interval = setInterval(() => {
        count++;
        setCounter(count);

        if (count >= 100) {
          clearInterval(interval);
          timeoutRef.current = setTimeout(() => {
            onCompleteRef.current?.();
          }, 500);
        }
      }, 25);

      return () => clearInterval(interval);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [mode]);

  if (!mode) return null;

  return (
    <div
      className="preloader"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'black',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        pointerEvents: 'all',
      }}
    >
      {mode === 'hello' && (
        <h1
          style={{
            fontFamily: font,
            fontSize: '3rem',
            fontWeight: 700,
            opacity,
            transition: 'opacity 0.2s ease-in-out',
            willChange: 'opacity',
          }}
        >
          {text}
        </h1>
      )}

      {mode === 'reloading' && (
        <div
          style={{
            textAlign: 'center',
            fontFamily: "'Courier New', monospace",
            color: '#c4d5bc',
          }}
        >
          <div
            style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '15px',
              letterSpacing: '2px',
            }}
          >
            SYSTEM RELOADING
          </div>
          <div
            style={{
              fontSize: '3rem',
              fontWeight: '800',
              letterSpacing: '5px',
            }}
          >
            [{counter.toString().padStart(3, '0')}]
          </div>
        </div>
      )}
    </div>
  );
};

export default Preloader;
