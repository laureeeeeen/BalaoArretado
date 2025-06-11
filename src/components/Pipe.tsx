
import React from 'react';

interface PipeProps {
  x: number;
  height: number;
  gap: number;
  width: number;
  gameHeight: number;
}

export const Pipe: React.FC<PipeProps> = ({ x, height, gap, width, gameHeight }) => {
  return (
    <>
      {/* Bandeirolas de festa junina (top) */}
      <div
        className="absolute"
        style={{
          left: x,
          top: 0,
          width: width,
          height: height,
        }}
      >
        {/* String das bandeirolas */}
        <div
          className="absolute bg-yellow-600"
          style={{
            left: width / 2 - 1,
            top: 0,
            width: 2,
            height: height,
          }}
        ></div>
        
        {/* Bandeirolas coloridas */}
        <div className="absolute inset-0 flex flex-col justify-around items-center">
          {Array.from({ length: Math.floor(height / 40) }).map((_, i) => (
            <div key={i} className="relative">
              {/* Bandeirola triangular */}
              <div
                className={`w-8 h-6 ${
                  i % 4 === 0 ? 'bg-red-500' :
                  i % 4 === 1 ? 'bg-blue-500' :
                  i % 4 === 2 ? 'bg-green-500' :
                  'bg-yellow-500'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.3))'
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Fogueira (bottom) */}
      <div
        className="absolute"
        style={{
          left: x,
          top: height + gap,
          width: width,
          height: gameHeight - height - gap,
        }}
      >
        {/* Base da fogueira */}
        <div
          className="absolute bg-gradient-to-t from-yellow-900 to-yellow-700 rounded-full"
          style={{
            left: width * 0.1,
            bottom: 0,
            width: width * 0.8,
            height: 30,
          }}
        ></div>
        
        {/* Lenha */}
        <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Troncos de madeira */}
            <div className="absolute bg-amber-800 rounded-full" style={{ width: 60, height: 8, bottom: 0, left: -30, transform: 'rotate(-15deg)' }}></div>
            <div className="absolute bg-amber-900 rounded-full" style={{ width: 60, height: 8, bottom: 5, left: -30, transform: 'rotate(15deg)' }}></div>
            <div className="absolute bg-amber-700 rounded-full" style={{ width: 50, height: 6, bottom: 10, left: -25, transform: 'rotate(-30deg)' }}></div>
          </div>
        </div>
        
        {/* Chamas */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Chama principal */}
            <div
              className="absolute bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full animate-pulse"
              style={{
                width: 20,
                height: 30,
                left: -10,
                bottom: 0,
                clipPath: 'ellipse(50% 70% at 50% 100%)',
                animation: 'pulse 0.8s ease-in-out infinite'
              }}
            ></div>
            
            {/* Chamas menores */}
            <div
              className="absolute bg-gradient-to-t from-orange-500 to-yellow-400 rounded-full animate-pulse"
              style={{
                width: 15,
                height: 25,
                left: -20,
                bottom: 0,
                clipPath: 'ellipse(50% 70% at 50% 100%)',
                animation: 'pulse 1s ease-in-out infinite'
              }}
            ></div>
            
            <div
              className="absolute bg-gradient-to-t from-red-400 to-orange-300 rounded-full animate-pulse"
              style={{
                width: 12,
                height: 20,
                left: 8,
                bottom: 0,
                clipPath: 'ellipse(50% 70% at 50% 100%)',
                animation: 'pulse 1.2s ease-in-out infinite'
              }}
            ></div>
          </div>
        </div>
        
        {/* Fumaça */}
        <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2">
          <div className="bg-gray-400 opacity-60 rounded-full w-4 h-4 animate-pulse"></div>
          <div className="bg-gray-300 opacity-40 rounded-full w-6 h-6 animate-pulse" style={{ marginTop: -8, marginLeft: 5 }}></div>
        </div>
      </div>
    </>
  );
};
