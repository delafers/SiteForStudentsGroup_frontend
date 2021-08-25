import React from "react";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getMailData, setMailContent} from "../../../Redux/Letter_reducer";
import Modal from "./OneButton";
import {compose} from "redux";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";


class oneLetterContainer extends React.Component {

    refreshId() {
        let mailId = this.props.match.params.mailId;
        if (!mailId) {
            mailId = 10
        }
        this.props.getMailData(mailId)
    }
    componentDidMount() {
        debugger
       this.refreshId()
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshId()
        }
    }
    render() {
        return <div>
                <Modal mail={this.props.mail} zag={this.props.zag}/>
            </div>
}
}
let mapStateToProps = (state) => {
    debugger
    return{
        mail: state.letterPage.mail,
        zag: state.MailPage.users[0]
    }
}

const OneMail = compose(
    connect(mapStateToProps,{getMailData}),
    withRouter,
    withAuthRedirect
)(oneLetterContainer)
export default OneMail
