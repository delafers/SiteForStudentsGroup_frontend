import  React, { Component } from  'react';
import Style from './Mail.module.css';
import Letter from './Letter.jsx';
import LettersService from '../../../Services/LettersService';

const lettersService = new LettersService();

class Mail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            letters: [],
            nextPageURL: '',
            previousPageURL: ''
        };
        this.nextPage = this.nextPage.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        let self = this;
        lettersService.getLetters().then(function (result) {
            self.setState({ letters:  result.data, nextPageURL:  result.nextlink})
        });
    }

    handleDelete(id) {
        let self = this;
        lettersService.deleteLetter(id).then(()=>{
            let  newArr = self.state.letters.filter(function(obj) {
                return obj.id !== id;
            });
            self.setState({letters:  newArr})
        });
    }

    nextPage() {
        let self = this;
        lettersService.getLettersByURL(this.state.nextPageURL).then((result) => {
            self.setState({ letters:  result.data, nextPageURL:  result.nextlink})
        });
    }

    previousPage() {
        let self = this;
        lettersService.getLettersByURL(this.state.previousPageURL).then((result) => {
            self.setState({ letters:  result.data, previousPageURL:  result.previouslink})
        });
    }

    render() {
    return (
        <div>
            {/* перенести следующий блок в компоненту letter*/}
            {this.state.letters.map( letter  =>
                <div key={letter.id}>
                <div>{letter.id}</div>
                <div>{letter.mailer}</div>
                <div>{letter.topic}</div>
                <div>{letter.text}</div>
                <button  onClick = {()=>  this.handleDelete(letter.id) }>Delete</button>
                <a href={"/mail/letter/" + letter.id}>Update</a>
                </div>
            )}
            <button onClick={ this.nextPage }>Next</button>
            <button onClick={ this.previousPage }>Previous</button>
        </div>
        );
    }
}

export default Mail;