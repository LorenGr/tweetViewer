import {call, put} from 'redux-saga/effects';
import TwitterApi from '../api';

export function* fetchTweets(action) {
    const {screenName, tweetsAmount} = action.controls;
    const tweets = yield call(TwitterApi.getList,
        {screenName, tweetsAmount}
    );
    yield put({type: 'FETCH_TWEETS_SUCCESS', tweets: tweets.data});
    yield put({type: 'REDRAW_TWEETS'});
}