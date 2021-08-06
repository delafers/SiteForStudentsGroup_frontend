import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import Loading from "../Loading/Loading";
import {
    getMails,
    setCurrentPage,
    setMailPage,
    setTotalUsersCount,
    setUsers,
    toggleIsFetching, updateMails
} from "../../Redux/LettersService";
import Mail from "./MailsView";
const baseURL = 'http://80.78.240.154/'
class letterContainer extends React.Component {
    componentDidMount() {
        this.props.getMails()
    }
    onPageChanged= (pageNumber) => {
        this.props.setMailPage(pageNumber)
    }
    render() {
        return <>
            {this.props.isFetching ? <Loading/> : null}
            <Mail users={this.props.users} totalUsersCount={this.props.totalUsersCount}
                  currentPage={this.props.currentPage} isFetching={this.props.isFetching}
                  onPageChanged={this.onPageChanged} updateMails={this.props.updateMails}
                  isAuth={this.props.isAuth}
            />
            </>

    }
}
let mapStateToProps =(state) => {
    return{
        users: state.MailPage.users,
        totalUsersCount: state.MailPage.totalUsersCount,
        currentPage: state.MailPage.currentPage,
        isFetching: state.MailPage.isFetching,
        isAuth: state.auth.isAuth
    }
}

const MailsContainer = connect(mapStateToProps, {getMails,setMailPage, updateMails})(letterContainer)
export default MailsContainer
