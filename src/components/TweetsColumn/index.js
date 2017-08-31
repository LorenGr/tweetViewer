import React from 'react';
import Tweet from '../Tweet';

export default class TweetsColumn extends React.Component {

    shouldComponentUpdate() {
        return !this.props.tweets;
    }
    render() {
        const tweets = this.props.tweets;

        return tweets ?
            <div>
                {
                    tweets.map((tweet, index) => (
                            <Tweet key={index}
                                   id={tweet['id_str']}
                                   created={tweet['created_at']}
                                   content={tweet.text}/>
                        )
                    )
                }</div>
            : <span>NO</span>;

    }
}
