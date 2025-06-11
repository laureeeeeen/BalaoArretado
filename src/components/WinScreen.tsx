
import React from 'react';

interface WinScreenProps {
  score: number;
  onRestart: () => void;
}

export const WinScreen: React.FC<WinScreenProps> = ({ score, onRestart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 md:p-8 text-center shadow-2xl mx-4 max-w-sm border-4 border-green-400">
        <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-4">🎉 Parabéns!</h2>
        <div className="mb-6">
          <p className="text-gray-600 mb-2 text-sm md:text-base">Você conseguiu voar pela festa toda!</p>
          <div className="text-3xl md:text-4xl font-bold text-gray-800">{score} 🏆</div>
          <p className="text-green-600 font-semibold mt-2">Festa completa!</p>
        </div>
        <button
          onClick={onRestart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-200 text-base md:text-lg w-full"
        >
          🎪 Nova Festa!
        </button>
        <p className="text-xs md:text-sm text-gray-500 mt-4">
          Você é um mestre das pipas!
        </p>
      </div>
    </div>
  );
};
