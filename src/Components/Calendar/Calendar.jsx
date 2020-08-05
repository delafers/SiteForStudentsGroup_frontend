import React, { Component } from 'react';
import Style from './Calendar.module.css';
import Day from './Day';
import DaysService from '../Services/DaysService.js';

const daysService = new DaysService();


class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            year: 0,
            month: 0,
            nextPage: '',
            prevPage: '',
        };
        this.getCalendar = this.getCalendar.bind(this);
    }

    componentDidMount() {
        const { match: { params } } =  this.props;
        let self = this;
        const searchString = new URLSearchParams(this.props.location.search);
        let year = searchString.get('year');
        let month = searchString.get('month');
        let days_in_month = 33 - new Date(year, month-1, 33).getDate();
        let date = new Date();
        if (!year) {year = date.getFullYear()};
        if (!month) {month = date.getMonth() + 1};
        let days = [];
        for (let i = 0; i < days_in_month; i++) {days[i] = i + 1}
        daysService.getDays(year, month).then(function (result) {
                result.data.map( day => (
                days[day.id - 1] = day
            ))
            self.setState({
                days: result.data,
                year: year,
                month: month,
                days_in_month: days_in_month,
                nextPage: '/calendar/?year=' + year + '&month=' + (+month + 1),
                prevPage: '/calendar/?year=' + year + '&month=' + (+month - 1),
            })
        });
        console.log(this);
    }

    getCalendar() {
        let table = document.createElement('table');
        let tr = document.createElement('tr');
        //for (let i = 1; i <= this.state.days_in_month; i++) {

            //tr.push(<td>'i'</td>);
            //if (8 % 7 == 0) {tr.innerHTML = '<td>' + 'i' + '</td>';}
        //}
        table.appendChild(tr)
        return table;
        };

    render() {
        return (
            <div>
                {console.log(this.state)}
                <a href={this.state.prevPage}>Previous</a>
                <a href={this.state.nextPage}>Next</a>
                <Day/>
            </div>
        )
    }
}

export default Calendar;