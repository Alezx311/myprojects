import { Button, Box } from 'grommet';

export interface FretProps {
  noteChar: string;
  onClick: (v: string) => void;
}
export interface FretRowProps {
  noteChars: string[];
}
export interface FretStringsProps {
  tuning: string[];
}


export const Fret = (props: FretProps): JSX.Element => {
  const { noteChar, onClick } = props;

  return <Button label={noteChar} onClick={() => onClick(noteChar)} />;
};

export const FretRow = (props: FretRowProps): JSX.Element => {
  const onClick = (char: string) => {
    console.debug(char);
  };

  return (
    <Box>
      {props.noteChars.map(
        (noteChar: string): JSX.Element => (
          <Fret noteChar={noteChar} onClick={onClick} {...props} />
        ),
      )}
    </Box>
  );
};

export const FretStrings = (props: FretStringsProps): JSX.Element => {
  return (
    <>
      {props.tuning.map(
        (note: string): JSX.Element => (
          <FretRow noteChars={[note]} />
        ),
      )}
    </>
  );
};
