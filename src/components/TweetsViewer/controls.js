import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import styles from './styles';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';

class AppControls extends React.Component {

    constructor(props) {
        super(props);
        this.switchTheme = this.switchTheme.bind(this);
    }

    switchTheme = (event, checked) => {
        this.props.dispatch({
            type: "SET_THEME",
            theme: checked ? "dark" : "light"
        })

    };

    render() {
        const classes = this.props.classes;
        return (
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography type="title" color="inherit" className={classes.flex}>
                        Twitter Viewer
                    </Typography>

                    <Switch
                        onChange={this.switchTheme}
                        aria-label="checkedA"
                    />

                </Toolbar>
            </AppBar>
        );
    }
}

export default connect()(
    injectSheet(styles)(AppControls)
);