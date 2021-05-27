import React, { Component } from  'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenu from './Components/Calendar/CalendarMenu.jsx';
import DemosNews from './Components/DemosNews/DemosNews.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import MailsContainer from "./Components/Mail/mailsContainer";
import OneMail from "./Components/Mail/One_Letter/OneLetterContainer";
import Login from "./Components/Login/Login";
import Registration from "./Components/Login/Registrate";
import MailConfirm from "./Components/Login/MailConfirmContainer";
import TeddyHead from "./Components/Header/Teddy";


const App = (props) => {
    return (
        <BrowserRouter>
        <div className={Style.App}>
            <TeddyHead/>
            <Route exact path='/' component={CalendarMenu}/>
            <Route path='/demosnews' component={DemosNews}/>
            <Route exact path='/mail' render={() => <MailsContainer/>}/>
            <Route path='/mail/:mailId' render={() => <OneMail/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Route path='/registrate' render={() => <Registration/>}/>
            <Route path='/activate/:userId/:userData' render={() => <MailConfirm/>}/>
            <Footer/>
        </div>
        </BrowserRouter>
    );
};

export default App;

