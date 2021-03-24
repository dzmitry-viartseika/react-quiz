import React from 'react';
import classes from './answerList.module.scss';
import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = props => (
    <ul className={classes.answerList}>
        <li className={classes['answerList__item']}>
            { props.answers.map((answer, index) => {
                return (
                    <AnswerItem
                        key={index}
                        answer={answer}
                        state={props.state ? props.state[answer.id] : null}
                        selectedAnswerHander={props.selectedAnswerHander}
                    />
                )
            }) }
        </li>
    </ul>
)

export default AnswerList
