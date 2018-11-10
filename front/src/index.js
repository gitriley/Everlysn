import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import './index.css';
import {ConnectApp} from './App';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducer)
const unsubscribe = store.subscribe(() => console.log(store.getState()))

ReactDOM.render(
    <Provider store={store}>
        <ConnectApp />
    </Provider>, 
    document.getElementById('root')
);
registerServiceWorker();
