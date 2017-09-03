import React from 'react';

//Slider
import Slider, {Range} from 'rc-slider';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';

const today = new Date().toISOString().substr(0, 10);

export default class MoreControlsDialog extends React.Component {

    constructor(props) {
        super(props);
        this.setColumnDisplay = this.setColumnDisplay.bind(this);
        this.setTweetsStartDate = this.setTweetsStartDate.bind(this);
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

    setTweetsStartDate(field) {
        this.props.onChangeControls({
            type: "SET_TWEETS_START_DATE",
            date : field.target.value
        });
    }

    getTweetsStartDate() {
        return this.props.controls.startDate || today;
    }

    state = {
        columnAmount: this.props.controls.columnAmount
    };

    render() {
        const {onRequestClose} = this.props;
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
                    <TextField
                        id="date"
                        label="Tweets starting from date"
                        type="date"
                        defaultValue={this.getTweetsStartDate()}
                        max={today}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{
                            shrink: true
                        }}
                        inputProps={{
                            max : today
                        }}
                        onChange={this.setTweetsStartDate}
                    />
                </div>
            </Dialog>
        );
    }
}