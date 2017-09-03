import axios from 'axios';

export default class TwitterApi {
    static getList(params) {
        const {startDate, tweetsAmount} = params;
        return axios.get("/tweets/appdirect?count=" + tweetsAmount);
    }
}