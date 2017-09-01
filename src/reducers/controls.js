export default function controls(state = {
    theme : 'light'
}, action) {
    let new_state = JSON.parse(JSON.stringify(state));

    switch (action.type) {

        case "SET_THEME" :
            new_state.theme = action.theme;
            return new_state;

        default :
            return state;

    }
}