import React from 'react';
import TweetsFetcher from '../TweetsFetcher';

export default class TweetsViewer extends React.Component {
    render(props) {
        return (
            <section>
                <header>

                </header>
                <content>
                    <TweetsFetcher/>
                </content>
            </section>
        );
    }
}