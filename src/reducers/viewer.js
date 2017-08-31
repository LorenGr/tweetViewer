export default function viewer(state = {
    cols: 3
}, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "FETCH_TWEETS_SUCCESS" :
            new_state.tweets = action.tweets;
            return new_state;


        default :
            return state;

    }
}