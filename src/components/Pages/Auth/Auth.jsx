import React, {Component} from 'react';
import ButtonTemplate from "../../Elements/Button/buttonTemplate";
import InputTemplate from "../../Elements/Input/InputTemplate";
import userApi from '../../../api/userApi/api';
import Loader from "../../Elements/Loader/Loader";
import classes from './auth.module.scss';
import validateEmail  from '../../../utils/validateEmail/validateEmail'

export default class Auth extends Component {

    state = {
        isFormValid: false,
        isLoader: false,
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

    userLogin = async () => {
        console.log('userLogin');
        const user = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try {
            this.setState({
                isLoader: true
            })
            const { data } = await userApi.login(user);
            console.log('data', data)

            this.setState({
                isLoader: false,
            })
        } catch (err) {
            this.setState({
                isLoader: false
            })
            console.error(err);
        }
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

        // let isFormValid = true;
        //
        // Object.keys(formControls).forEach((name) => {
        //     console.log('formControls[name].valid', formControls[name].valid)
        //     isFormValid = formControls[name].valid && isFormValid
        // })

        formControls[controlName] = control

        this.setState({
            formControls,
            // formControls: isFormValid
        })
    }

    signUp = async () => {
        const user = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true,
        }
        try {
            this.setState({
                isLoader: true
            })
            const { data } = await userApi.signUp(user);
            console.log('data', data)

            this.setState({
                isLoader: false,
            })
        } catch (err) {
            this.setState({
                isLoader: false
            })
            console.error(err);
        }
    }

    submitHandler = event => {
        event.preventDefault();
    }

    render() {

        const inputs = this.state.formControls;
        const isFormValid = this.state.isFormValid;
        const isLoader = this.state.isLoader;

        return (
            <>
                { isLoader ? <Loader /> : null }
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
                            />
                            <ButtonTemplate
                                buttonHandler={this.signUp}
                                typeButton={'primary'}
                                buttonText="Зарегестрироваться"
                            />
                        </div>
                    </form>
                </div>
            </>
        )
    }
}
