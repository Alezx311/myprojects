import { names } from "./names";

export const Stat = (props) => {
  const statFiles = names.split("\n").length;
  const statMessage = `Bliss files finded: ${statFiles}`;

  return (
    <div className="container">
      <div className="subtitle">{statMessage}</div>
    </div>
  );
};
export const InputTranslate = (props) => {
  const toWords = (text) =>
    text && [...new Set([...text.split(/[^a-z0-9]/gi)])];
  const checkInput = (text) => {
    const blissWords = toWords(names);
    const inputWords = toWords(text);

    return inputWords.filter((w) => w.trim() && blissWords.includes(w.trim()));
  };
};

export const Drawer = (props) => {
  return (
    <div className="container">
      <p>Drawer</p>
    </div>
  );
};
