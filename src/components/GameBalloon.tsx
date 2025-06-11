
import React from 'react';

interface GameBalloonProps {
  y: number;
  velocity: number;
  size: number;
  gameWidth: number;
}

export const GameBalloon: React.FC<GameBalloonProps> = ({ y, velocity, size, gameWidth }) => {
  const rotation = Math.min(Math.max(velocity * 2, -20), 20);
  const balloonX = gameWidth * 0.2; // 20% from left edge
  
  return (
    <div
      className="absolute transition-transform duration-75 z-20"
      style={{
        left: balloonX,
        top: y,
        transform: `rotate(${rotation}deg)`,
        width: size,
        height: size,
      }}
    >
      {/* Balloon using the new kite image */}
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src="/lovable-uploads/e8a6385b-c88e-46a7-9808-47a3be6a0c62.png"
          alt="Kite Balloon"
          className="w-full h-full object-contain drop-shadow-lg"
          style={{
            filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
          }}
        />
      </div>
    </div>
  );
};
