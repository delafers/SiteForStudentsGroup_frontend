import React from 'react';
import Style from './Table.module.css';
import Elem from './Elem/Elem';

const Table = (props) => {
    const week = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    return (
        <div className={Style.Table}>
            {week.map( (day, i)  =>
                <div className={i === 0 ? Style.WeekElem1 : Style.WeekElem} key={day} ><div>{day}</div></div>
            )}
            {props.days.map( (day, i)  =>
                <Elem
                    key={i}
                    DayUpdate={props.DayUpdate}
                    year={props.year}
                    month={props.month}
                    day={day}
                />
            )}
        </div>
    );
};

export default Table;
