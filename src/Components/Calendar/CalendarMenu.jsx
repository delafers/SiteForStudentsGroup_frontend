import React, { Component } from 'react';
import {Link, Redirect, withRouter} from 'react-router-dom'
import Style from './CalendarMenu.module.css';
import Day from './Day/Day';
import Table from './Calendar/Table/Table';
import Info from './Info/Info';
import DateBlock from './Calendar/Date/Date';
import Loading from '../Loading/Loading'
import DaysService from '../Services/DaysService';
import InfoService from '../Services/InfoService';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";

const daysService = new DaysService();
const infoService = new InfoService();


class CalendarMenu extends Component {

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
            month: undefined,
            info: [],
            CalendarStyle: Style.CalendarMenu,
            DayStyle: Style.Day,
            days_in_month: 0,
        };
        this.DayUpdate = this.DayUpdate.bind(this);
    }

    componentDidMount() {
        let self = this;
        const searchString = new URLSearchParams(this.props.location.search);
        let year = searchString.get('year');
        let month_user = searchString.get('month'); // месяц, удобный для пользвателя, отсчёт с 1, а не с 0
        let month = month_user - 1;
        const date = new Date();   // нынешняя дата
        const day = date.getDate();
        this.DayUpdate(date.getFullYear(), date.getMonth(), date.getDate());
        let days = [];

        // если год и месяц записаны в параметрах url, они передаются объекту date
        if (!year) {year = date.getFullYear()}
        else {date.setFullYear(+year)}
        if (month_user === null) {month = date.getMonth()}
        else {date.setMonth(+month)}

        date.setDate(33);
        const days_in_month = 33 - date.getDate();

        date.setFullYear(Number(year), (Number(month)), 1);
        const first_day = date.getDay();    // номер первого дня, где вс это 0
        const days_before_first_day = first_day === 0 ? 6 : first_day - 1;

        // поиск количества дней, которых не хватает для заполнения таблицы
        let additional_days;
        if ((days_in_month + days_before_first_day) % 7) {
            additional_days = 7 - (days_in_month + days_before_first_day) % 7;
        }
        else {
            additional_days = 0
        }

        const days_total = days_before_first_day + days_in_month + additional_days;

        for (let i = 0; i < days_total; i++) {
           if (i >= days_before_first_day && i < days_before_first_day + days_in_month) {
               days[i] = {
                   day: i + 1 - days_before_first_day,
                   colors: [],
               }
           }
           else { days[i] = {
               day: '',
               colors: [],
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
            // проходится по полученным дням и записывает их в общий массив
            JSON.parse(result).map( day => {
                let colors = [];
                day.event.map( (event, i) => {
                    if (event.event_info) {
                        colors[i] = event.event_info.color;
                    }
                });
                if (!colors) {colors = []}
                days[day.date.slice(8, 10) - 1 + days_before_first_day] = {
                    day: Number(day.date.slice(8, 10)),
                    colors: colors,
                };
            });
            self.setState({
                day: day,
                days: days,
                year: year,
                month: month,
                nextMonth: '/?year=' + next_year + '&month=' + (Number(next_month) + 1),
                prevMonth: '/?year=' + prev_year + '&month=' + (Number(prev_month) + 1),
                nextYear: '/?year=' + (Number(year) + 1) + '&month=' + (Number(month) + 1),
                prevYear: '/?year=' + (Number(year) - 1) + '&month=' + (Number(month) + 1),
                days_in_month: days_total,
            })
        }).catch((error) => {
            this.props.history.push("/login")
        })

        infoService.getInfo().then(
            function (result) {
            self.setState({
                info: JSON.parse(result)
            })
        })
    }


    DayUpdate(year, month, day) {
        if (day) {
            let self = this;
            let error = true;
            daysService.getDay(year, month + 1, day).then(function (result) {
                error = false;
                let events = [];
                let results = JSON.parse(result)
                if (results.detail !== "Не найдено.") {
                    results.event.map((event, i) => {
                        events[i] = [event.description, event.time, event.event_info.color];
                    });
                    self.setState({
                        day_data: {
                            id: results.id,
                            date: Number(results.date.slice(8, 10)),
                            topic: results.topic,
                            event: events,
                        },
                        CalendarStyle: Style.CalendarMenu,
                        DayStyle: Style.Day,
                    })
                }
            }).catch((error) => {
                return <Redirect to="/login" />
            })

            if (error) {
                let events = [];
                events[0] = [" "];
                self.setState({
                    day_data: {
                        date: day,
                        event: events,
                    },
                    DayStyle: Style.DayNone,
                });
            }
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.dayRef){
            if ((this.dayRef.offsetHeight + this.eventRef.offsetHeight > 98 + this.state.days_in_month / 7 * 55 &&
                this.state.CalendarStyle === Style.CalendarMenu &&
                window.innerWidth > 768 ||
                this.dayRef.offsetWidth > 250) &&
                this.state.DayStyle !== Style.DayNone &&
                this.state.DayStyle !== Style.DayLine) {
                this.setState({
                    CalendarStyle: Style.CalendarMenuLine,
                    DayStyle: Style.DayLine,
                })
            }
        }
    }

    render() {
        if (this.state.month !== undefined) {
            return (
                <div className={this.state.CalendarStyle}>
                    <div className={Style.Calendar} ref={ (calendarRef) => this.calendarRef = calendarRef}>
                        <DateBlock
                            prevMonth={this.state.prevMonth}
                            nextMonth={this.state.nextMonth}
                            prevYear={this.state.prevYear}
                            nextYear={this.state.nextYear}
                            year={this.state.year}
                            month={this.state.month + 1}
                        />
                        <Table
                            DayUpdate={this.DayUpdate}
                            days={this.state.days}
                            year={this.state.year}
                            month={this.state.month}
                        />
                    </div>
                    <div ref={ (eventRef) => this.eventRef = eventRef}>
                        <Info info={this.state.info}/>
                    </div>
                    <div className={this.state.DayStyle} ref={ (dayRef) => this.dayRef = dayRef}>
                        <Day
                            year={this.state.year}
                            month={this.state.month_name[this.state.month]}
                            day={this.state.day_data.date}
                            event={this.state.day_data.event}
                        />
                    </div>
                </div>
            )
        }
        else {return(<Loading/>)}
    }
}
const CalendarMenuContainer = withRouter(CalendarMenu)

export default CalendarMenuContainer;
