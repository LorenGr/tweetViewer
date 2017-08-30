export default function tweets(state = {}, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "FETCH_TWEETS_SUCCESS" :
            return new_state;


        default :
            return state;

    }
}