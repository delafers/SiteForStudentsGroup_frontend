import React, {Component} from 'react';
import Style from './App.module.css';
import Footer from './Components/Footer/Footer.jsx';
import CalendarMenuContainer from './Components/Calendar/CalendarMenu.jsx';
import {BrowserRouter, Route} from 'react-router-dom'
import Login from "./Components/Login/Login";
import Registration from "./Components/Login/Registrate";
import MailConfirm from "./Components/Login/MailConfirmContainer";
import TeddyHead from "./Components/Header/Teddy";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {
    initializeApp,
    initializeAppWithRefresh,
    initializedSuccess
} from "./Redux/app_reducer";
import store from "./Redux/Redux-store";
import CheckAccess from "./Components/common/AccessLifeCheck/LifeAccess";
import {getUserAuthData} from "./Redux/auth_reducer";
import Loading from "./Components/Loading/Loading";
import {withSuspense} from "./hoc/LazyFunctoin";
import ProfileView from "./Components/Profile/ProfileContaner";
import Restore from "./Components/Login/RestorePassword";
import ConfirmPasswordPage from "./Components/Login/RestorePasswordConfirm";

const MailsContainer = React.lazy(() => import("./Components/Mail/mailsContainer"))
const Tags = React.lazy(() => import("./Components/DemosNews/DemosNewsHookForm"))
const OneMail = React.lazy(() => import("./Components/Mail/One_Letter/OneLetterContainer"))

class App extends Component {

    componentDidMount() {
        if (localStorage.getItem("access") !== null) {
            if (CheckAccess()) {
                this.props.initializeApp(localStorage.getItem("access"))
            } else {
                localStorage.removeItem('access')
                this.props.initializeAppWithRefresh()
            }
        }else{
            this.props.initializedSuccess()
        }
    }
    render() {
        if (!this.props.initialized) {
            return <Loading/>
        } else {
            return (
                <BrowserRouter>
                    <div className={Style.App}>
                        <TeddyHead/>
                        <Route exact path='/calendar' render={CalendarMenuContainer}/>
                        <Route path='/demosnews' render={withSuspense(Tags)}/>
                        <Route exact path='/' render={withSuspense(MailsContainer)}/>
                        <Route path='/mail/:mailId' render={withSuspense(OneMail)}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/restore' render={() => <Restore/>}/>
                        <Route path='/profile/:user?' render={() => <ProfileView/>}/>
                        <Route path='/registrate' render={() => <Registration/>}/>
                        <Route path='/activate/:userId/:userData' render={() => <MailConfirm/>}/>
                        <Route path='/password/reset/confirm/:userId/:userData' render={() => <ConfirmPasswordPage/>}/>
                        <Footer/>
                    </div>
                </BrowserRouter>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return{initialized: state.app.initialized}
}

let AppContainer = compose(
    connect(mapStateToProps, {initializeApp, getUserAuthData, initializeAppWithRefresh, initializedSuccess}))(App)

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
