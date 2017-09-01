import React from 'react';
import Tweet from '../Tweet';
import injectSheet from 'react-jss';
import styles from './styles';

//Material
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class TweetsColumn extends React.Component {

    shouldComponentUpdate() {
        return !this.props.tweets;
    }

    render() {
        const tweets = this.props.tweets;
        const DragHandle = this.props.handle;
        const classes = this.props.classes;

        return tweets ?
            <Grid key={this.props.value} item>
                <Paper className={classes.content}>
                    <DragHandle/>
                    {
                        tweets.map((tweet, index) => (
                                <div key={index}>
                                    <Tweet id={tweet['id_str']}
                                           created={tweet['created_at']}
                                           content={tweet.text}/>
                                    <Divider/>
                                </div>
                            )
                        )
                    }
                </Paper>
            </Grid>

            : <span></span>;

    }
}

export default injectSheet(styles)(TweetsColumn);