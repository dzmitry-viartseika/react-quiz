import React from 'react';
import classes from './menuToggle.module.scss';

const MenuToggle = props => {

    const classIcon = [
        classes.menuToggle,
        'fa',
    ];

    if (props.isOpen) {
        classIcon.push('fa-times')
        classIcon.push(classes['menuToggle_open'])
    } else {
        classIcon.push('fa-bars')
    }

    return (
        <i
            className={classIcon.join(' ')}
            onClick={props.onToggle}
        ></i>
    )
}

export default MenuToggle;
