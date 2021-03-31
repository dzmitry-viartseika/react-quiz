import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter} from 'react-router-dom';
import {createStore, compose, applyMiddleware} from 'redux';
import { rootReducer } from "./redux/rootReducer";
import { Provider } from "react-redux";
import reduxThunk from 'redux-thunk';

const loggerMiddleWare = store => next => action => {
    const result = next(action)
    return result;
}

const store = createStore(
    rootReducer,
    applyMiddleware(
        loggerMiddleWare,
        reduxThunk
    ),
);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <Provider store={store}>
              <App />
          </Provider>
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
