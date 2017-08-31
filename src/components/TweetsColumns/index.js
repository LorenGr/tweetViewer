import React from 'react';
import {SortableContainer, SortableElement, SortableHandle, arrayMove} from 'react-sortable-hoc';
import injectSheet from 'react-jss';
import styles from './styles';
import TweetsColumn from '../TweetsColumn';

const DragHandle = SortableHandle((props) =>
    <span>= COLUMN </span>
);

const SortableItem = SortableElement((props) =>
    <li className={props.className}>
        <DragHandle/>
        {props.value}
        <TweetsColumn value={props.value} tweets={props.tweets}/>
    </li>
);

class TweetsColumnsRepeater extends React.Component {
    render() {
        let {items, classes, tweets} = this.props;
        return (
            <ul>
                {items.map((value, index) => (
                    <SortableItem tweets={tweets[value]}
                                  className={classes.column}
                                  key={`item-${value}`}
                                  index={index}
                                  value={value}/>
                ))}
            </ul>
        )
    }
}

const SortableList = SortableContainer((props) => <TweetsColumnsRepeater {...props}></TweetsColumnsRepeater>);

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
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd} useDragHandle={true}
                             axis='x' {...this.props} />;
    }
}

export default injectSheet(styles)(TweetsColumns);