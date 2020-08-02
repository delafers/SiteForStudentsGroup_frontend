import React, { Component } from 'react';
import LettersService from '../Services/LettersService';
//import Style from './Letter.module.css';

const lettersService = new LettersService();

class Letter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letters: [],
        };
    }

    componentDidMount() {
        const { match: { params } } =  this.props;
        let self = this;
        lettersService.getLetter(params.id).then(function (result) {
            self.setState({letters: result.data})
        });
    }

    render() {
        return (
            <div>
                <div>
                    <p>От кого: {this.state.letters.fromAddress}</p>
                    <p>Тема: {this.state.letters.theme}</p>
                    <div>текст письма: {this.state.letters.text}</div>
                </div>
            </div>
        )
    }
}

export default Letter;