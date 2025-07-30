import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import LevelMap from './components/LevelMap';
import QuizRecapModal from './components/QuizRecapModal';
import LoadingSpinner from './components/LoadingSpinner';
import soundManager from './utils/SoundManager';
import QuizModal from './components/QizzModal';
function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [quizNumber, setQuizNumber] = useState(0);
  const [successCount, setSuccessCount] = useState(0);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showRecapModal, setShowRecapModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [isSoundMuted, setIsSoundMuted] = useState(false);

  const topics = [
    { id: 1, title: "Titre I : Généralités", description: "Introduction au Code Électoral." },
    { id: 2, title: "ELECAM - Organisation", description: "Découverte d'ELECAM." },
    { id: 3, title: "ELECAM - Conseil Électoral", description: "Fonctionnement du Conseil Électoral." },
    { id: 4, title: "ELECAM - Direction Générale", description: "Rôle de la Direction Générale." },
    { id: 5, title: "ELECAM - Aspects Financiers", description: "Gestion budgétaire ELECAM." },
    { id: 6, title: "L'Électorat - Conditions", description: "Qui peut voter au Cameroun ?" },
    { id: 7, title: "Commissions Préparatoires", description: "Établissement des listes." },
    { id: 8, title: "Commissions Locales", description: "Bureaux de vote." },
    { id: 9, title: "Commissions Départementales", description: "Surveillance des opérations." },
    { id: 10, title: "Commission Nationale", description: "Décompte général des votes." },
    { id: 11, title: "Listes Électorales", description: "Gestion des listes d'électeurs." },
    { id: 12, title: "Cartes Électorales", description: "Obtention des cartes." },
    { id: 13, title: "Convocation Corps Électoral", description: "Délais de convocation." },
    { id: 14, title: "Campagne Électorale", description: "Règles de campagne." },
    { id: 15, title: "Déroulement du Scrutin", description: "Processus de vote." },
    { id: 16, title: "Dépouillement des Votes", description: "Comptage des bulletins." },
    { id: 17, title: "Élection Présidentielle - Mandat", description: "Durée et mode de scrutin." },
    { id: 18, title: "Élection Présidentielle - Éligibilité", description: "Conditions pour être candidat." },
    { id: 19, title: "Élection Présidentielle - Candidature", description: "Dépôt des candidatures." },
    { id: 20, title: "Élection Présidentielle - Contentieux", description: "Gestion des litiges." },
    { id: 21, title: "Élection Présidentielle - Serment & Vacance", description: "Prestation de serment." },
    { id: 22, title: "Députés - Mandat & Scrutin", description: "Élection des Députés." },
    { id: 23, title: "Députés - Éligibilité", description: "Conditions pour être député." },
    { id: 24, title: "Députés - Candidatures & Contentieux", description: "Déclaration et litiges." },
    { id: 25, title: "Conseillers Municipaux - Mandat", description: "Élection des Conseillers Municipaux." },
    { id: 26, title: "Conseillers Municipaux - Éligibilité", description: "Conditions pour les conseillers." },
    { id: 27, title: "Conseillers Municipaux - Candidatures", description: "Candidatures municipales." },
    { id: 28, title: "Conseillers Municipaux - Contentieux", description: "Litiges municipaux." },
    { id: 29, title: "Référendum - Généralités", description: "Quand et comment est organisé." },
    { id: 30, title: "Référendum - Campagne", description: "Règles de la campagne référendaire." },
    { id: 31, title: "Référendum - Résultats", description: "Proclamation des résultats." },
    { id: 32, title: "Sénateurs - Généralités", description: "Élection des Sénateurs." },
    { id: 33, title: "Sénateurs - Éligibilité", description: "Conditions pour les Sénateurs." },
    { id: 34, title: "Sénateurs - Collège Électoral", description: "Composition du collège." },
    { id: 35, title: "Sénateurs - Listes & Cartes", description: "Gestion des listes sénatoriales." },
    { id: 36, title: "Sénateurs - Opérations", description: "Déroulement du vote." },
    { id: 37, title: "Sénateurs - Contentieux", description: "Litiges sénatoriaux." },
    { id: 38, title: "Conseillers Régionaux - Généralités", description: "Élection des Conseillers Régionaux." },
    { id: 39, title: "Conseillers Régionaux - Éligibilité", description: "Conditions des conseillers régionaux." },
    { id: 40, title: "Conseillers Régionaux - Opérations", description: "Déroulement des élections régionales." },
    { id: 41, title: "Conseillers Régionaux - Contentieux", description: "Litiges régionaux." },
    { id: 42, title: "Vote des Camerounais à l'Étranger", description: "Droit de vote de la diaspora." },
    { id: 43, title: "Financement Partis Politiques", description: "Règles de financement." },
    { id: 44, title: "Financement Campagnes", description: "Contribution de l'État." },
    { id: 45, title: "Dispositions Pénales", description: "Sanctions électorales." },
    { id: 46, title: "Dispositions Diverses", description: "Autres règles et abrogations." }
  ];


  const toggleSound = () => {
    setIsSoundMuted(!isSoundMuted);
    soundManager.setMuted(!isSoundMuted);
  };

  const fetchQuiz = async (levelId) => {
    const topic = topics.find((t) => t.id === levelId);
    if (!topic) return;

    setIsLoading(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/generate-quiz', {
        query: topic.title,
      });
      setCurrentQuiz(response.data.quiz);
      setShowQuizModal(true);
      setQuizNumber((prev) => prev + 1);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast.error('Failed to load quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLevelClick = (levelId) => {
    if (levelId === currentLevel) {
      console.log(`Niveau ${levelId} cliqué : "${topics[levelId - 1].title}"`);
      soundManager.playSound('click');
      setQuizNumber(0);
      setSuccessCount(0);
      setQuizResults([]);
      fetchQuiz(levelId);
    } else if (levelId < currentLevel && completedLevels.includes(levelId)) {
      toast.info(`Niveau ${levelId} déjà complété. Vous pouvez le rejouer.`);
      soundManager.playSound('click');
      setQuizNumber(0);
      setSuccessCount(0);
      setQuizResults([]);
      fetchQuiz(levelId);
    } else {
      toast.warn(`Ce niveau est verrouillé. Complétez le niveau ${currentLevel} d'abord.`);
    }
  };

  const handleQuizAnswer = (selectedAnswerId) => {
    if (!currentQuiz) return;

    const isCorrect = selectedAnswerId === currentQuiz.correct_answer_id;
    if (isCorrect) {
      setSuccessCount(successCount + 1);
      toast.success('Correct! Well done!');
      soundManager.playSound('correct');
    } else {
      toast.error('Incorrect. Try again next time!');
      soundManager.playSound('incorrect');
    }

    setQuizResults([
      ...quizResults,
      {
        quiz: currentQuiz,
        selectedAnswerId,
        isCorrect,
      },
    ]);

    if (quizNumber < 5) {
      fetchQuiz(currentLevel);
    } else {
      setShowQuizModal(false);
      setCurrentQuiz(null);
      setShowRecapModal(true);
      if (successCount >= 5) {
        soundManager.playSound('complete');
      }
    }
  };

  const handleRecapProceed = () => {
    if (successCount >= 5) {
      setCompletedLevels([...completedLevels, currentLevel]);
      setCurrentLevel(currentLevel + 1);
      toast.success(`Niveau ${currentLevel} complété ! Prochain niveau débloqué.`);
    } else {
      toast.error(`Vous avez ${successCount}/5 bonnes réponses. Réessayez le niveau ${currentLevel}.`);
    }
    setShowRecapModal(false);
    setQuizNumber(0);
    setSuccessCount(0);
    setQuizResults([]);
  };

  const closeQuizModal = () => {
    soundManager.playSound('close');
    setShowQuizModal(false);
    setCurrentQuiz(null);
    setQuizNumber(0);
    setSuccessCount(0);
    setQuizResults([]);
  };

  const closeRecapModal = () => {
    soundManager.playSound('close');
    setShowRecapModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="p-6 text-center bg-black bg-opacity-50 backdrop-blur-md"
      >
        <div className="flex justify-between items-center">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Le Parcours du Citoyen Éclairé
          </h1>
          <button
            onClick={toggleSound}
            className="text-white bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors"
          >
            {isSoundMuted ? '🔇' : '🔊'}
          </button>
        </div>
        <p className="mt-2 text-lg md:text-xl text-gray-300">
          Apprenez le Code Électoral du Cameroun niveau par niveau !
        </p>
      </motion.header>
      <main className="flex-grow p-6">
        {isLoading && <LoadingSpinner />}
        <LevelMap
          topics={topics}
          currentLevel={currentLevel}
          completedLevels={completedLevels}
          onLevelClick={handleLevelClick}
        />
        {showQuizModal && currentQuiz && (
          <QuizModal
            quiz={currentQuiz}
            onAnswer={handleQuizAnswer}
            onClose={closeQuizModal}
            quizNumber={quizNumber}
            totalQuizzes={5}
            successCount={successCount}
          />
        )}
        {showRecapModal && (
          <QuizRecapModal
            quizResults={quizResults}
            successCount={successCount}
            onProceed={handleRecapProceed}
            onClose={closeRecapModal}
          />
        )}
      </main>
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="p-4 text-center bg-black bg-opacity-50 backdrop-blur-md"
      >
        <p className="text-sm text-gray-400">© Hackathon Cameroun 2024 - Projet Code Électoral</p>
      </motion.footer>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;