import React from "react";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getMailData, setMailContent} from "../../../Redux/Letter_reducer";
import Modal from "./OneButton";


class oneLetterContainer extends React.Component {
    componentDidMount() {
        let mailId = this.props.match.params.mailId;
        if (!mailId) {
            mailId = 10
        }
        this.props.getMailData(mailId)
        ;
    }
    render() {
        return <>
                <Modal mail={this.props.mail}/>
            </>
}
}
let mapStateToProps = (state) => {
    return{
        mail: state.letterPage.mail
    }
}

let WithRouterDataContainerComponent = withRouter(oneLetterContainer)
const OneMail = connect(mapStateToProps,{getMailData})(WithRouterDataContainerComponent)
export default OneMail
