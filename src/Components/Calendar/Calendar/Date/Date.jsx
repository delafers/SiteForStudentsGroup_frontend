import React from 'react';
import Style from './Date.module.css';

const Date = (props) => {
    const month_name = ['', 'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    return (
        <div className={Style.Date}>
            <a href={props.prevMonth}>&#60;</a>
            <div>{month_name[props.month]}</div>
            <a href={props.nextMonth}>&#62;</a>
            <a href={props.prevYear}>&#60;</a>
            <div>{props.year}</div>
            <a href={props.nextYear}>&#62;</a>
        </div>
    );
};

export default Date;