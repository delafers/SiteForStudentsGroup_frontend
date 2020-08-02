import React, { Component } from 'react';
import Style from './Day.module.css';
import DaysService from '../Services/DaysService.js';

const daysService = new DaysService();


class Day extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
        };
    }

    componentDidMount() {
        let self = this;
        daysService.getDay().then(function (result) {
            self.setState({days: result.data})
        });
    }

    render() {
        return (
            <div>
                {console.log(this.state)}
            </div>
        )
    }
}

export default Day;