import React from 'react';
import Style from './Info.module.css';

const Info = (props) => {
    return (
        <div className={Style.Info}>
            События:
            {props.info.map( (info)  =>
                <div className={Style.InfoElem} key={info.topic}>
                    <div className={Style.InfoColor} style={{
                        backgroundColor: info.color,
                        boxShadow: '0 0 5px' + info.color,
                    }}> </div>
                    <div>{info.topic}</div>
                </div>
            )}
        </div>
    );
};

export default Info;