import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import * as Helpers from './Helpers'

const Player = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  const buttonRefreshHandler = () => {
    dispatch(actions.generatePattern())
  }
  const buttonPlayHandler = e => {
    if (!state.track) {
      const updatedState = Helpers.getSequence(state)
      dispatch(actions.changeState(updatedState))

      // dispatch(actions.generatePattern())
    }

    dispatch(actions.playerPlay())
  }
  const buttonPauseHandler = () => {
    if (!state.track) {
      return true
    }

    dispatch(actions.playerPause())
  }

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="btn-group btn-group-lg" role="group">
          <button
            onClick={buttonPlayHandler}
            className={`btn btn-outline-success btn-lg fas fa-play ${state.track ? '' : 'disabled'}`}
          >
            Play
          </button>
          <button onClick={buttonPauseHandler} className="btn btn-outline-success btn-md fas fa-pause">
            Pause
          </button>
          <button onClick={buttonRefreshHandler} className="btn btn-outline-success btn-md fas fa-refresh">
            Refresh
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col text-center">
          {Object.entries(state.track?.get() ?? {}).map((ent, key) => {
            return (
              <span key={key}>
                <em>{ent.join(' : ').substring(0, 50) + '...'}</em>
                <br />
              </span>
            )
          })}
          <span>value: {state?.track?.value ?? 'Undefined'}</span>
          <br />
          <span>progress: {state?.track?.progress ?? 'Undefined'}</span>
          <br />
          <span>state: {state?.track?.state ?? 'Undefined'}</span>
          <br />
          <span>nowPlayingNote: {state?.track?.nowPlayingNote ?? 'Undefined'}</span>
          {/* <span>Value: {state.track?.get('value') ?? 'Unknown'}</span> */}
        </div>
      </div>
    </div>
  )
}

export default Player
