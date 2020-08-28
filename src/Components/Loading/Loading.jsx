import React from 'react';
import Style from './Loading.module.css';

const Loading = (props) => {
    return (
        <div className={Style.overlay_loader}>
            <div className={Style.loader}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
};

export default Loading;