import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import Loader from "../../Elements/Loader/Loader";
import classes from './quizList.module.scss';
import {connect} from 'react-redux';
import { fetchQuizes } from '../../../redux/actions/actions'

class QuizList extends Component {



    componentDidMount() {
        console.log('props', this.props)
        this.props.fetchQuizes()
    }


    render() {
        return (
            <>
                {
                    this.props.loading ? <Loader /> : null
                }
                <div className={classes.quizList}>
                    <h1 className="app__title">Список тестов</h1>
                    <ul className="app__list">
                        {this.props.quizList.map((item, index) => {
                            return (
                                <li key={index} className={classes['quizList__item']}>
                                    <NavLink to={`/quiz/${item.id}`}>
                                        Тест {item.name}
                                    </NavLink>
                                </li>
                            )
                        })
                        }
                    </ul>
                </div>
            </>
        )
    }
}

function mapStateToProps(state) {
    return {
        quizList: state.quiz.quizList,
        loading: state.quiz.isLoader
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
