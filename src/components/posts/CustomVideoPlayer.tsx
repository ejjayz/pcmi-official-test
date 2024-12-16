import { useRef, useState, useEffect } from "react";
import { Video } from "reactjs-media";

interface CustomVideoPlayerProps {
  url: string;
}

export default function CustomVideoPlayer({ url }: CustomVideoPlayerProps) {
  const videoRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target.querySelector('video');
          if (video) {
            if (entry.isIntersecting) {
              video.play().catch(() => {
                console.log('Autoplay blocked');
              });
              setIsPlaying(true);
            } else {
              video.pause();
              setIsPlaying(false);
            }
          }
        });
      },
      {
        threshold: 0.5
      }
    );

    observer.observe(videoRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={videoRef}
      className="relative w-full h-auto overflow-hidden"
      style={{ maxHeight: '80vh' }}
    >
      <div className="video-player">
        <Video
          src={url}
          controls={true}
          height="auto"
          width="100%"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
      
      {!isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer hover:bg-black/5 transition-colors"
          onClick={() => {
            const video = videoRef.current?.querySelector('video');
            if (video) {
              video.play();
            }
          }}
        >
          <div className="w-16 h-16 rounded-full bg-white/80 flex items-center justify-center">
            <svg 
              className="w-8 h-8 text-black ml-1" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      <style jsx global>{`
        .video-player {
          width: 100%;
          height: auto;
          max-height: 80vh;
        }

        .video-player video {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .video-player video:fullscreen {
          background: black;
          position: fixed;
          inset: 0;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          object-fit: contain;
        }

        .video-player video::-webkit-full-screen {
          background: black;
          position: fixed;
          inset: 0;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          object-fit: contain;
        }

        .video-player video:-moz-full-screen {
          background: black;
          position: fixed;
          inset: 0;
          width: 100vw !important;
          height: 100vh !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          object-fit: contain;
        }
      `}</style>
    </div>
  );
}