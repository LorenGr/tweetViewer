import React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

const SortableItem = SortableElement(({value}) =>
    <li>{value}</li>
);

const SortableList = SortableContainer(({items}) => {
    return (
        <ul>
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value} />
            ))}
        </ul>
    );
});


export default class TweetsColumns extends React.Component {
    state = {
        items: ['Column1','Column2','Column3'],
    };
    onSortEnd = ({oldIndex, newIndex}) => {
        this.setState({
            items: arrayMove(this.state.items, oldIndex, newIndex),
        });
    };
    render() {
        return <SortableList items={this.state.items} onSortEnd={this.onSortEnd}/>;
    }
}