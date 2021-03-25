import React, { Component } from 'react';
import classes from './quiz.module.scss';
import ActiveQuiz from '../../ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../FinishedQuiz/FinishedQuiz'
import PropTypes from 'prop-types';
import classNames from "classnames";

export default class Quiz extends Component {

    state = {
        activeQuiz: 0,
        results: {},
        isFinished: true,
        answerState: null,
        quiz: [
            {
                id: 1,
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers: [
                    {
                        id: 1,
                        text: 'Черный',
                    },
                    {
                        id: 2,
                        text: 'Синий',
                    },
                    {
                        id: 3,
                        text: 'Красный',
                    },
                    {
                        id: 4,
                        text: 'Зеленый',
                    },
                ]
            },
            {
                id: 2,
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswerId: 4,
                answers: [
                    {
                        id: 1,
                        text: '1700',
                    },
                    {
                        id: 2,
                        text: '1701',
                    },
                    {
                        id: 3,
                        text: '1702',
                    },
                    {
                        id: 4,
                        text: '1073',
                    },
                ]
            }
        ]
    }

    isQuizMethod() {
        return this.state.activeQuiz + 1 === this.state.quiz.length;
    }

    retryHandle = () => {
        this.setState({
            activeQuiz: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    componentDidMount() {
        console.log('quizId', this.props.match.params.id)
    }

    selectedAnswerHander = answerId => {
        const question = this.state.quiz[this.state.activeQuiz];
        const results = this.state.results;

        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }

        if (question.rightAnswerId === answerId) {
            if (!results[answerId]) {
                results[answerId] = 'success';
            }
            this.setState({
                answerState: {
                    [answerId]: 'success'
                },
                results,
            })
            const timeOut = window.setTimeout(() => {
                if (this.isQuizMethod()) {
                    this.setState({
                        isFinished: true
                    })
                } else {
                    this.setState({
                        activeQuiz: this.state.activeQuiz + 1,
                        answerState: null,
                    })
                }
                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[answerId] = 'error'
            this.setState({
                answerState: {
                    [answerId]: 'error'
                },
                results,
            })
        }
    }

    render() {

        const answers = this.state.quiz[this.state.activeQuiz].answers;
        const question = this.state.quiz[this.state.activeQuiz].question;
        const questionsList = this.state.quiz.length;
        const activeQuiz = this.state.activeQuiz;
        const state = this.state.answerState;
        const isFinished = this.state.isFinished;
        const results = this.state.results;
        const quiz = this.state.quiz;

        const itemClass = classNames(classes['quiz__title'], 'app__title');

        return (
            <div className={classes.quiz}>
                <div className={classes['quiz__wrapper']}>
                    <h1 className={itemClass}>Ответьте на все вопросы</h1>
                    {
                        isFinished
                            ? <FinishedQuiz
                                results={results}
                                quiz={quiz}
                                retryHandle={this.retryHandle}
                            />
                            : <ActiveQuiz
                                answers={answers}
                                question={question}
                                questionsList={questionsList}
                                activeQuiz={activeQuiz}
                                state={state}
                                selectedAnswerHander={this.selectedAnswerHander}
                                />
                    }
                </div>
            </div>
        )
    }
}

FinishedQuiz.propTypes = {
    quiz: PropTypes.array,
    retryHandle: PropTypes.func,
}

ActiveQuiz.propTypes = {
    selectedAnswerHander: PropTypes.func,
    answers: PropTypes.array,
    questionsList: PropTypes.number,
    question: PropTypes.string,
}
