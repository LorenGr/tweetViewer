import React from 'react';
import TweetColumns from '../TweetColumns';

export default class TweetViewer extends React.Component {
    render(props) {
        return (
            <section>
                <header>

                </header>
                <content>
                    <TweetColumns/>
                </content>
            </section>
        );
    }
}