import React, { forwardRef, useEffect, useRef } from "react";
import { ConnectionQuality } from "@heygen/streaming-avatar";

import { useConnectionQuality } from "../logic/useConnectionQuality";
import { useStreamingAvatarSession } from "../logic/useStreamingAvatarSession";
import { StreamingAvatarSessionState } from "../logic";
import { CloseIcon } from "../Icons";
import { Button } from "../Button";

export const AvatarVideo = forwardRef<HTMLVideoElement>(({}, ref) => {
  const { sessionState, stopAvatar } = useStreamingAvatarSession();
  const { connectionQuality } = useConnectionQuality();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationIdRef = useRef<number>();

  const isLoaded = sessionState === StreamingAvatarSessionState.CONNECTED;

  useEffect(() => {
    const video = ref as React.MutableRefObject<HTMLVideoElement | null>;
    const canvas = canvasRef.current;
    
    if (!video?.current || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const processFrame = () => {
      if (!video.current || video.current.videoWidth === 0) {
        animationIdRef.current = requestAnimationFrame(processFrame);
        return;
      }

      // Set canvas size to match video
      if (canvas.width !== video.current.videoWidth || canvas.height !== video.current.videoHeight) {
        canvas.width = video.current.videoWidth;
        canvas.height = video.current.videoHeight;
      }

      // Draw video frame to canvas
      ctx.drawImage(video.current, 0, 0, canvas.width, canvas.height);

      // Get image data for chroma key processing
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      // Process each pixel for chroma key removal
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // Check if pixel is green (chroma key)
        // Adjust these thresholds as needed for better results
        if (g > r * 1.5 && g > b * 1.5 && g > 100) {
          // Replace with white background
          data[i] = 255;     // Red
          data[i + 1] = 255; // Green
          data[i + 2] = 255; // Blue
          // Keep alpha as is
        }
      }

      // Put processed image data back to canvas
      ctx.putImageData(imageData, 0, 0);

      animationIdRef.current = requestAnimationFrame(processFrame);
    };

    // Start processing when video is playing
    const startProcessing = () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      processFrame();
    };

    video.current.addEventListener('playing', startProcessing);
    video.current.addEventListener('loadeddata', startProcessing);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      video.current?.removeEventListener('playing', startProcessing);
      video.current?.removeEventListener('loadeddata', startProcessing);
    };
  }, [ref, isLoaded]);

  return (
    <>
      {connectionQuality !== ConnectionQuality.UNKNOWN && (
        <div className="absolute top-3 left-3 bg-black text-white rounded-lg px-3 py-2 z-10">
          Connection Quality: {connectionQuality}
        </div>
      )}
      {isLoaded && (
        <Button
          className="absolute top-3 right-3 !p-2 bg-zinc-700 bg-opacity-50 z-10"
          onClick={stopAvatar}
        >
          <CloseIcon />
        </Button>
      )}
      {/* Hidden video element for processing */}
      <video
        ref={ref}
        autoPlay
        playsInline
        style={{
          display: "none",
        }}
      >
        <track kind="captions" />
      </video>
      {/* Canvas to display processed video with chroma key removal */}
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
      {!isLoaded && (
        <div className="w-full h-full flex items-center justify-center absolute top-0 left-0">
          Loading...
        </div>
      )}
    </>
  );
});
AvatarVideo.displayName = "AvatarVideo";
