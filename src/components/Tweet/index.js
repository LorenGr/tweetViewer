import React from 'react';
import styles from './styles';
import injectSheet from 'react-jss';
import dateFormat from 'dateformat';
import {CardContent, CardActions} from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import toMention from 'to-mention-link';
import ReactHtmlParser from 'react-html-parser';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

class Tweet extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const classes = this.props.classes;
        const created_at = dateFormat(this.props.created, "h:MM TT - d mmm yyyy");
        const formattedTweets = toMention(this.props.content, {renderer: 'html'});
        return (
            <div>
                <CardContent className={classes.contentRoot}>
                    <Typography className={classes.body} type="headline">
                        {ReactHtmlParser(formattedTweets)}
                    </Typography>

                </CardContent>
                <CardActions disableActionSpacing className={classes.actionsRoot}>
                    <Typography className={classes.date} type="caption">{created_at}</Typography>
                    <a target="blank" className={classes.tweet}
                       href={"https://twitter.com/AppDirect/status/" + this.props.id}>
                        <IconButton>
                            <KeyboardArrowRight/>
                        </IconButton>
                    </a>

                </CardActions>
            </div>
        )
    }
}

export default injectSheet(styles)(Tweet);