import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import Loader from "../../Elements/Loader/Loader";
import quizApi from '../../../api/quizApi/api';
import classes from './quizList.module.scss';

export default class QuizList extends Component {

    state = {
        isLoader: false,
        quizList: []
    }

    async componentDidMount() {
        try {
            this.setState({
                isLoader: true
            })
            const { data } = await quizApi.getQuizList();
            const quizList = []
            Object.keys(data).forEach((item, index) => {
                quizList.push({
                    id: item,
                    name: `№${index + 1}`
                })
            })
            this.setState({
                isLoader: false,
                quizList,
            })
        } catch (err) {
            this.setState({
                isLoader: false
            })
            console.error(err);
        }
    }

    render() {
        const isLoader = this.state.isLoader;
        const quizList = this.state.quizList;
        return (
            <>
                {
                    isLoader ? <Loader /> : null
                }
                <div className={classes.quizList}>
                    <h1 className="app__title">Список тестов</h1>
                    <ul className="app__list">
                        {quizList.map((item, index) => {
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
