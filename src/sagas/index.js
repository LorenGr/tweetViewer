import {takeLatest} from 'redux-saga';
import {fork} from 'redux-saga/effects';

import {fetchTweets} from './tweets';

export function* sagas() {
    yield [fork(takeLatest, 'FETCH_TWEETS', fetchTweets)];
}