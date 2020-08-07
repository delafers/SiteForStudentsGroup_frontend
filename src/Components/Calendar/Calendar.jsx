import React, { Component } from 'react';
import Style from './Calendar.module.css';
import Day from './Day';
import DaysService from '../Services/DaysService.js';

const daysService = new DaysService();


class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            week: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
            day: 0,
            day_data: null,
            days: [],
            year: 0,
            month: 0,
            nextPage: '',
            prevPage: '',

        };
        this.DayUpdate = this.DayUpdate.bind(this);
    }

    componentDidMount() {
        let self = this;
        const searchString = new URLSearchParams(this.props.location.search);
        let year = searchString.get('year');
        let month = searchString.get('month');
        const date = new Date();   // нынешняя дата
        const day = date.getDate();
        this.DayUpdate(date.getDate());
        let days = [];

        // если год и месяц записаны в параметрах url, они передаются объекту date
        if (!year) {year = date.getFullYear()}
        else {date.setFullYear(+year)}
        if (!month) {month = date.getMonth() + 1}
        else {date.setMonth(+month-1)}

        date.setDate(33);
        const days_in_month = 33 - date.getDate();

        date.setFullYear(Number(year), (Number(month) - 1), 1);
        const first_day = date.getDay();    // номер первого дня, где вс это 0
        const days_before_first_day = first_day === 0 ? 6 : first_day - 1;
        const days_total = days_before_first_day + days_in_month + 7 - (days_in_month + days_before_first_day) % 7;

        for (let i = 0; i < days_total; i++) {
           if (i >= days_before_first_day && i < days_before_first_day + days_in_month) {
               days[i] = {
                   day: i + 1 - days_before_first_day,
               }
           }
           else { days[i] = {
               day: '',
           }}
        }

        date.setFullYear(+year);
        date.setMonth(+month-1);
        const prev_month = date.getMonth();
        const prev_year = date.getFullYear();
        date.setFullYear(+year);
        date.setMonth(+month+1);
        const next_month = date.getMonth();
        const next_year = date.getFullYear();

        daysService.getDays(year, (Number(month) + 1)).then(function (result) {
                result.data.map( day => (
                    days[day.date.slice(8,10) - 1 + days_before_first_day] = day
                ));
            self.setState({
                day: day,
                days: days,
                year: year,
                month: month,
                nextMonth: '/calendar/?year=' + next_year + '&month=' + next_month,
                prevMonth: '/calendar/?year=' + prev_year + '&month=' + prev_month,
                nextYear: '/calendar/?year=' + (Number(year) + 1) + '&month=' + month,
                prevYear: '/calendar/?year=' + (Number(year) - 1) + '&month=' + month,
            })
        });
    }

    DayUpdate(day) {
        if (day) {
            let self = this;
            daysService.getDay(day).then(function (result) {
                self.setState({day_data: result.data})
            });
            console.log(this.state.day)
        }
    }


    render() {
        if (this.state.day_data) {
            return (
                <div className={Style.Calendar}>
                    {console.log(this)}
                    <div className={Style.Table}>
                        {this.state.week.map( (day)  =>
                            <div className={Style.Elem} key={day} >{day}</div>
                        )}
                        {this.state.days.map( (day, i)  =>
                            <button className={Style.Elem} key={i} onClick={() => this.DayUpdate(day.day)}>
                                {day.day}
                            </button>
                        )}
                    </div>
                    <Day day={this.state.day_data.date}/>
                    <a href={this.state.prevYear}>Previous year</a>
                    <a href={this.state.prevMonth}>Previous month</a>
                    <a href={this.state.nextMonth}>Next month</a>
                    <a href={this.state.nextYear}>Next year</a>

                </div>
            )
        }
        else {return(<p>loading...</p>)}
    }
}

export default Calendar;