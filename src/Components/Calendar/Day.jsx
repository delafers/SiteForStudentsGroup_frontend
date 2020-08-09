import React from 'react';
import Style from './Day.module.css';


const Day = (props) => {
    return (
        <div>
            {console.log(props)}
            <p className={Style.Date}>{props.year}</p>
            <p className={Style.Date}>{props.month}</p>
            <p className={Style.Date}>{props.day}</p>
            {props.event.map( (event, i)  =>
                <div key={i}>
                    <p>{event[1]}</p>
                    <p>{event[0]}</p></div>
            )}

        </div>
    );
};

export default Day;