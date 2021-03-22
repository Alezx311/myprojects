import { words, dictionary, faq } from './solresol';

const example = `

const editor = vscode.window.activeTextEditor
const start = editor.document.positionAt(0)

const text = getText()
const range = getRange()

const dictObj = Object.fromEntries(yoptaReversed)
const dictFind = key => dictObj?.[key] ?? key
const dictRegExp = new RegExp(Object.keys(dictObj).join('|'), 'gi')

const translated = text.replace(dictRegExp, dictFind)

editor.edit(editBuilder => {
  editBuilder.delete(range)
  editBuilder.insert(start, translated)
})

`;
export function replacer(text: string, divider: string, replaceFrom: string[]): string {
  console.log(`Text: ${text}`);

  if (!text) {
    console.error(text);
    return '';
  }

  const result =
    text
      ?.split(divider)
      ?.reduce((acc: string[], val, ind) => [...acc, `${[val, divider, replaceFrom[ind]]}`], [])
      ?.join('') ?? text;

  return result;
}

export default function translate(input: string, divider: string = ' ', dict: string[]): string {
  if (!input) {
    console.error('undefined text in translate', input, divider, dict);
    return 'error';
  }
  const output = replacer(input, divider, dict);
  // const source = input.match(/\s\w\s/gim)?.[1] ?? 'a b c d e f'
  // const dictionary = source.split(' ').map((val: string, ind: number) => [val, ind])

  return `
  faq: ${faq}
  words: ${words}
  dictionary: ${dictionary}
  ----------
  ${output}
  `;
}
