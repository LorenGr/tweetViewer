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

    constructor(props) {
        super(props);
        this.setColumnDisplay = this.setColumnDisplay.bind(this);
    }

    handleRequestClose = () => {
        this.props.onRequestClose(this.props.selectedValue);
    };

    setColumnAmount = (value) => {
        this.props.onChangeControls({
            type: "SET_COLUMN_AMOUNT",
            amount: value
        });
    };

    setColumnDisplay(value) {
        this.setState({
            columnAmount: value
        });
    }

    state = {
        columnAmount: this.props.controls.columnAmount
    };

    render() {
        const {classes, onRequestClose, ...other} = this.props;
        const wrapperStyle = {width: 400, margin: 50};
        return (
            <Dialog onRequestClose={this.handleRequestClose} open={this.props.open}>



                <div style={wrapperStyle}>
                    <Typography type="caption">Tweets per column</Typography>
                    <Typography type="headline">{this.state.columnAmount}</Typography>
                    <Slider onChange={this.setColumnDisplay}
                            onAfterChange={this.setColumnAmount}
                            min={2}
                            max={10}
                            step={2}
                            defaultValue={this.props.controls.columnAmount}
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

        this.state = {
            open: false,
            theme: this.props.controls.theme === "dark"
        };
    }


    switchTheme = (event, checked) => {
        this.props.dispatch({
            type: "SET_THEME",
            theme: checked ? "dark" : "light"
        });
        this.setState({theme: checked});

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
                            checked={this.state.theme}
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
                                    controls={this.props.controls}
                />
            </div>
        );
    }
}

function mapEditStateToProps(state) {
    return {
        controls: state.controls
    }
}

export default connect(mapEditStateToProps)(
    injectSheet(styles)(AppControls)
);