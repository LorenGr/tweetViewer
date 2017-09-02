import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import {reducers} from './reducers/index';
import createSagaMiddleware from 'redux-saga';
import {sagas} from './sagas/index';
import persistState from 'redux-localstorage';

//App Components
import TweetsViewer from './components/TweetsViewer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const persistStateMiddleware = persistState("controls");
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(sagaMiddleware), persistStateMiddleware
));
sagaMiddleware.run(sagas);

ReactDOM.render(
    <Provider store={store}>
        <TweetsViewer/>
    </Provider>,
    document.getElementById('app_container')
);