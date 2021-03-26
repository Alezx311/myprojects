import { Box, Button, Text } from 'grommet';
import React from 'react';
import { SYNTHS, NOTES } from '../constants';
import translate from './translate';
import { Random } from 'jsuseful';

type NoteProps = {
  onClick: (v: string) => void;
};

interface TextProps {
  parts?: string[];
  divider?: string;
  translateFrom?: string[];
  translateWith?: (input: string) => string;
}

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

// React.FC<TextProps>
export function ShowText(props: any) {
  const input = props?.inputText ?? Random.arrayElement();
  const parts = props?.parts ?? Object.keys(props);
  const translateResult = translate(input, ' ', parts);
  const output = parts.reduce((acc: string[], val: string, index: number) => [...acc, val], []);
  const stat = `${input}\n\n>>>translate>>>\n\n${output}\n\n>>>${translateResult}`;

  return (
    <Box align='center' gap='large' pad='large'>
      <Text size='large'>
        {'INPUT:\t'} {`"${input}"`}
      </Text>
      <Text size='small'>
        {'OUTPUT:\t'} {`"${output}"`}
      </Text>
      <Text size='xsmall'>
        {'TRANSLATERESULT:\t'} {`"${translateResult}"`}
      </Text>
      <Text size='xsmall'>
        {'STAT:\t'} {`"${stat}"`}
      </Text>
    </Box>
  );
}

export function Player() {
  const dictText = 'a aa aaa b ba bba bbb abb aab c cc ccc ccb';
  // const notesText = Random.arrayValues(dictText.split(' '));
  const randNotes =
    'a aa aaa b ba bba bbb abb aab c cc ccc ccb'?.split(' ') ??
    Random.array(50).map((val: string) => Random.arrayElement(dictText));
  const notesText = randNotes.join(' ');
  const notesDict = Object.values({
    a: 'do',
    b: 're',
    c: 'mi',
    d: 'fa',
    e: 'sol',
    f: 'la',
    ba: '_sido_',
    aa: '_Do_',
    ab: '_dore_',
  }) ?? ['do re mi fa sol la si'];

  return (
    <Box direction='column' align='center' gap='medium'>
      {/* <Text>Synths</Text>
      <Synths /> */}
      <Text>ShowNotesToText</Text>
      <ShowText parts={notesDict} inputText={notesText} />
    </Box>
  );
}
