import React, { Component } from 'react';
import Style from './CalendarMenu.module.css';
import Calendar from "./Calendar";
import Day from "./Day";
import  DaysService  from  '../../../Services/DaysService.js';

const  daysService  =  new  DaysService();


class CalendarMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
        };
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        daysService.getDays().then(function (result) {
            self.setState({ days:  result.data})
        });
    }

    handleDelete(id) {
        let self = this;
        daysService.deleteDay(id).then(()=>{
            let  newArr = self.state.days.filter(function(obj) {
                return obj.id !== id;
            });
            self.setState({days:  newArr})
        });
    }

    render() {
        return (
            <div>
                <Calendar state={this.state.days}/>
            </div>
        );
    }
}
/*
const CalendarMenu = (props) => {
    return (
        <div className={Style.CalendarMenu}>
            <Calendar/>
            <Day/>
        </div>
    );
};
*/
export default CalendarMenu;