import React, { Component } from  'react';
import './App.css';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import CalendarMenu from './components/Components/Calendar/CalendarMenu.jsx';
import Mail from './components/Components/Mail/Mail.jsx';
import LetterCreateUpdate from './components/Components/Mail/LetterCreateUpdate.jsx';
import News from './components/Components/News/News.jsx';
import { Route, Link } from  'react-router-dom'

const App = () => {
    return (
        <div className='App'>
            <Header className='App-header'/>
            <Route path='/calendar' render={ () => <CalendarMenu/>}/>
            <Route path='/news' render={ () => <News/>}/>
            <Footer/>
            <a  href='/mail/'>LETTERS</a>
            <a  href='/mail/letter/'>CREATE LETTER</a>
            <Route path='/mail' exact component={Mail}  />
            {/* перенести следующие роуты в компоненту mail, убрать возможность добавлять письма*/}
            <Route path='/mail/letter/:id' component={LetterCreateUpdate}  />
            <Route path='/mail/letter/' exact component={LetterCreateUpdate}  />
        </div>
    );
}

export default App;

