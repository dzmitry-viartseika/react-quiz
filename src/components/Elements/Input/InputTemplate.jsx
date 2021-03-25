import React from "react";

function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched
}

const InputTemplate = props => {

    const inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`

    const classInput = []

    if (isInvalid(props)) {
        classInput.push('invalid')
    }

    return (
        <div className="app-field">
            <label className="app-field__label" htmlFor={htmlFor}>{ props.label }</label>
            <input
                type={inputType}
                className="app-field__input"
                value={props.value}
                onChange={props.onChange}
            />
            {
                isInvalid(props) ? <span className="app-field__error">
                    { props.errorMessage ? props.errorMessage : 'Поле обязательно для заполнения' }
                </span> : null
            }
        </div>
    )
};

export default InputTemplate;
