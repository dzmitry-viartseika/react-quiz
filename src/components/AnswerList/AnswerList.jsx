import React from 'react';
import classes from './answerList.module.scss';
import AnswerItem from "./AnswerItem/AnswerItem";
import PropTypes from 'prop-types';
import ButtonTemplate from "../Elements/buttonTemplate";

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

AnswerItem.propTypes = {
    selectedAnswerHander: PropTypes.func
}
