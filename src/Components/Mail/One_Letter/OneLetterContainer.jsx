import React from "react";
import * as axios from "axios";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {setMailContent} from "../../../Redux/Letter_reducer";
import Modal from "./OneButton";


class oneLetterContainer extends React.Component {
    componentDidMount() {
        let mailId = this.props.match.params.mailId;
        if (!mailId) {
            mailId = 10
        }
        debugger
        axios.get(`http://localhost:8000/api/letters/` + mailId).then(responce => {
            this.props.setMailContent(responce.data)
        });
    }
    render() {
        return <>
                <Modal mail={this.props.mail}/>
            </>
}
}
let mapStateToProps = (state) => {
    debugger
    return{
        mail: state.letterPage.mail
    }
}

let WithRouterDataContainerComponent = withRouter(oneLetterContainer)
const OneMail = connect(mapStateToProps,{setMailContent})(WithRouterDataContainerComponent)
export default OneMail
