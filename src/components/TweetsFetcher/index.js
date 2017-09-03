import React from 'react';
import {connect} from 'react-redux';
import TweetsColumns from '../TweetsColumns';
import divider from '../TweetsFetcher/divider';

class TweetsFetcher extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: "FETCH_TWEETS", controls: this.props.controls
        });
    }

    render() {
        const tweets = this.props.tweets;
        let tweetGroups = [];
        if (tweets && tweets.length) tweetGroups = divider(tweets, tweets.length / this.props.cols);
        return (<TweetsColumns tweets={tweetGroups} columnCount={this.props.cols}/>);
    }
}

function mapStateToProps(state) {
    return {
        tweets: state.viewer.tweets,
        cols: state.viewer.cols,
        controls: state.controls
    }
}


export default connect(mapStateToProps)(TweetsFetcher);