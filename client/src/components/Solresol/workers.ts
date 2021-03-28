import { SOLRESOL_SOURCE } from './dictionary';

export const SOLRESOL_BASIC = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
export const filterStr = (arr: string[], minSize = 1): string[] => arr.filter(str => str?.trim()?.length >= minSize);
export const splitToWords = (str: string): string[] => filterStr(str.split(' '));

export const SOLRESOL_ENTRIES = SOLRESOL_SOURCE.toLowerCase()
  .match(/^(\w+)\s(.+)$/gim)
  ?.map(splitToWords)
  ?.filter(filterStr)
  ?.map(([word, ...translates]) => [word, [translates]]);

if (!SOLRESOL_ENTRIES) {
  throw new Error('Invalid entries');
}

export const SOLRESOL = Object.fromEntries(SOLRESOL_ENTRIES);
export const SOLRESOL_WORDS = Object.keys(SOLRESOL);

export const replaceIfHaveTranslation = (word: string) => SOLRESOL?.[word]?.[0] ?? word;
export const replaceAllEntries = async (text: string) => {
  const result = await Promise.all(text.replace(/\b\w+\b/, replaceIfHaveTranslation));

  return result.join(' ');
};
export const generate = (scale = SOLRESOL_BASIC, size = 1000) => {
  const words = Random.numbers(size, 2, 7).map(len => Random.arrayValues(scale, len).join(' '));
  return words.replace(/\s/g, v => `${Random.arrayElement(...[',,.\n\n!?          '], size / 4)}${v}`);
};
export const playNotes = (text: string, bpm: number): void => {
  const words = splitToWords(text);
  const time = 60000 / bpm;

  let counter = 0;
  let wordToPlay = words[0];

  setInterval(() => {
    counter++;
    console.log(wordToPlay);
    wordToPlay = replaceIfHaveTranslation(words[counter]);
  }, time);
};

// }

// export const SOLRESOL_OBJECT = Object.fromEntries(SOLRESOL_ENTRIES)

// export const SOLRESOL_WORDS = Object.keys(SOLRESOL_OBJECT)
// export const SOLRESOL_WORDS = Object.values(SOLRESOL_OBJECT)
// export const SOLRESOL_TRANSLATES = SOLRESOL_ENTRIES.map(str => str.match(/^\w+\s(.+)$/i)?.[1]).filter(Boolean)
// export const SOLRESOL_
// export const PAIRS: [string, string] = SOLRESOL_SOURCE.split('\n')
//   .map(v => v?.trim() ?? false)
//   .filter(Boolean)
//   .map(v => v.split(/^(.+)\s(.+)/gm));

// export const SOLRESOL_ENTRIES = PAIRS.map(v => {
//   if (!v?.trim()) {
//     console.debug('Empty string', v);
//     return null;
//   }

//   const [full, original, englishWords] = v?.match(/^(\w+)\s(.+)$/im) ?? ['', '', ''];
//   const variants = englishWords
//     ?.split(',')
//     .map(v => v?.trim())
//     .filter(Boolean);
// });
// export const SOLRESOL_WORDS: string[] = PAIRS.map(v => v?.match(/^(\w)\s/i)?.[1]).filter();
// export const SOLRESOL_TRANSLATES = PAIRS.map(v => v?.match(/^\w\s(\w+)$/i)?.[1])
//   .map(v => v?.trim())
//   .filter(v => v?.trim()?.length);
// const STAT = `
// SOLRESOL_SOURCE Dictionary stat:

// Unical pairs: ${PAIRS.length}
// Unical solresol words: ${SOLRESOL_WORDS.length}

// `;
// const WORDS = SOLRESOL_SOURCE.WORDS;

// export default class Workers {
//   constructor(source = SOLRESOL_SOURCE) {}
// }
