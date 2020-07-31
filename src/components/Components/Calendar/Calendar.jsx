import React from 'react';
import Style from './Calendar.module.css';
import Day from './Day.jsx'
/*Остановился на том, что мне следует заменить функцию на объект, т.к. найти способ ререндерига компонентый day для функции я не смог*/
const Calendar = (props) => {
    props.state.displayed_day = new Date().getDate();
    const display_day = (day) => {
        props.state.displayed_day = day;
        console.log(props.state.displayed_day);
        return props.state.displayed_day

    };

    if (props.state[0]) {
        return (
            <div className={Style.Calendar}>
                <p>{props.state[0].year}.{props.state[0].month}</p>
                <div>{props.state.month}</div>
                {props.state.map(day =>
                    <button key={day.day} onClick={() => display_day(day.day)}>
                        <p>{day.day}</p>
                        <p>{day.topic}</p>
                        <div>{day.description}</div>
                    </button>
                )}
                <Day key={'kol'} state={display_day}/>
            </div>
        );
    }
    else {
        return(
            <div>loading</div>
        )
    }
};

export default Calendar;