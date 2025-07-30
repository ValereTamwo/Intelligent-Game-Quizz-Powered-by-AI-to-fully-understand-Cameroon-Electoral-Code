import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const QuizRecapModal = ({ quizResults, successCount, onProceed, onClose }) => {
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
          className="bg-gradient-to-br from-gray-800 to-purple-900 rounded-2xl p-6 max-w-2xl w-full shadow-2xl shadow-purple-500/50 overflow-y-auto max-h-[80vh]"
          initial={{ scale: 0.8, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 100 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">
              Récapitulatif du Quiz (Score: {successCount}/5)
            </h2>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            {quizResults.map((result, index) => (
              <motion.div
                key={index}
                className="p-4 rounded-lg bg-gray-700 bg-opacity-50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-white">
                  Quiz {index + 1}: {result.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                </h3>
                <p className="text-gray-200 mt-2">{result.quiz.scenario}</p>
                <p className="mt-2 text-gray-300">
                  <span className="font-semibold">Votre réponse :</span>{' '}
                  {result.quiz.choices.find((c) => c.id === result.selectedAnswerId)?.text || 'Aucune'}
                </p>
                <p className="mt-2 text-green-400">
                  <span className="font-semibold">Réponse correcte :</span>{' '}
                  {result.quiz.choices.find((c) => c.id === result.quiz.correct_answer_id)?.text}
                </p>
                <p className="mt-2 text-gray-300">
                  <span className="font-semibold">Explication :</span> {result.quiz.explanation}
                </p>
                {result.quiz.image_url && (
                  <img
                    src={result.quiz.image_url}
                    alt={`Quiz ${index + 1} illustration`}
                    className="mt-4 rounded-lg max-w-full h-auto"
                  />
                )}
              </motion.div>
            ))}
          </div>
          <div className="mt-6 flex justify-center space-x-4">
            <motion.button
              onClick={onProceed}
              className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:bg-gradient-to-r hover:from-purple-500 hover:to-blue-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {successCount >= 5 ? 'Continuer' : 'Réessayer'}
            </motion.button>
            <motion.button
              onClick={onClose}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition-colors"
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

export default QuizRecapModal;