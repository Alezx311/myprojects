import React from 'react'
import ReactJson from 'react-json-view'

import { Random, Constants } from './helpers'

// const { ArrayElement } = Random
const { NOTES, SCALES, INSTRUMENT_NAMES, SYNTH_NAMES, PROPS } = Constants

export const classNames = {
  text: 'text-center align-middle',
  inputGroup: 'input-group mb-3'
}

export const JsonBlock = obj => <ReactJson src={obj} />
export const TextBlock = ({ text = '' }) => <div className={classNames.text}>{text}</div>
export const LabelBlock = ({ labelId = Math.random(), text = '' }) => (
  <label htmlFor={labelId} className="form-label">
    {text}
  </label>
)

const propsToFull = props => {
  const DEFAULT_OPTIONS = { ...props, ...PROPS }
  if (props.key) {
    

    props.key = `key${notes}${number}`
  }
}

const Divider = props => <br {...propsToFull(props)} />
const Text = props => <p {...propsToFull(props)}></p>
const Block = props => <div {...propsToFull(props)}></div>
const Content = props => (
  <Block>
    <Divider />
    <Text {...propsToFull(props)} />
    {/* <Text {...opts}>{opts.value}</Text> */}
    <Divider />
  </Block>
)
const Box = props => {
  const opts = propsToFull(props)

  return (
    <Block {...opts}>
      <Content>{opts?.title ?? ''}</Content>
      <Content>{opts?.text ?? ''}</Content>
      <Content>{opts?.content ?? ''}</Content>
    </Block>
  )
}

const ArrayList = arr => (
  <Content>
    {[...arr].map(v => (
      <Block key={true} value={v} />
    ))}
  </Content>
)
const NotesList = () => <Box>{ArrayList(NOTES)}</Box>
const ScalesList = () => <Box>{ArrayList(SCALES)}</Box>
const InstrumentsList = () => <Box>{ArrayList(INSTRUMENT_NAMES)}</Box>
const SynthsList = () => <Box>{ArrayList(SYNTH_NAMES)}</Box>
const ConstantsList = () => (
  <Box>
    <Box>
      <Text>Constants List</Text>
    </Box>
    <Box>
      <ScalesList />
      <InstrumentsList />
      <SynthsList />
    </Box>
  </Box>
)
