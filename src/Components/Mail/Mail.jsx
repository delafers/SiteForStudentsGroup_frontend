import React, { Component } from 'react';
import Style from './Mail.module.css';
import LettersService from '../Services/LettersService';

const lettersService = new LettersService();

class Mail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            nextPageURL: '',
            prevPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
        let self = this;
        lettersService.getLetters().then(function (result) {
            self.setState({ letters:  result.data, nextPageURL:  result.nextlink, prevPageURL:  result.prevlink})
        });
    }

    nextPage() {
        let self = this;
        lettersService.getLettersByURL(this.state.nextPageURL).then((result) => {
            self.setState({ letters:  result.data, nextPageURL:  result.nextlink, prevPageURL:  result.prevlink})
        });
    }

    prevPage() {
        let self = this;
        lettersService.getLettersByURL(this.state.prevPageURL).then((result) => {
            self.setState({ letters:  result.data, nextPageURL:  result.nextlink, prevPageURL:  result.prevlink})
        });
    }

    render() {
        return (
            <div>
                {this.state.letters.map( letter  =>
                    <div key={letter.id}>
                    <div>{letter.id}</div>
                    <div>{letter.mailer}</div>
                    <div>{letter.topic}</div>
                    <div>{letter.text}</div>
                    <a href={"/mail/" + letter.id}>Open</a>
                    </div>
                )}
                <button onClick={ this.nextPage }>Next</button>
                <button onClick={ this.prevPage }>Previous</button>
                {console.log(this)}
            </div>
        );
    }
}

export default Mail;