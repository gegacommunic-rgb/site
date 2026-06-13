import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Gamepad2, Code, Terminal, Database, BookOpen, ListFilter, Volume2, VolumeX } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const attemptPlay = () => {
      audio.play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    attemptPlay();

    const handleFirstInteraction = () => {
      if (audio.paused) {
        attemptPlay();
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Синхронизация состояния с реальным аудио
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlayEvent = () => setIsPlaying(true);
    const handlePauseEvent = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlayEvent);
    audio.addEventListener('pause', handlePauseEvent);

    return () => {
      audio.removeEventListener('play', handlePlayEvent);
      audio.removeEventListener('pause', handlePauseEvent);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.error("Не удалось воспроизвести:", err);
      });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 text-white font-sans overflow-hidden">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
      >
        <source src="./bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>

      <audio
        ref={audioRef}
        loop
        src="./music.mp3"
        preload="auto"
      />

      <button
        onClick={togglePlay}
        className="absolute top-6 right-6 z-20 p-3 bg-black/40 backdrop-blur-md rounded-full border border-white/10 text-gray-300 hover:text-white hover:bg-black/60 transition-all shadow-lg hover:scale-105 active:scale-95"
        title="Включить/Выключить музыку"
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-black/40 backdrop-blur-md p-6 rounded-3xl shadow-2xl max-w-md w-full border border-white/10 -mt-14 z-10"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-[#085373] shadow-[0_0_15px_rgba(99,102,241,0.5)]"
        >
          <img 
            src="./avatar.jpg" 
            alt="Мой Аватар" 
            className="w-full h-full object-cover"
          />
        </motion.div>

        <h1 className="text-3xl font-bold text-center mb-2 tracking-tight">Homyak</h1>
        
        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-4">
          <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700">
            <Code size={14} className="text-blue-400" /> Python
          </span>
          <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700">
            <Database size={14} className="text-indigo-400" /> PostgreSQL
          </span>
          <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700">
            <Terminal size={14} className="text-green-400" /> Freebsd
          </span>
          <span className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-300 border border-gray-700">
            <BookOpen size={14} className="text-orange-400" /> GitBook
          </span>
        </div>

        <p className="text-gray-400 text-center mb-8 text-sm leading-relaxed">
          Привет! Я занимаюсь любительской разработкой, настройкой окружения и веду личные проекты. Связаться со мной или посмотреть во что я играю или слушаю можно по ссылкам ниже.
        </p>
    
        <div className="flex flex-col gap-3">
          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://discordapp.com/users/463969720362729474" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white py-3 px-4 rounded-xl transition-colors font-medium shadow-lg shadow-[#5865F2]/20"
          >
            <MessageCircle size={22} />
            Discord
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://open.spotify.com/user/3162tzkbojbfbzwzw3t6safxqqbe?si=55c1c757c18e463e" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[#20ab45] hover:bg-[#1a8a3a] text-white py-3 px-4 rounded-xl transition-colors font-medium shadow-lg"
          >
            <ListFilter size={22} />
            Spotify
          </motion.a>

          <motion.a 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href="https://steamcommunity.com/id/d2asdwasdv/" 
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-3 bg-[#171A21] hover:bg-[#2A475E] text-white py-3 px-4 rounded-xl transition-colors font-medium shadow-lg"
          >
            <Gamepad2 size={22} />
            Steam
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}