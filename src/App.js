import React, { Component } from  'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenu from './Components/Calendar/CalendarMenu.jsx';
import Mail from './Components/Mail/Mail.jsx';
import DemosNews from './Components/DemosNews/DemosNews.jsx';
import { Route, Link } from  'react-router-dom'

const App = () => {
    return (
        <div className={Style.App}>
            <Header className='App-header'/>
            <Route path='/calendar/' component={CalendarMenu}/>
            <Route path='/demosnews' render={ () => <DemosNews/>}/>
            <Route path='/demosnews/:id' render={ () => <DemosNews/>}/>
            <Route path='/mail' exact component={Mail}/>
            <Route path='/mail/:id' component={Mail}/>
            <Footer/>
        </div>
    );
};

export default App;

