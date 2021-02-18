import React from 'react'
import ReactJson from 'react-json-view'

export const classNames = {
  generated: 'generated',
  text: 'text-center align-middle',
  inputGroup: 'input-group mb-3',
  label: 'form-label'
}
export const PROPS = {
  className: classNames.generated,
  value: null,
  text: null,
  htmlFor: null,
  key: null
}
export const fullProps = props => ({ ...PROPS, ...props })

export const Json = props => <ReactJson {...props} />
export const Text = props => <p {...fullProps(props)}></p>
export const Label = props => <label {...fullProps(props)}></label>
export const Block = props => <div {...fullProps(props)}></div>
export const Divider = props => <br {...fullProps(props)} />
export const Content = props => (
  <Block>
    <Divider />
    <Text />
    <Divider />
  </Block>
)
