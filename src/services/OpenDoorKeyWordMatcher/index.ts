import { openDoorMessagePatterns } from './config';

const openDoorMessagePatternsAsKeywords = openDoorMessagePatterns.map((pattern) => getRawMessageWords(pattern));

export const OpenDoorKeyWordMatcher = {
  isOpenDoorMessage: (message: string): boolean => {
    if (!message) {
      return false;
    }
    const messageAsWords = getRawMessageWords(message);
    return openDoorMessagePatternsAsKeywords.some((patternWords) =>
      patternWords.every((word) => messageAsWords.includes(word)),
    );
    return false;
  },
};

function getRawMessageWords(message: string): string[] {
  return message
    .split(',')
    .flatMap((wordsSeparatedByComma) => wordsSeparatedByComma.split(' '))
    .flatMap((word) => {
      const re = /[^a-zA-Zа-яА-ЯёЁ]+/g;
      return word.replace(re, '').toLowerCase();
    })
    .filter((word) => !!word);
}
