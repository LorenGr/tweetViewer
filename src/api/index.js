import axios from 'axios';

export default class TwitterApi {

    static getList() {
        return axios.get(
            "http://localhost:7890/1.1/statuses/user_timeline.json?count=30&screen_name=appdirect"
        );
    }
}