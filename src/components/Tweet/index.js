import React from 'react';
import styles from './styles';
import injectSheet from 'react-jss';
import dateFormat from 'dateformat';
import {CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';

class Tweet extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const classes = this.props.classes;
        const created_at = dateFormat(this.props.created, "ddd, mmmm dS, yyyy, h:MM TT");
        return (
            <CardContent>
                <a target="blank" className={classes.tweet}
                   href={"https://twitter.com/AppDirect/status/" + this.props.id}>
                    <Typography className={classes.date} type="body1">{created_at}</Typography>
                    <Typography className={classes.body} type="caption">
                        {this.props.content}
                    </Typography>
                </a>
            </CardContent>
        )
    }
}

export default injectSheet(styles)(Tweet);