import React from 'react';
import ButtonTemplate from '../Elements/buttonTemplate';
import classes from './finishedQuiz.module.scss';

const FinishedQuiz = props => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)

    return (
        <div className={classes.finishedQuiz}>
            <ul className={classes['finishedQuiz__list']}>
                {
                    props.quiz.map((quizItem, index) => {
                        const iconClasses = [
                            'fa',
                            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizItem.id]]
                        ]
                        return (
                            <li key={index}
                                className={classes['finishedQuiz__item']}
                            >
                                <strong>{ index + 1 } </strong>
                                { quizItem.question }
                                <i className={iconClasses.join(' ')}></i>
                            </li>
                        )
                    })
                }
            </ul>
            <p>
                Правильно { successCount } из {props.quiz.length}
            </p>
            <div className={classes['finishedQuiz__action']}>
                <ButtonTemplate
                    retryHandle={props.retryHandle}
                    buttonText="Повторить"
                />
            </div>
        </div>
    )
}

export default FinishedQuiz;
