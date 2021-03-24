import React from 'react';

const ButtonTemplate = props => {

    return (
        <button className="app-button" onClick={props.retryHandle}>
            { props.buttonText }
        </button>
    )
}


export default ButtonTemplate;
