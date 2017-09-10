import React from 'react';
import {connect} from 'react-redux';
import TweetsColumns from '../TweetsColumns';

class TweetsFetcher extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: "FETCH_TWEETS", controls: this.props.controls
        });
    }

    render() {
        return this.props.tweets ?
            (<TweetsColumns tweets={this.props.tweets}
                            columnCount={this.props.controls.amountOfColumns}/>)
            : (<div></div>);
    }
}

function mapStateToProps(state) {
    return {
        tweets: state.sortedTweets,
        controls: state.controls
    }
}


export default connect(mapStateToProps)(TweetsFetcher);