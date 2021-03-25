import React from 'react';

const SelectTemplate = props => {

    const htmlFor = `${props.label}-${Math.random()}`

    return (
        <div className="app-field">
            <label className="app-field__label" htmlFor={htmlFor}>
                {props.label}
            </label>
            <select
                className="app-field__select"
                id={htmlFor}
                value={props.value}
                onChange={props.onChange}
            >
                {
                    props.options.map((option,index) => {
                        return (
                            <option
                                key={index}
                                value={option.value}>
                                {option.text}
                            </option>
                        )
                    })
                }
            </select>
        </div>
    )
}

export default SelectTemplate;
