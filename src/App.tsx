import React from 'react';
import MusicPlayer from './components/MusicPlayer';
import SnakeGame from './components/SnakeGame';

export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#00FFFF] font-mono overflow-hidden relative selection:bg-[#FF00FF] selection:text-[#00FFFF]">
      <div className="scanlines" />
      <div className="crt-flicker absolute inset-0 bg-[#FF00FF]/5 mix-blend-overlay" />
      
      <div className="container mx-auto px-4 py-8 min-h-screen flex flex-col relative z-10 screen-tear">
        <header className="text-center mb-8 border-b-4 border-[#FF00FF] pb-4">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase glitch" data-text="SYS.OP.TERMINAL">
            SYS.OP.TERMINAL
          </h1>
          <p className="text-[#FF00FF] mt-4 text-2xl tracking-widest uppercase animate-pulse">
            &gt; STATUS: ONLINE // PROTOCOL: SNAKE_BEATS
          </p>
        </header>

        <main className="flex-1 flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
          <div className="w-full lg:w-auto order-2 lg:order-1 border-4 border-[#00FFFF] p-2 bg-black relative shadow-[0_0_30px_rgba(0,255,255,0.2)]">
            <div className="absolute top-0 left-0 w-full h-1 bg-[#FF00FF] opacity-50 animate-pulse" />
            <SnakeGame />
          </div>
          
          <div className="w-full lg:w-96 order-1 lg:order-2 flex flex-col gap-8">
            <div className="bg-black border-4 border-[#FF00FF] p-6 relative shadow-[0_0_30px_rgba(255,0,255,0.2)]">
              <div className="absolute -top-4 -left-4 bg-[#00FFFF] text-black px-3 py-1 text-lg font-bold">
                MODULE_01
              </div>
              <h2 className="text-[#00FFFF] text-3xl uppercase tracking-widest mb-6 flex items-center gap-2 border-b-2 border-[#00FFFF] pb-2">
                &gt; AUDIO_STREAM
                <span className="w-4 h-4 bg-[#FF00FF] animate-ping ml-auto" />
              </h2>
              <MusicPlayer />
            </div>
            
            <div className="hidden lg:block bg-black border-4 border-[#00FFFF] p-6 relative shadow-[0_0_30px_rgba(0,255,255,0.2)]">
              <div className="absolute -top-4 -right-4 bg-[#FF00FF] text-black px-3 py-1 text-lg font-bold">
                MODULE_02
              </div>
              <h2 className="text-[#FF00FF] text-3xl uppercase tracking-widest mb-6 border-b-2 border-[#FF00FF] pb-2">
                &gt; INPUT_PARAMS
              </h2>
              <ul className="space-y-4 text-2xl text-[#00FFFF]">
                <li className="flex justify-between border-b border-[#00FFFF]/30 pb-2">
                  <span>[VECTOR_CTRL]</span>
                  <span className="text-[#FF00FF]">W,A,S,D</span>
                </li>
                <li className="flex justify-between border-b border-[#00FFFF]/30 pb-2">
                  <span>[HALT_EXEC]</span>
                  <span className="text-[#FF00FF]">SPACE</span>
                </li>
                <li className="flex justify-between border-b border-[#00FFFF]/30 pb-2">
                  <span>[AUDIO_OVR]</span>
                  <span className="text-[#FF00FF]">MANUAL</span>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
