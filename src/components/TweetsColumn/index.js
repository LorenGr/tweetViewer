import React from 'react';
import Tweet from '../Tweet';
import injectSheet from 'react-jss';
import styles from './styles';

//Material
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class TweetsColumn extends React.Component {

    render() {
        const tweets = this.props.tweets || [];
        const DragHandle = this.props.handle;
        const classes = this.props.classes;
        const tweetsEls = [];
        for (let i = 0; i < tweets.length; i++) {
            tweetsEls.push(
                <div key={i}>
                    <Tweet id={tweets[i]['id_str']}
                           created={tweets[i]['created_at']}
                           content={tweets[i].text}/>
                    <Divider/>
                </div>
            );
        }
        return (
            <Grid key={this.props.value} item>
                <Paper className={classes.content}>
                    <DragHandle/>
                    {tweetsEls}
                </Paper>
            </Grid>);
    }
}

export default injectSheet(styles)(TweetsColumn);