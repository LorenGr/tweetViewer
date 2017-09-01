import React from 'react';
import IconButton from 'material-ui/IconButton';
import styles from './styles';
import injectSheet from 'react-jss';

const ColumnHandle = (props) => (
    <div className={props.classes.handle}>
        <IconButton aria-label="Drag Column to reorder">
            &#9776;
        </IconButton>
    </div>
);

export default injectSheet(styles)(ColumnHandle);

