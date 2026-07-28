import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

const SplashScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        // Silently fail if browser blocks autoplay
      });
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    // Failsafe timer just in case video autoplay is blocked or doesn't fire onEnded
    const endTimer = setTimeout(() => {
      setIsVideoFinished(true);
    }, 7000);

    return () => {
      clearTimeout(endTimer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  useEffect(() => {
    if (isVideoFinished) {
      // Trigger unmount after a short delay to allow exit animations to start
      const unmountTimer = setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = 'unset';
      }, 100);
      return () => clearTimeout(unmountTimer);
    }
  }, [isVideoFinished]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden pointer-events-none"
        >
          <motion.div
            initial={{ scale: 1, x: 0, opacity: 1, filter: "brightness(1)", boxShadow: "0px 0px 0px rgba(255,255,255,0)" }}
            exit={{
              scale: 0.05,
              x: '-45vw',
              opacity: 0,
              rotateY: 45,
              filter: "brightness(2)",
              boxShadow: "0px 0px 200px 100px rgba(255,255,255,1)"
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full relative"
          >
            <video
              ref={videoRef}
              src="/splash_video_processed.mp4"
              autoPlay
              muted
              playsInline
              onCanPlay={(e) => {
                (e.currentTarget as HTMLVideoElement).playbackRate = 2;
              }}
              onEnded={() => setIsVideoFinished(true)}
              className="w-full h-full object-cover relative z-10"
            />
            <audio
              ref={audioRef}
              src="/splash_screen_audio.mp3"
              autoPlay
              onCanPlay={(e) => {
                (e.currentTarget as HTMLAudioElement).playbackRate = 2;
              }}
            />
            {/* White gradient overlay that fades in during shrink */}
            <motion.div
              initial={{ opacity: 0 }}
              exit={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/40 z-20 mix-blend-screen"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
