import { Button, DropButton } from 'grommet';

export interface SelectProps {
  label: string;
  options: [string];
  onClick: (v: string) => void;
}
export function SelectSetup(props: SelectProps): JSX.Element {
  const { label, options, onClick, ...opt } = props;
  return (
    <DropButton
      {...opt}
      label={`${label}:${label}`}
      dropAlign={{ top: 'bottom', right: 'right' }}
      dropContent={
        <>
          {options.map((v: string) => (
            <Button key={v} label={v} onClick={(): void => onClick(v)} />
          ))}
        </>
      }
    />
  );
}
