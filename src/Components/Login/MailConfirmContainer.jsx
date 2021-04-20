import React from "react";
import Confirm from "./MailConfirm";
import {withRouter} from "react-router-dom";
import {authAPI} from "../../api/api";


class MailConfirm extends React.Component {
    componentDidMount() {
        debugger
        let userId = this.props.match.params.userId
        let userData = this.props.match.params.userData
        let formdata = new FormData();
        formdata.append("token", userData);
        formdata.append("uid", userId);
        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect:'follow'
        }
        authAPI.registrConfirm(requestOptions)
    }
    render() {
        return(
            <Confirm/>
        )

    }
}

export default withRouter(MailConfirm)