import React, {Component} from 'react'
import ButtonTemplate from "../../Elements/Button/buttonTemplate";
import InputTemplate from "../../Elements/Input/InputTemplate";
import SelectTemplate from "../../Elements/Select/SelectTemplate";
import { createControl } from '../../../utils/formValues/formValues'
import classes from './quizCreater.module.scss';

function createOptionControl(number,) {
    return createControl({
        id: number,
        label: `Вариант ${number}`,
        errorMessage: 'Поле не может быть пустым',
    }, {required: true})
}

function createFormControls() {
    return {
        questions: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

export default class QuizCreator extends Component {

    state = {
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls()
    }

    submitHandler = event => {
        event.preventDefault()
    }

    addQuestionHandler = () => {
        console.log('addQuestionHandler')
    }

    createQuizHandler = () => {
        console.log('createQuizHandler')
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)


        formControls[controlName] = control

        this.setState({
            formControls,
        })
    }

    selectChangeHandler = event => {
        this.setState({
            rightAnswerId: +event.target.value
        })
    }

    render() {

        const inputs = this.state.formControls;
        const { rightAnswerId } = this.state;

        return (
            <div className={classes.quizCreator}>
                <div className={classes['quizCreator__wrapper']}>
                    <h1 className="app__title">Создание теста</h1>
                    <form
                        onSubmit={this.submitHandler}
                        className={classes['quizCreator__form']}
                    >
                        {
                            Object.keys(inputs).map((controlName, index) => {
                                const input = this.state.formControls[controlName]
                                return (
                                    <React.Fragment>
                                        <InputTemplate
                                            key={index}
                                            label={input.label}
                                            type={input.type}
                                            value={input.value}
                                            valid={input.valid}
                                            touched={input.touched}
                                            errorMessage={input.errorMessage}
                                            shouldValidate={!!input.validation}
                                            onChange={event => this.onChangeHandler(event, controlName)}
                                        />
                                        { index === 0 ? <hr/> : null }
                                    </React.Fragment>
                                )
                            })
                        }
                        <SelectTemplate
                            label="Выберите правильный ответ"
                            value={rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {
                                    text: 1, value: 1,
                                },
                                {
                                    text: 2, value: 2,
                                },
                                {
                                    text: 3, value: 3,
                                },
                                {
                                    text: 4, value: 4,
                                }
                            ]}
                        />
                        <ButtonTemplate
                            buttonText="Добавить вопрос"
                            typeButton={'primary'}
                            buttonHandler={this.addQuestionHandler}
                        />
                        <ButtonTemplate
                            buttonText="Создать тест"
                            typeButton={'success'}
                            buttonHandler={this.createQuizHandler}
                        />
                    </form>
                </div>
            </div>
        )
    }
};
