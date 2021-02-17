import Setup from './Setup'
import Table from './Table'

export default function Guitar(props) {


  return (
    <div>
      <Setup />
      <Table {...props} />
    </div>
  )
}
