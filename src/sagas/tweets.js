import {call, put} from 'redux-saga/effects';
import TwitterApi from '../api';

export function* fetchTweets(action) {
    const tweets = yield call(TwitterApi.getList,
        {
            startDate: action.startDate,
            tweetsAmount: action.tweetsAmount
        }
    );
    yield put({type: 'FETCH_TWEETS_SUCCESS', tweets: tweets.data});
}