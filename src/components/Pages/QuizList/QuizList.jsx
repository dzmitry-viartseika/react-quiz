import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import classes from './quizList.module.scss';


export default class QuizList extends Component {

    renderMethod() {
        return [1,2,3].map((item,index) => {
            return (
                <li key={index} className={classes['quizList__item']}>
                    <NavLink to={`/quiz/${item}`}>
                      Тест  { item }
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        return (
            <div className={classes.quizList}>
                <h1 className="app__title">Список тестов</h1>
                <ul className={classes['quizList__list']}>
                    { this.renderMethod() }
                </ul>
            </div>
        )
    }
}
