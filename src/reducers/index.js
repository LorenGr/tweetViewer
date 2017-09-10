import groupTweets from './tweetGrouper';

function getTweetsStartDate() {
    let today = new Date();
    today.setMonth(today.getMonth() - 3);
    return today.toISOString().substr(0, 10);
}

export default function reducers(state = {
    controls: {
        theme: 'light',
        tweetsAmount: 30,
        amountTweetsPerColumn: 10,
        screenName: "appdirect",
        amountOfColumns: 3,
        startDate: getTweetsStartDate()
    }
}, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "FETCH_TWEETS_SUCCESS" :
            new_state.tweets = action.tweets;
            return new_state;

        case "REDRAW_TWEETS" :
            new_state.sortedTweets = groupTweets(
                new_state.tweets,
                new Date(new_state.controls.startDate),
                new_state.controls.amountTweetsPerColumn,
                new_state.controls.amountOfColumns
            );
            return new_state;

        case "SET_THEME" :
            new_state.controls.theme = action.theme;
            return new_state;

        case  "SET_COLUMN_AMOUNT" :
            new_state.controls.amountTweetsPerColumn = action.amount;
            return new_state;

        case "SET_TWEETS_START_DATE" :
            new_state.controls.startDate = action.date;
            return new_state;

        default :
            return state;

    }
}