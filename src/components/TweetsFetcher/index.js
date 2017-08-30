import React from 'react';
import {connect} from 'react-redux';
import TweetsColumns from '../TweetsColumns';

class TweetsFetcher extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: "FETCH_TWEETS"
        });
    }

    render(props) {
        return (
            <TweetsColumns></TweetsColumns>
        );
    }
}

function mapStateToProps(state) {
    return {}
}


export default connect(mapStateToProps)(TweetsFetcher);