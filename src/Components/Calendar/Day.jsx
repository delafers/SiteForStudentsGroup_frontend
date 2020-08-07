import React from 'react';
import Style from './Day.module.css';
import DaysService from '../Services/DaysService.js';


const Day = (props) => {
    return (
        <div>
            {console.log(props)}
            {props.day}
        </div>
    );
};

export default Day;