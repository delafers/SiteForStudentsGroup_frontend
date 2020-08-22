import React from 'react';
import Style from './Day.module.css';
import Event from './Event/Event';

const Day = (props) => {
    return (
        <div >
            <p className={Style.Date}>{props.day} {props.month} {props.year}</p>
            {props.event.map( (event, i)  =>
                <div key={i}>
                    <Event
                        title={event[0]}
                        time={event[1]}
                        color={event[2]}
                    />
                </div>
            )}
        </div>
    );
};

export default Day;