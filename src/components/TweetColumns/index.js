import React from 'react';
import {connect} from 'react-redux';

class TweetColumns extends React.Component {

    constructor(props) {
        super(props);
        this.props.dispatch({
            type: "FETCH_TWEETS"
        });
    }

    render(props) {
        return (
            <div></div>
        );
    }
}

function mapStateToProps(state) {
    return {}
}


export default connect(mapStateToProps)(TweetColumns);