const { Random, Values, Constants } = require('jsuseful');
const fs = require('fs').promises;

const readDictionaryFile = async file => {
  if (!file) {
    throw new Error('Unknown file!');
  }

  const content = await fs.readFile(file, 'utf8');

  // Use index as access keys
  const SOLRESOL_WORDS = content.match(/^(\w+)\s.+$/gim);
  const TRANSLATED_WORDS = content.match(/^\w+\s(.+)$/gim);

  const data = content.split('\n').lines.map(line => {
    let [pair, solresolWord, translateWords] = line.match(/^(\w)\s(.+)$/i);

    return {
      pair,
      solresolWord,
      translateWords: translateWords
        .split(',')
        .map(v => v.trim())
        .filter(Boolean),
    };
  });

  return data;
};

const chars = ['do', 're', 'mi', 'fa', 'sol', 'la', 'si'];
const words = {
  do: 'не, ни',
  re: 'и, так же, как и',
  mi: 'или',
  fa: 'к',
  sol: 'если',
  la: 'the',
  si: 'да, хорошо',
  dore: 'я',
  domi: 'ты, вы',
  misol: 'хорошо',
  fasol: 'почему',
  solmi: 'неправильно',
  solsi: 'спасибо',
  lasol: 'никогда',
  sire: 'каждый',
  sisol: 'господин, сэр',
  sifa: 'немного, едва',
};
const wordsOriginal = Object.keys(words);
const wordsRus = Object.values(words)
  .map(v => v.trim())
  .join(' ')
  .split(' ')
  .filter(v => v.trim());

function translate(original) {
  const elements = original.split(' ');
  const result = elements.map(word => {
    const translate = words?.[word.trim()] ?? word;

    if (translate.includes(', ')) {
      return Random.arrayElement(translate.split(/\b\w\b/)).trim();
    } else {
      return translate.trim();
    }
  });

  return result.join(' ');
}

module.exports = { words, translate, chars, wordsRus, wordsOriginal };
