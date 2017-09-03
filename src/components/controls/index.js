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

import MoreControlsDialog from './modal';

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
                            {this.props.controls.screenName} Twitter timeline
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