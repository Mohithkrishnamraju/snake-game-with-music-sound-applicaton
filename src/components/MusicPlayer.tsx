import React, { useState, useRef, useEffect } from 'react';

const TRACKS = [
  {
    id: 1,
    title: "NEON_PULSE.WAV",
    artist: "CYBER_SYNTH_AI",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "DIGITAL_HORIZON.WAV",
    artist: "NEURAL_BEATS",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "QUANTUM_DRIFT.WAV",
    artist: "ALGO_RHYTHM",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.error("Playback failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [isPlaying, currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const togglePlay = () => setIsPlaying(!isPlaying);
  
  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };
  
  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleTrackEnd = () => {
    nextTrack();
  };

  return (
    <div className="bg-black w-full flex flex-col gap-4 font-mono">
      <div className="flex items-center gap-4 border-2 border-[#00FFFF] p-3">
        <div className="w-16 h-16 bg-[#FF00FF] flex items-center justify-center animate-pulse">
          <span className="text-black font-bold text-4xl">♪</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <h3 className="text-[#00FFFF] font-bold text-2xl truncate uppercase">
            {currentTrack.title}
          </h3>
          <p className="text-[#FF00FF] text-xl truncate uppercase">&gt; {currentTrack.artist}</p>
        </div>
      </div>

      <div className="w-full h-4 bg-[#050505] border border-[#00FFFF] relative">
        <div 
          className="h-full bg-[#FF00FF] transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between mt-2 border-t-2 border-[#FF00FF] pt-4">
        <button 
          onClick={() => setIsMuted(!isMuted)}
          className="text-[#00FFFF] hover:text-[#FF00FF] hover:bg-[#00FFFF]/20 p-2 border border-transparent hover:border-[#00FFFF] transition-colors uppercase text-2xl"
        >
          [{isMuted ? 'MUTED' : 'AUDIO'}]
        </button>

        <div className="flex items-center gap-4">
          <button 
            onClick={prevTrack}
            className="text-[#FF00FF] hover:text-[#00FFFF] text-3xl hover:bg-[#FF00FF]/20 p-2 border border-transparent hover:border-[#FF00FF]"
          >
            &lt;&lt;
          </button>
          <button 
            onClick={togglePlay}
            className="text-black bg-[#00FFFF] hover:bg-[#FF00FF] px-6 py-2 text-3xl font-bold transition-colors"
          >
            {isPlaying ? 'PAUSE' : 'PLAY'}
          </button>
          <button 
            onClick={nextTrack}
            className="text-[#FF00FF] hover:text-[#00FFFF] text-3xl hover:bg-[#FF00FF]/20 p-2 border border-transparent hover:border-[#FF00FF]"
          >
            &gt;&gt;
          </button>
        </div>
      </div>

      <audio 
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTrackEnd}
      />
    </div>
  );
}
