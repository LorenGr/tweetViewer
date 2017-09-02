import {call, put} from 'redux-saga/effects';
import TwitterApi from '../api';

export function* fetchTweets(action) {
    const tweets = yield call(TwitterApi.getList,[action.startDate]);
    yield put({type: 'FETCH_TWEETS_SUCCESS', tweets : tweets.data});
}