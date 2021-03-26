const { Random, Values, Constants } = require('jsuseful');

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
