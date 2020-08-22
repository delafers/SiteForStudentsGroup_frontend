import React from 'react';
import Style from './Elem.module.css';

const Elem = (props) => {
    return (
        <div className={Style.Elem}>
            <div className={Style.Button}
                    onClick={() => props.DayUpdate(props.year, props.month, props.day.day)}>
                <div className={Style.Number}>{props.day.day}</div>
                <div className={Style.ElemColors}>
                    {props.day.colors.map( (color, i)  =>
                        <div key={color+i} className={Style.ElemColor} style={{
                            backgroundColor: color,
                            boxShadow: '0 0 5px' + color,
                        }}> </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Elem;