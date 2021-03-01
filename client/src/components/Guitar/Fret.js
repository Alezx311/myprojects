import { Button } from 'react-bootstrap'

export default function Fret(props) {
  return (
    <Button variant="light" {...props}>
      {props?.note ?? 'Play'}
    </Button>
  )
}
