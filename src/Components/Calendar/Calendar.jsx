import React, { Component } from 'react';
import Style from './Calendar.module.css';
import Day from "./Day";
import DaysService from '../Services/DaysService.js';

const daysService = new DaysService();


class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            nextPage: "/calendar/" + props.location.search,
            prevPage: "/calendar/" + props.location.search,
        };
    }

    componentDidMount() {
        console.log(this);
        const { match: { params } } =  this.props;
        let self = this;
        daysService.getDays().then(function (result) {
            self.setState({days: result.data})
        });
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
                <button onClick={ this.nextPage }>Next</button>
                <button onClick={ this.prevPage }>Previous</button>
                <Day/>
            </div>
        )
    }
}

export default Calendar;