import React from 'react';
import TweetsFetcher from '../TweetsFetcher';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import AppControls from '../controls';
import {connect} from 'react-redux';

const themes = {
    dark: createMuiTheme({
        palette: {
            type: 'dark'
        }
    }),
    light: createMuiTheme({
        palette: {
            type: 'light'
        }
    })
};

class TweetsViewer extends React.Component {

    constructor(props) {
        super(props);
        this.getActiveTheme = this.getActiveTheme.bind(this);
        this.getPrimaryColor = this.getPrimaryColor.bind(this);
    }

    getActiveTheme() {
        return themes[this.props.theme];
    }

    getPrimaryColor() {
        return themes[this.props.theme].palette.background.appBar;
    }

    render(props) {

        const rootStyle = {
            backgroundColor: this.getPrimaryColor(),
            height: '100%',
            position: 'absolute'
        };

        return (
            <MuiThemeProvider theme={this.getActiveTheme()}>
                <section style={rootStyle}>
                    <header>
                        <AppControls/>
                    </header>
                    <content>
                        <TweetsFetcher/>
                    </content>
                </section>
            </MuiThemeProvider>
        );
    }
}

function mapEditStateToProps(state) {
    return {
        theme: state.controls.theme
    }
}

export default connect(mapEditStateToProps)(TweetsViewer);