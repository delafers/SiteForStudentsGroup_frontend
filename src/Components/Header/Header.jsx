import React, { Component } from 'react';
import Style from './Header.module.css';
import { Link } from  'react-router-dom'
import AuthorizationService from '../Services/AuthorizationService.js';

const authorizationService = new AuthorizationService();


class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
        // this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        let self = this;
        // const params = this.props.location.search;
        // authorizationService.getPosts(params).then(function (result) {
        //     self.setState({
        //         posts: result.postsPage,
        //         tags: result.tags,
        //         numPages: result.numPages,
        //         recentPage: self.state.recentPage + 1,
        //     })
        // });
    }

    render() {
        return (
            <header>
                <Link to="/calendar">календарь</Link>
                <Link to="/mail">почта</Link>
                <Link to="/demosnews">суровости</Link>
            </header>
        );
    }
}

export default Header;