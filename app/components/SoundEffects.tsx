'use client';

import { useEffect, useRef } from 'react';

interface SoundEffectsProps {
  playThunder: boolean;
}

export default function SoundEffects({ playThunder }: SoundEffectsProps) {
  const thunderRef = useRef<HTMLAudioElement | null>(null);
  
  // Play thunder sound when props change
  useEffect(() => {
    if (playThunder && thunderRef.current) {
      // Reset audio position to start
      thunderRef.current.currentTime = 0;
      
      // Set volume level (0-1)
      thunderRef.current.volume = 0.4;
      
      // Play the sound
      try {
        const playPromise = thunderRef.current.play();
        
        // Handle autoplay restrictions in some browsers
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log('Autoplay prevented:', error);
          });
        }
      } catch (err) {
        console.error('Error playing thunder sound:', err);
      }
    }
  }, [playThunder]);
  
  return (
    <div className="hidden">
      <audio 
        ref={thunderRef}
        src="/assets/thunder.mp3" 
        preload="auto" 
      />
    </div>
  );
} 