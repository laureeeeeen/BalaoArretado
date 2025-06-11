import React, { useState, useEffect, useCallback } from 'react';
import { GameBalloon } from './GameBalloon';
import { Pipe } from './Pipe';
import { GameOverScreen } from './GameOverScreen';
import { StartScreen } from './StartScreen';
import { WinScreen } from './WinScreen';

export interface GameState {
  balloonY: number;
  balloonVelocity: number;
  pipes: Array<{ x: number; gap: number; height: number; passed: boolean }>;
  score: number;
  gameStarted: boolean;
  gameOver: boolean;
  gameWon: boolean;
}

const BALLOON_SIZE = 160; // Increased from 80 to 120 for better visibility
const PIPE_WIDTH = 80;
const PIPE_GAP = 450; // Slightly increased gap for larger balloon
const GRAVITY = 0.6;
const JUMP_FORCE = -10;
const PIPE_SPEED = 3;
const WIN_SCORE = 30;

export const FlappyBird = () => {
  const [gameState, setGameState] = useState<GameState>({
    balloonY: 0,
    balloonVelocity: 0,
    pipes: [],
    score: 0,
    gameStarted: false,
    gameOver: false,
    gameWon: false,
  });

  // Get responsive dimensions
  const gameHeight = typeof window !== 'undefined' ? window.innerHeight : 600;
  const gameWidth = typeof window !== 'undefined' ? window.innerWidth : 400;

  // Initialize balloon position to center
  useEffect(() => {
    setGameState(prev => ({ ...prev, balloonY: gameHeight / 2 }));
  }, [gameHeight]);

  const jump = useCallback(() => {
    if (!gameState.gameStarted) {
      setGameState(prev => ({ ...prev, gameStarted: true }));
    }
    if (!gameState.gameOver && !gameState.gameWon) {
      setGameState(prev => ({ ...prev, balloonVelocity: JUMP_FORCE }));
    }
  }, [gameState.gameStarted, gameState.gameOver, gameState.gameWon]);

  const resetGame = () => {
    setGameState({
      balloonY: gameHeight / 2,
      balloonVelocity: 0,
      pipes: [],
      score: 0,
      gameStarted: false,
      gameOver: false,
      gameWon: false,
    });
  };

  // Game loop
  useEffect(() => {
  if (!gameState.gameStarted || gameState.gameOver || gameState.gameWon) return;

  const gameLoop = setInterval(() => {
    setGameState(prev => {
      const newBalloonY = prev.balloonY + prev.balloonVelocity;
      const newVelocity = prev.balloonVelocity + GRAVITY;

      if (newBalloonY < 0 || newBalloonY > gameHeight - BALLOON_SIZE) {
        return { ...prev, gameOver: true };
      }

      let newPipes = prev.pipes.map(pipe => ({ ...pipe, x: pipe.x - PIPE_SPEED }));
      newPipes = newPipes.filter(pipe => pipe.x > -PIPE_WIDTH);

      if (newPipes.length === 0 || newPipes[newPipes.length - 1].x < gameWidth - 300) {
        const height = Math.random() * (gameHeight - PIPE_GAP - 100) + 50;
        newPipes.push({
          x: gameWidth,
          gap: PIPE_GAP,
          height,
          passed: false,
        });
      }

      let newScore = prev.score;
      let collision = false;
      const balloonX = gameWidth * 0.2;

      const balloonTop = newBalloonY;
      const balloonBottom = newBalloonY + BALLOON_SIZE;

      newPipes.forEach(pipe => {
        const pipeTop = pipe.height;
        const pipeBottom = pipe.height + pipe.gap;

        const horizontallyAligned = pipe.x < balloonX + BALLOON_SIZE && pipe.x + PIPE_WIDTH > balloonX;
        const hitsTopPipe = balloonTop < pipeTop;
        const hitsBottomPipe = balloonBottom > pipeBottom;

        if (horizontallyAligned && (hitsTopPipe || hitsBottomPipe)) {
          collision = true;
        }

        if (!pipe.passed && pipe.x + PIPE_WIDTH < balloonX) {
          pipe.passed = true;
          newScore++;
        }
      });

      if (collision) {
        return { ...prev, gameOver: true };
      }

      if (newScore >= WIN_SCORE) {
        return { ...prev, gameWon: true, score: newScore };
      }

      return {
        ...prev,
        balloonY: newBalloonY,
        balloonVelocity: newVelocity,
        pipes: newPipes,
        score: newScore,
      };
    });
  }, 16);

  return () => clearInterval(gameLoop);
}, [gameState.gameStarted, gameState.gameOver, gameState.gameWon, gameHeight, gameWidth]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [jump]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      // Force re-render on resize
      setGameState(prev => ({ ...prev }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col" style={{ backgroundColor: '#fff2df' }}>
      {/* Game title - responsive */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 drop-shadow-lg">🪁 Balão Arretado</h1>
      </div>
      
      <div 
        className="relative overflow-hidden cursor-pointer flex-1"
        style={{ width: '100vw', height: '100vh', backgroundColor: '#fff2df' }}
        onClick={jump}
      >
        {/* Background clouds - responsive positioning */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[10%] w-12 md:w-16 h-8 md:h-10 bg-white rounded-full"></div>
          <div className="absolute top-[20%] right-[20%] w-8 md:w-12 h-6 md:h-8 bg-white rounded-full"></div>
          <div className="absolute top-[40%] left-[33%] w-16 md:w-20 h-10 md:h-12 bg-white rounded-full"></div>
          <div className="absolute top-[60%] right-[15%] w-10 md:w-14 h-7 md:h-9 bg-white rounded-full"></div>
        </div>

        {/* Balloon */}
        <GameBalloon 
          y={gameState.balloonY} 
          velocity={gameState.balloonVelocity}
          size={BALLOON_SIZE}
          gameWidth={gameWidth}
        />

        {/* Pipes */}
        {gameState.pipes.map((pipe, index) => (
          <Pipe
            key={index}
            x={pipe.x}
            height={pipe.height}
            gap={pipe.gap}
            width={PIPE_WIDTH}
            gameHeight={gameHeight}
          />
        ))}

        {/* Score - responsive positioning */}
        {gameState.gameStarted && (
          <div className="absolute top-16 md:top-20 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl font-bold text-gray-800 drop-shadow-lg z-10">
            {gameState.score} / {WIN_SCORE}
          </div>
        )}

        {/* Start Screen */}
        {!gameState.gameStarted && !gameState.gameOver && !gameState.gameWon && (
          <StartScreen onStart={jump} />
        )}

        {/* Game Over Screen */}
        {gameState.gameOver && (
          <GameOverScreen 
            score={gameState.score}
            onRestart={resetGame}
          />
        )}

        {/* Win Screen */}
        {gameState.gameWon && (
          <WinScreen 
            score={gameState.score}
            onRestart={resetGame}
          />
        )}
      </div>

      {/* Instructions - responsive */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-700 text-center z-10">
        <p className="text-sm md:text-lg">🪁 Clique ou pressione ESPAÇO para voar!</p>
        <p className="text-xs md:text-sm opacity-75">Chegue aos 30 pontos para vencer!</p>
      </div>
    </div>
  );
};
