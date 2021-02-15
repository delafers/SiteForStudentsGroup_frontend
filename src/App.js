import React, { Component } from  'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenu from './Components/Calendar/CalendarMenu.jsx';
import DemosNews from './Components/DemosNews/DemosNews.jsx';
import { Route} from  'react-router-dom'
import MailsContainer from "./Components/Mail/mailsContainer";

const App = () => {
    return (
        <div className={Style.App}>
            <Header className='App-header'/>
            <Route path='/calendar/' component={CalendarMenu}/>
            <Route path='/demosnews' component={DemosNews}/>
            <Route path='/mail' render={() => <MailsContainer/>}/>
            <Footer/>
        </div>
    );
};

export default App;

