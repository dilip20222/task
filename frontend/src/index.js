import React from 'react';
import ReactDOM, { render } from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import Store from './store';
import {logger} from 'redux-logger'

ReactDOM.render(
    <Provider store={Store}>
    <App />
    </Provider>,
  document.getElementById('root')
);

