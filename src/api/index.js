import axios from 'axios';

export default class TwitterApi {
    static getList(params) {
        const {screenName,startDate, tweetsAmount} = params;
        return axios.get("/tweets/"+screenName+"?count=" + tweetsAmount);
    }
}