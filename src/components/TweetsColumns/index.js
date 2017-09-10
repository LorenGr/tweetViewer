import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import TweetsColumn from '../TweetsColumn';
import ColumnHandle from './handle';
import injectSheet from 'react-jss';
import styles from './styles';

import Grid from 'material-ui/Grid';

const DragHandle = SortableHandle(ColumnHandle);
const SortableItem = SortableElement((props) =>
    <div className={props.className}>
        <TweetsColumn handle={DragHandle} value={props.value}
                      tweets={props.tweets}/>
    </div>
);

const SortableList = SortableContainer(({items, classes, tweets}) =>
    <Grid container className={classes.container} spacing={16}>
        {items.map((value, index) => (
            <SortableItem tweets={tweets[value]}
                          className={classes.column}
                          key={`item-${value}`}
                          index={index}
                          value={value}/>
        ))}
    </Grid>
);

class TweetsColumns extends React.Component {

    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };

    constructor(props) {
        super(props);
        this.state = {
            items: Array.apply(null, {length: this.props.columnCount}).map(Number.call, Number)
        };
    }

    render() {
        return <SortableList items={this.state.items}
                             onSortEnd={this.onSortEnd}
                             tweets={this.props.tweets}
                             useDragHandle={true}
                             axis='x' {...this.props} />;
    }
}

export default injectSheet(styles)(TweetsColumns);