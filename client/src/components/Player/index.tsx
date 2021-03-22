import { Box, Button, Text } from 'grommet';
import { SYNTHS, NOTES } from '../constants';

type NoteProps = {
  onClick: (v: string) => void;
};

const Notes = (props: NoteProps) => (
  <Box>
    {NOTES.map(note => (
      <Button onClick={() => props.onClick(note)}>{note}</Button>
    ))}
  </Box>
);

const Synths = () => {
  return (
    <>
      {SYNTHS.map((label: string) => (
        <Box key={label} direction='row' align='center' gap='small'>
          <Notes onClick={v => console.log(v)} />
          <Text>{label}</Text>
          <Button size='small' label='Melody' />
        </Box>
      ))}
    </>
  );
};

export function Player() {
  return (
    <Box direction='column' align='center' gap='medium'>
      <Synths />
    </Box>
  );
}
