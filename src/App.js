import React, {Component} from 'react';
import Style from './App.module.css';
import Header from './Components/Header/Header.jsx';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenu from './Components/Calendar/CalendarMenu.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import MailsContainer from "./Components/Mail/mailsContainer";
import OneMail from "./Components/Mail/One_Letter/OneLetterContainer";
import Login from "./Components/Login/Login";
import Registration from "./Components/Login/Registrate";
import MailConfirm from "./Components/Login/MailConfirmContainer";
import TeddyHead from "./Components/Header/Teddy";
import Tags from "./Components/DemosNews/DemosNewsHookForm";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./Redux/app_reducer";
import store from "./Redux/Redux-store";
import CheckAccess from "./Components/common/AccessLifeCheck/LifeAccess";
import {getUserAuthData} from "./Redux/auth_reducer";
import {refreshToken} from "./Redux/token_reducer";


class App extends Component {
    componentDidMount() {
        if (localStorage.getItem("access") !== null) {
            if (CheckAccess() === true) {
                this.props.getUserAuthData(localStorage.getItem("access"))
                //this.props.initializeApp()
            } else {
                localStorage.removeItem('access')
                this.props.refreshToken()
            }
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className={Style.App}>
                    <TeddyHead/>
                    <Route exact path='/' component={CalendarMenu}/>
                    <Route path='/demosnews' component={Tags}/>
                    <Route exact path='/mail' render={() => <MailsContainer/>}/>
                    <Route path='/mail/:mailId' render={() => <OneMail/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/registrate' render={() => <Registration/>}/>
                    <Route path='/activate/:userId/:userData' render={() => <MailConfirm/>}/>
                    <Footer/>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state) => (
    {initialized: state.app.initialized})

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp, getUserAuthData, refreshToken}))(App)

const LastFrontApp = (props) => {
    return <BrowserRouter>
        <Provider store={store}>
            <AppContainer/>
        </Provider>
    </BrowserRouter>
}

export default LastFrontApp
export
{
    AppContainer
}
