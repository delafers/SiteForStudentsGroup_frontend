import React from 'react';
import {connect} from "react-redux";
import * as axios from "axios";
import Loading from "../Loading/Loading";
import {setCurrentPage, setTotalUsersCount, setUsers, toggleIsFetching} from "../../Redux/LettersService";
import Mail from "./MailsView";

class letterContainer extends React.Component {
    componentDidMount() {
        debugger
        this.props.toggleIsFetching(true)
        axios.get(`http://localhost:8000/api/letters/?count=10`).then(responce => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(responce.data.results)
            this.props.setTotalUsersCount(responce.data.count)
        })
    }
    onPageChanged= (pageNumber) => {
        this.props.setCurrentPage(pageNumber);
        this.props.toggleIsFetching(true)
        axios.get(`http://localhost:8000/api/letters/?count=10&page=
        ${Math.ceil(this.props.totalUsersCount/10) + 1 - pageNumber}`).
        then(responce => {
            debugger
            this.props.toggleIsFetching(false)
            this.props.setUsers(responce.data.results);
        });
    }
    render() {
        return <>
            {this.props.isFetching ? <Loading/> : null}
            <Mail users={this.props.users} totalUsersCount={this.props.totalUsersCount}
                  currentPage={this.props.currentPage} isFetching={this.props.isFetching}
                    onPageChanged={this.onPageChanged}/>
            </>

    }
}
let mapStateToProps =(state) => {
    console.log(state)
    return{
        users: state.MailPage.users,
        totalUsersCount: state.MailPage.totalUsersCount,
        currentPage: state.MailPage.currentPage,
        isFetching: state.MailPage.isFetching
    }
}

const MailsContainer = connect(mapStateToProps, {setUsers, setCurrentPage, setTotalUsersCount, toggleIsFetching})(letterContainer)
export default MailsContainer
