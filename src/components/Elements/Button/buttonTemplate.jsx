import React from 'react';

const ButtonTemplate = props => {

    const btnClasses = [
        'app-button'
    ]

        if (props.typeButton === 'primary') {
            btnClasses.push('app-button_primary')
        } else {
            btnClasses.push('app-button_success')
        }

    return (
        <button
            className={btnClasses.join(' ')}
            onClick={props.buttonHandler}
        >
            { props.buttonText }
        </button>
    )
}


export default ButtonTemplate;
