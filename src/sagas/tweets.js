import {call, put} from 'redux-saga/effects';
import TwitterApi from '../api';

export function* fetchTweets(action) {
    const {screenName, startDate, tweetsAmount} = action.controls;
    const tweets = yield call(TwitterApi.getList,
        {screenName, startDate, tweetsAmount}
    );
    yield put({type: 'FETCH_TWEETS_SUCCESS', tweets: tweets.data});
}