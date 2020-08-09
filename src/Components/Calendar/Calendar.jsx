import React, { Component } from 'react';
import Style from './Calendar.module.css';
import Day from './Day';
import DaysService from '../Services/DaysService.js';

const daysService = new DaysService();


class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            week: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
            month_name: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            day: 0,
            day_data: null,
            days: [],
            year: 0,
            month: 0,
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
            let error = true;
            daysService.getDay(day).then(function (result) {
                console.log(result);
                error = false;
                let events = [];
                result.data.event.map((event, i) => {
                    events[i] = [event.description, event.time]
                });
                self.setState({
                    day_data: {
                        id: result.data.id,
                        date: Number(result.data.date.slice(8, 10)),
                        topic: result.data.topic,
                        event: events,
                    }
                })

            });
            if (error) {
                self.setState({day_data: {
                    date: day,
                    event: ["В этот день не будет важных событий"]}});
            }
        }
    }


    render() {
        if (this.state.day_data) {
            return (
                <div className={Style.CalendarMenu}>
                    <div className={Style.Calendar}>
                        <div className={Style.Date}>
                            <a href={this.state.prevMonth}>&#60;</a>
                            <div>{this.state.month_name[this.state.month-1]}</div>
                            <a href={this.state.nextMonth}>&#62;</a>
                            <a href={this.state.prevYear}>&#60;</a>
                            <div>{this.state.year}</div>
                            <a href={this.state.nextYear}>&#62;</a>
                        </div>
                        <div className={Style.Table}>
                            {this.state.week.map( (day)  =>
                                <div className={Style.WeekElem} key={day} >{day}</div>
                            )}
                            {this.state.days.map( (day, i)  =>
                                <div className={Style.Elem}>
                                    <button className={Style.Button} key={i} onClick={() => this.DayUpdate(day.day)}>
                                        {day.day}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className={Style.Day}>
                        <Day year={this.state.year} month={this.state.month_name[this.state.month]}
                             day={this.state.day_data.date} event={this.state.day_data.event}/>
                        {console.log(this)}
                    </div>
                </div>
            )
        }
        else {return(<p>loading...</p>)}
    }
}

export default Calendar;