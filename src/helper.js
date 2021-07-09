// words
import WORDS from "./constants/words";

// patterns
import { fourWordsPatterns } from "./constants/patterns";
import { fiveWordsPatterns } from "./constants/patterns";
import { sixWordsPatterns } from "./constants/patterns";
import { sevenWordsPatterns } from "./constants/patterns";

const genRndBetween = (first, second) => {
  const min = Math.min(first, second + 1);
  const max = Math.max(first, second + 1);
  const diff = max - min;

  return Math.floor(Math.random() * diff) + min;
};

// THIS MIGHT NOT BE A GOOD FUNCTION NAME !!!
export const feedTheBoard = () => {
  const ALL_WORDS = [...WORDS];

  const currentLevel = genRndBetween(5, 7); // 5, 6, 7

  const secondStepWords = Array.from({ length: currentLevel }).map(() => {
    const idx = Math.floor(Math.random() * ALL_WORDS.length);
    return ALL_WORDS.splice(idx, 1)[0];
  });

  const patterns = {
    5: {
      firstStepPatterns: fourWordsPatterns[genRndBetween(0, 9)].patterns,
      secondStepPatterns: fiveWordsPatterns[genRndBetween(0, 9)].patterns,
    },

    6: {
      firstStepPatterns: fiveWordsPatterns[genRndBetween(0, 9)].patterns,
      secondStepPatterns: sixWordsPatterns[genRndBetween(0, 9)].patterns,
    },
    7: {
      firstStepPatterns: sixWordsPatterns[genRndBetween(0, 9)].patterns,
      secondStepPatterns: sevenWordsPatterns[genRndBetween(0, 9)].patterns,
    },
  };

  const len = secondStepWords.length - 1;
  const extraWord = secondStepWords[genRndBetween(0, len)];

  return {
    firstStepWords: secondStepWords.filter((word) => word !== extraWord),
    firstStepPatterns: patterns[currentLevel].firstStepPatterns,

    secondStepWords,
    secondStepPatterns: patterns[currentLevel].secondStepPatterns,

    extraWord,
  };
};

// HELPER FUNCTIONS TO WORK WITH LOCAL STORAGE
export const fetchFromLS = (key) => JSON.parse(localStorage.getItem(key));

export const removeFromLS = (key) => {
  localStorage.removeItem(key);
};

export const persistToLS = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
