import React from 'react';
import Style from './Day.module.css';

const Day = (props) => {

    if (props.state) {
        return (
            <div className={Style.Day}>
                <h3>{props.state}</h3>
                Никаких экзаменов, только программирование

                {/*<button  onClick = {()=>  this.handleDelete(day.id) }>Delete</button>*/}
            </div>
        );
    }
    else {
        return(
            <div>loading</div>
        )
    }
};

export default Day;