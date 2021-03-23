import React from 'react'
import * as axios from 'axios'

export class loginTest extends React.Component{
    componentDidMount() {
        debugger

        axios.post(`https://localhost:8000/auth/jwt/create/`,{}, { withCredentials: true }).
            then(response => {console.log(response)})
    }
    render() {
        return(
        <div>
            {this.props.response}
        </div>
        )
    }
}