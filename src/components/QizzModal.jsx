import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import soundManager from '../utils/SoundManager';

const QuizModal = ({ quiz, onAnswer, onClose, quizNumber, totalQuizzes, successCount }) => {
  const handleAnswer = (answerId) => {
    soundManager.playSound('click');
    onAnswer(answerId);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-gradient-to-br from-gray-800 to-purple-900 rounded-2xl p-6 max-w-lg w-full shadow-2xl shadow-purple-500/50"
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Quiz {quizNumber}/{totalQuizzes} (Score: {successCount}/5)
            </h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="mb-4">
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <motion.div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(quizNumber / totalQuizzes) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </div>
          <div className="mb-6">
            <p className="text-gray-200 text-lg">{quiz.scenario}</p>
          </div>
          <div className="space-y-4">
            {quiz.choices.map((choice) => (
              <motion.button
                key={choice.id}
                onClick={() => handleAnswer(choice.id)}
                className="w-full p-4 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                {choice.text}
              </motion.button>
            ))}
          </div>
          {quiz.image_url && (
            <img
              src={quiz.image_url}
              alt="Quiz illustration"
              className="mt-4 rounded-lg max-w-full h-auto"
            />
          )}
          <div className="mt-6 text-center">
            <motion.button
              onClick={onClose}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Quitter
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizModal;