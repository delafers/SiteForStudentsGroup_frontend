import React, { Component } from 'react';
import Style from './DemosNews.module.css';
import DemosNewsService from '../Services/DemosNewsService.js';
import Post from "./Post/Post";
import AddPost from "./AddPost/AddPost";
import Tags from "./Tags/Tags";

const demosNewsService = new DemosNewsService();


class DemosNewsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        };
    }

    componentDidMount() {
    let self = this;
        demosNewsService.getPosts().then(function (result) {
            self.setState({
                posts: result.posts_page,
                tags: result.tags,
            })
        });
    }

    render() {
        if (this.state) {
            return (
                <div className={Style.DemosNews}>
                    <AddPost />
                    {this.state.posts.map( post =>
                        <Post post={post}/>
                    )}
                    <Tags tags={this.state.tags}/>
                    {console.log(this.state)}
                </div>
            )
        }
        else {return(<p>loading...</p>)}
    }
}

export default DemosNewsMenu;
