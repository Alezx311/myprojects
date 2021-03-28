import { Box, Button } from 'grommet';
import { guitar_record_names } from './workers';

export interface AudioElementProps {
  src: string;
}
export const AudioElement = (props: AudioElementProps): JSX.Element => {
  const { src } = props;
  return <audio controls loop crossOrigin='anonymous' id={`audio_${src}`} src={src}></audio>;
};

export const GuitarRecords = () => (
  <Box>
    {guitar_record_names.map(src => (
      <AudioElement src={src} />
    ))}
  </Box>
);
