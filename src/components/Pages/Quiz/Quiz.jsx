import React, { Component } from 'react';
import classes from './quiz.module.scss';
import ActiveQuiz from '../../ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../FinishedQuiz/FinishedQuiz'
import Loader from "../../Elements/Loader/Loader";
import PropTypes from 'prop-types';
import classNames from "classnames";
import { fetchQuizById, quizAnswerClick, retryHandle } from "../../../redux/actions/actions";
import { connect } from "react-redux";

class Quiz extends Component {

    componentDidMount() {
        const quizId = this.props.match.params.id;
        console.log('quizId', quizId)
        this.props.fetchQuizById(quizId)
    }

    render() {
        const itemClass = classNames(classes['quiz__title'], 'app__title');
        console.log('this.props.quizItem', this.props.quizItem)
        const answers = this.props.quizItem[this.props.activeQuiz].answers;
        const question = this.props.quizItem[this.props.activeQuiz].question;
        const questionsList = this.props.quizList.length;

        return (
            <>
                {
                    this.props.isLoader || !this.props.quizItem
                        ? <Loader/>
                        : <div className={classes.quiz}>
                            <div className={classes['quiz__wrapper']}>
                                <h1 className={itemClass}>Ответьте на все вопросы</h1>
                                {
                                    !this.props.isFinished
                                        ? <FinishedQuiz
                                            results={this.props.results}
                                            quiz={this.props.quizItem}
                                        />
                                        : <ActiveQuiz
                                            answers={answers}
                                            question={question}
                                            questionsList={questionsList}
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
        fetchQuizById: id => dispatch(fetchQuizById(id)),
        quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
        retryHandle: () => dispatch(retryHandle())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)

FinishedQuiz.propTypes = {
    quiz: PropTypes.array,
}

ActiveQuiz.propTypes = {
    selectedAnswerHander: PropTypes.func,
    answers: PropTypes.array,
    questionsList: PropTypes.number,
    question: PropTypes.string,
}
