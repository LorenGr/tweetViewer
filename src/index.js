import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './reducers/index';

//App Components
import TweetViewer from  './components/TweetViewer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
        <TweetViewer/>
    </Provider>,
    document.getElementById('app_container')
);