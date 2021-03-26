const fs = require('fs').promises;
const path = require('path');
const { Random, Values, Constants } = require('jsuseful');
const { words, chars, translate, wordsRus, wordsOriginal } = require('./dictionary');

const fileDir = path.resolve(__dirname, 'public');

const writeToFile = async (data, file) => {
  try {
    await fs.writeFile(path.resolve(fileDir, file), data, { encoding: 'utf8' });
  } catch (e) {
    console.error(e);
    return null;
  }
};

async function writeUpdatedContent() {
  const createChar = () => Random.arrayElement(chars);
  const createPhrase = notesArray => {
    if (!notesArray) {
      notesArray = Constants.NOTES;
    }

    const size = Random.number(2, 4);
    const phrase = Random.arrayValues(notesArray, size).join('');

    return phrase;
  };
  const createText = phrasesArray => {
    if (!phrasesArray) {
      phrasesArray = wordsRus;
      // phrasesArray = Random.array(50, () => createPhrase(notes));
    }

    const size = Random.number(10, 100);
    const text = Random.arrayValues(phrasesArray, size).join(' ');

    return text;
  };
  const createTranslate = () => {
    const original = createText(wordsOriginal);
    const translated = translate(original);

    return `${original}\n\n\t->>>\n\n${translated}`;
  };

  const notes = Random.arrayValues(chars, 1000);
  const phrases = Random.array(50, () => createPhrase(notes));
  const text = createText(phrases);

  // await writeToFile(notes.join(' '), `${fileDir}/text/notes.txt`);
  // await writeToFile(phrases.join(' '), `${fileDir}/text/phrases.txt`);
  // await writeToFile(text.join('\n'), `${fileDir}/text/text.txt`);

  const translateExamples = Random.array(10, () => createTranslate());
  console.debug(translateExamples);
}

writeUpdatedContent();
