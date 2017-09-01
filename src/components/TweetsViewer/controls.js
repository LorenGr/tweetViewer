import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Switch from 'material-ui/Switch';
import styles from './styles';
import {connect} from 'react-redux';
import injectSheet from 'react-jss';

//Slider
import Slider, {Range} from 'rc-slider';

import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui-icons/MoreVert';
import Dialog from 'material-ui/Dialog';

class MoreControlsDialog extends React.Component {

    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };

    setColumnAmount = (value) => {
        this.props.onChangeControls({
            type: "SET_COLUMN_AMOUNT",
            amount: value
        });
    };

    render() {
        const {classes, onRequestClose, ...other} = this.props;
        const wrapperStyle = {width: 400, margin: 50};
        const value = 20;
        return (
            <Dialog onRequestClose={this.handleRequestClose} {...other}>

                <div style={wrapperStyle}>
                    <Slider onAfterChange={this.setColumnAmount}
                            min={5}
                            max={30}
                            step={5}
                            defaultValue={30}
                    />
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
                                    onChangeControls={this.props.dispatch}
                                    onRequestClose={this.handleRequestClose}
                />
            </div>
        );
    }
}

export default connect()(
    injectSheet(styles)(AppControls)
);