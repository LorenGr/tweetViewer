import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import styles from './styles';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Dialog, {DialogTitle} from 'material-ui/Dialog';

class MoreControlsDialog extends React.Component {

    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };

    render() {
        const {classes, onRequestClose, ...other} = this.props;
        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other}>
                <div>
                    test
                </div>
            </Dialog>
        );
    }
}

class AppControls extends React.Component {

    constructor(props) {
        super(props);
        this.switchTheme = this.switchTheme.bind(this);
    }

    state = {
        open: false
    };

    switchTheme = (event, checked) => {
        this.props.dispatch({
            type: "SET_THEME",
            theme: checked ? "dark" : "light"
        })

    };

    handleRequestClose = value => {
        this.setState({open: false});
    };

    render() {
        const classes = this.props.classes;
        return (
            <div>
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Typography type="title" color="inherit" className={classes.flex}>
                            Twitter Viewer
                        </Typography>

                        <Switch
                            onChange={this.switchTheme}
                            aria-label="checkedA"
                        />

                        <IconButton
                            aria-label="More"
                            aria-haspopup="true"
                            onClick={() => this.setState({open: true})}
                        >
                            <MoreVertIcon/>
                        </IconButton>

                    </Toolbar>
                </AppBar>
                <MoreControlsDialog open={this.state.open}
                                    onRequestClose={this.handleRequestClose}/>
            </div>
        );
    }
}

export default connect()(
    injectSheet(styles)(AppControls)
);