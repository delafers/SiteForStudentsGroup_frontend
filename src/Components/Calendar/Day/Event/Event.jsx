import React from 'react';
import Style from './Event.module.css';

const Event = (props) => {
    //color = event ? [event, '0 0 5px' + event] : ['unset', 'unset'];

    return (
        <div className={Style.Event}>
            <div className={Style.Color} style={{
                backgroundColor: props.color,
                boxShadow: props.color,
            }}> </div>
            <div className={Style.Time}>{props.time}</div>
            <div className={Style.Title}>{props.title}</div>
        </div>
    );
};

export default Event;