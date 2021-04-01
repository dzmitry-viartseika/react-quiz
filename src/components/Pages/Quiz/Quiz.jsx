import React, { Component } from 'react';
import classes from './quiz.module.scss';
import ActiveQuiz from '../../ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../FinishedQuiz/FinishedQuiz'
import Loader from "../../Elements/Loader/Loader";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { fetchQuizById } from "../../../redux/actions/actions";
import { connect } from "react-redux";

class Quiz extends Component {

    componentDidMount() {
        const quizId = this.props.match.params.id
        console.log('quizId', quizId)
        this.props.fetchQuizById(quizId)
    }

    isQuizMethod() {
        return this.props.activeQuiz + 1 === this.props.quiz.length;
    }

    retryHandle = () => {
        this.setState({
            activeQuiz: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    }

    selectedAnswerHander = answerId => {
        const question = this.props.quiz[this.props.activeQuiz];
        const results = this.props.results;

        if (this.props.answerState) {
            const key = Object.keys(this.props.answerState)[0];
            if (this.props.answerState[key] === 'success') {
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

        const itemClass = classNames(classes['quiz__title'], 'app__title');

        return (
            <>
                {
                    this.props.isLoader || !this.props.quizItem
                        ? <Loader/>
                        : <div className={classes.quiz}>
                            <div className={classes['quiz__wrapper']}>
                                <h1 className={itemClass}>Ответьте на все вопросы</h1>
                                {
                                    this.props.isFinished
                                        ? <FinishedQuiz
                                            results={this.props.results}
                                            quiz={this.props.quizItem}
                                            retryHandle={this.retryHandle}
                                        />
                                        : <ActiveQuiz
                                            answers={this.props.answers}
                                            question={this.props.question}
                                            questionsList={this.props.questionsList}
                                            activeQuiz={this.props.activeQuiz}
                                            state={this.props.answerState}
                                            selectedAnswerHander={this.selectedAnswerHander}
                                        />
                                }
                            </div>
                        </div>
                }
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizList: state.quiz.quizList,
        loading: state.quiz.isLoader,
        activeQuiz: state.quiz.activeQuiz,
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        answerState: state.quiz.answerState,
        quizItem: state.quiz.quizItem
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: id => dispatch(fetchQuizById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

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
