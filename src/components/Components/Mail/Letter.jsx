import React from 'react';
import Style from './Letter.module.css';


const Mail = (props) => {
    return (
        <div>
            <div className={Style.Letter}>
                <p>От кого: {props.state.fromAddress}</p>
                <p>Тема: {props.state.theme}</p>
                <div>текст письма: {props.state.text}</div>
            </div>
        </div>
    );
};

export default Mail;