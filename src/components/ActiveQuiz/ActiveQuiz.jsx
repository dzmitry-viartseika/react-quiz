import React from 'react';
import AnswerList from "../AnswerList/AnswerList";
import classes from './activeQuiz.module.scss';

const ActiveQuiz = props => {

    return (
        <div className={classes.activeQuiz}>
            <p className={classes['activeQuiz-question']}>
                    <span>
                        <strong>{ props.activeQuiz + 1 }. </strong>
                        { props.question }
                    </span>
                <small>
                    { props.activeQuiz + 1 } из { props.questionsList }
                </small>
            </p>
            <AnswerList
                answers={props.answers}
                state={props.state}
                selectedAnswerHander={props.selectedAnswerHander}
            />
        </div>
    )
}

export default ActiveQuiz;
