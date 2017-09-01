import React from 'react';
import TweetsFetcher from '../TweetsFetcher';
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import AppControls from './controls';
import {connect} from 'react-redux';

const themes ={
    dark : createMuiTheme({
        palette: {
            type: 'dark'
        }
    }),
    light : createMuiTheme({
        palette: {
            type: 'light'
        }
    })
};

class TweetsViewer extends React.Component {

    constructor(props) {
        super(props);
        this.getActiveTheme = this.getActiveTheme.bind(this);
    }

    getActiveTheme() {
        return themes[this.props.theme];
    }

    render(props) {
        return (
            <MuiThemeProvider theme={this.getActiveTheme()}>
                <section>
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