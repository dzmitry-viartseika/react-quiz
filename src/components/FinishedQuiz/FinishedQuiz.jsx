import React from 'react';
import { Link } from 'react-router-dom';
import ButtonTemplate from '../Elements/Button/buttonTemplate';
import classes from './finishedQuiz.module.scss';
import PropTypes from 'prop-types';

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
                    buttonHandler={props.retryHandle}
                    buttonText="Повторить"
                    typeButton={'primary'}
                />
                <Link to={'/'}>
                    <ButtonTemplate
                        typeButton={'success'}
                        buttonText="Перейти в список тестов"
                    />
                </Link>
            </div>
        </div>
    )
}

export default FinishedQuiz;

ButtonTemplate.propTypes = {
    retryHandle: PropTypes.func,
    buttonText: PropTypes.string,
}
