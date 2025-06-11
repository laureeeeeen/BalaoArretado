
import React from 'react';

interface StartScreenProps {
  onStart: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
      <div className="bg-white rounded-lg p-6 md:p-8 text-center shadow-2xl mx-4 max-w-sm border-4 border-yellow-400">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">🪁 Balão Arretado</h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Voe com sua pipa pela festa!<br />
          🔥 Evite as fogueiras e bandeirolas 🎪
        </p>
        <button
          onClick={onStart}
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 md:py-3 px-4 md:px-6 rounded-lg transition-colors duration-200 text-base md:text-lg w-full"
        >
          🚀 Começar Festa!
        </button>
        <p className="text-xs md:text-sm text-gray-500 mt-4">
          Clique ou pressione ESPAÇO para voar
        </p>
      </div>
    </div>
  );
};
