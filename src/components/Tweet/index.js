import React from 'react';
import styles from './styles';
import injectSheet from 'react-jss';
import dateFormat from 'dateformat';

class Tweet extends React.Component {

    shouldComponentUpdate() {
        return false;
    }

    render() {
        const classes = this.props.classes;
        const created_at = dateFormat(this.props.created, "ddd, mmmm dS, yyyy, h:MM TT");
        return (
            <a target="blank" className={classes.tweet} href={"https://twitter.com/AppDirect/status/" + this.props.id}>
                <span>{created_at}</span>
                <p>
                    {this.props.content}
                </p>
            </a>
        )
    }
}

export default injectSheet(styles)(Tweet);