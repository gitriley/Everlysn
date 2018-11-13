import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers/reducer'
import logger from 'redux-logger'
import './index.css';
import {ConnectApp} from './App';
import registerServiceWorker from './registerServiceWorker';


const reduxLogger = composeWithDevTools(applyMiddleware(logger))


const store = createStore(
    rootReducer, 
    {}
)
// const unsubscribe = store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
    <Provider store={store}>
        <ConnectApp />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
