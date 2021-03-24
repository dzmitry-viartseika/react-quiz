import React from 'react';
import classes from './answerItem.module.scss';
import classNames from 'classnames'

const AnswerItem = props => {

    const classesItem = [];

    if (props.state) {
        classesItem.push(classes[props.state])
    }

    const itemClass = classNames(classes.answerItem, {
        'app__error': props.state === 'error',
        'app__success': props.state === 'success'
    });

    return (
        <div
            className={itemClass}
            onClick={() => props.selectedAnswerHander(props.answer.id)}
        >
            { props.answer.text }
        </div>
    )
}

export default AnswerItem
