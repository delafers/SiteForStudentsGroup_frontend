import  React, { Component } from  'react';
import  LettersService  from  '../../../Services/LettersService.js';

const  lettersService  =  new  LettersService();


class  LettersCreateUpdate  extends  Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        const { match: { params } } =  this.props;
        if(params  &&  params.id)
        {
            lettersService.getLetter(params.id).then((letter)=>{
                this.refs.mailer.value = letter.mailer;
                this.refs.topic.value = letter.topic;
                this.refs.text.value = letter.text;
            })
        }
    }

    handleCreate(){
        lettersService.createLetter(
            {
            "mailer":  this.refs.mailer.value,
            "topic":  this.refs.topic.value,
            "text":  this.refs.text.value,
            }).then((result)=>{
                    alert("Letter created!");
            }).catch(()=>{
                    alert('There was an error! Please re-check your form.');
            });
    }

    handleUpdate(id){
    lettersService.updateLetter(
        {
        "id":  id,
        "mailer":  this.refs.mailer.value,
        "topic":  this.refs.topic.value,
        "text":  this.refs.text.value,
        }
        ).then((result)=>{

            alert("Letter updated!");
        }).catch(()=>{
            alert('There was an error! Please re-check your form.');
        });
    }

    handleSubmit(event) {
        const { match: { params } } =  this.props;
        if (params  &&  params.id){
            this.handleUpdate(params.id);
        }
        else
        {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
            <div className="form-group">
            <label>Mailer:</label>
            <input className="form-control" type="text" ref='mailer' />

            <label>topic:</label>
            <input className="form-control" type="text" ref='topic'/>

            <label>text:</label>
            <input className="form-control" type="text" ref='text' />

            <input className="btn btn-primary" type="submit" value="Submit" />
            </div>
            </form>
        );
  }

}
export default LettersCreateUpdate;