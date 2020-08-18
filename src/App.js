import React, { Component } from  'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import Calendar from './Components/Calendar/Calendar.jsx';
import Mail from './Components/Mail/Mail.jsx';
import News from './Components/News/News.jsx';
import { Route, Link } from  'react-router-dom'

const App = () => {
    return (
        <div className={Style.App}>
            <Header className='App-header'/>
            <Route path='/calendar/' component={Calendar}/>
            <Route path='/news' render={ () => <News/>}/>
            <Route path='/news/:id' render={ () => <News/>}/>
            <Route path='/mail' exact component={Mail}/>
            <Route path='/mail/:id' component={Mail}/>
            <Footer/>
        </div>
    );
};

export default App;

