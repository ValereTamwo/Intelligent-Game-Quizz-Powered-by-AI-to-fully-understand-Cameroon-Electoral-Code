import React from 'react';
import { motion } from 'framer-motion';
import LevelNode from './LevelNode';

const LevelMap = ({ topics, currentLevel, completedLevels, onLevelClick }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        className="grid gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {topics.map((topic, index) => (
          <motion.div
            key={topic.id}
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <LevelNode
              level={topic.id}
              title={topic.title}
              description={topic.description}
              isUnlocked={topic.id <= currentLevel}
              isCurrent={topic.id === currentLevel}
              isCompleted={completedLevels.includes(topic.id)}
              onClick={onLevelClick}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default LevelMap;