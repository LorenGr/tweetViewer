import React from 'react';
import Tweet from '../Tweet';
import injectSheet from 'react-jss';
import styles from './styles';
import {connect} from 'react-redux';

//Material
import Grid from 'material-ui/Grid';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

class TweetsColumn extends React.Component {

    getColumnLimit(amount) {
        return this.props.columnAmount <= amount ? this.props.columnAmount : amount;
    }

    render() {
        const tweets = this.props.tweets || [];
        const DragHandle = this.props.handle;
        const classes = this.props.classes;
        const tweetsEls = [];
        const columnLimit = this.getColumnLimit(tweets.length);
        for (let i = 0; i < columnLimit; i++) {
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

function mapEditStateToProps(state) {
    return {
        columnAmount: state.controls.columnAmount
    }
}

export default connect(mapEditStateToProps)(
    injectSheet(styles)(TweetsColumn)
);