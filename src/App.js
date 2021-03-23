import React, { Component } from  'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenu from './Components/Calendar/CalendarMenu.jsx';
import DemosNews from './Components/DemosNews/DemosNews.jsx';
import { Route} from  'react-router-dom'
import MailsContainer from "./Components/Mail/mailsContainer";
import OneMail from "./Components/Mail/One_Letter/OneLetterContainer";
import Login from "./Components/Login/Login";


const App = () => {
    return (
        <div className={Style.App}>
            <Header className={Style.AppHeader}/>
            <Route path='/calendar' component={CalendarMenu}/>
            <Route path='/demosnews' component={DemosNews}/>
            <Route exact path='/mail' render={() => <MailsContainer/>}/>
            <Route path='/mail/:mailId' render={() => <OneMail/>}/>
            <Route path='/login' render={() => <Login/>}/>
            <Footer/>
        </div>
    );
};

export default App;

