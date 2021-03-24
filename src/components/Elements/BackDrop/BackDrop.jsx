import React from 'react';
import classes from './backDrop.module.scss';

const BackDrop = props => {

        return (
            <div
                className={classes.backDrop}
                onClick={props.onCloseHandler}
            ></div>
        )
}

export default BackDrop;
