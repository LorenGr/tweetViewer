import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import {sagas} from './sagas/index';

//App Components
import TweetViewer from  './components/TweetViewer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <TweetViewer/>
    </Provider>,
    document.getElementById('app_container')
);