import React, {Component} from 'react';
import ButtonTemplate from "../../Elements/Button/buttonTemplate";
import InputTemplate from "../../Elements/Input/InputTemplate";
import classes from './auth.module.scss';
import validateEmail  from '../../../utils/validateEmail/validateEmail'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
               value: '',
               type: 'email',
               label: 'Email',
               errorMessage: 'Введите корректный емейл',
               valid: false,
               touched: false,
                validation: {
                   required: true,
                   email: true,
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6,
                }
            },
        }
    }

    userLogin = () => {
        console.log('userLogin')
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }

        let isValid = true;

        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = { ...this.state.formControls }
        const control = { ...formControls[controlName] }

        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[controlName] = control

        let isFormValid = true;

        Object.keys(formControls).forEach((name) => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls: isFormValid
        })
    }

    signUp = () => {
        console.log('signUp')
    }

    submitHandler = event => {
        event.preventDefault();
    }

    render() {

        const inputs = this.state.formControls;
        const isFormValid = this.state.isFormValid;

        return (
            <div className={classes.auth}>
                <form
                    className={classes['auth__form']}
                    onSubmit={this.submitHandler}
                >
                    <h1 className="app__title app__title_center app__title_margin">Авторизация</h1>
                    {
                        Object.keys(inputs).map((controlName, index) => {
                            const input = inputs[controlName]
                            return (
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
                            )
                        })
                    }
                    <div className={classes['auth__action']}>
                        <ButtonTemplate
                            buttonHandler={this.userLogin}
                            typeButton={'primary'}
                            buttonText="Войти"
                            disabled={isFormValid}
                        />
                        <ButtonTemplate
                            buttonHandler={this.signUp}
                            typeButton={'primary'}
                            buttonText="Зарегестрироваться"
                            disabled={isFormValid}
                        />
                    </div>
                </form>
            </div>
        )
    }
}
