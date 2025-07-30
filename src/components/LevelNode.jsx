import React from 'react';
import { motion } from 'framer-motion';

const LevelNode = ({ level, title, description, isUnlocked, isCurrent, isCompleted, onClick }) => {
  return (
    <motion.div
      className={`
        flex items-center p-4 rounded-xl cursor-pointer
        ${isUnlocked ? 'bg-gradient-to-r from-purple-600 to-blue-600' : 'bg-gray-700 opacity-50'}
        ${isCurrent ? 'ring-2 ring-yellow-400' : ''}
        ${isCompleted ? 'border-2 border-green-400' : ''}
        hover:shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300
      `}
      onClick={() => onClick(level)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white font-bold text-lg">
        {level}
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-300">{description}</p>
      </div>
      <div className="ml-4">
        {isCompleted && <span className="text-2xl">✅</span>}
        {!isUnlocked && <span className="text-2xl">🔒</span>}
        {isCurrent && <span className="text-2xl animate-pulse">➡️</span>}
      </div>
    </motion.div>
  );
};

export default LevelNode;