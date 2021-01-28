import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reducers } from './store/reducers'

import App from './App'

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
)

const app = (
  <Provider store={store}>
    <App />
  </Provider>
)

render(app, document.getElementById('root'))
