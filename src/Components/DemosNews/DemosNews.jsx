import React, { Component } from 'react';
import Style from './DemosNews.module.css';
import DemosNewsService from '../Services/DemosNewsService.js';
import Post from "./Post/Post";
import AddPost from "./AddPost/AddPost";
import Tags from "./Tags/Tags";
import Loading from "../Loading/Loading";
import { Link } from  'react-router-dom'


const demosNewsService = new DemosNewsService();


class DemosNewsMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            numPages: 0,
            recentPage: 0,
        };
        this.loadMore = this.loadMore.bind(this);
        this.changeTag = this.changeTag.bind(this);
    }

    componentDidMount() {
        let self = this;
        const params = this.props.location.search;
        demosNewsService.getPosts(params).then(function (result) {
            self.setState({
                posts: result.postsPage,
                tags: result.tags,
                numPages: result.numPages,
                recentPage: self.state.recentPage + 1,
            })
        });
    }

    loadMore(){
        let self = this;
        const params = this.props.location.pathname + this.props.location.search;
        const pastPosts = this.state.posts;
        let url;
        if (this.props.location.search) {
            url = '/api' + params + '&page=' + (this.state.recentPage + 1);
        }
        else {
            url = '/api' + params + '?tag=0' + '&page=' + (this.state.recentPage + 1);
        }

        demosNewsService.getPostsByURL(url).then(function (result) {
            self.setState({
                posts: pastPosts.concat(result.postsPage),
                tags: result.tags,
                numPages: result.numPages,
                recentPage: self.state.recentPage + 1,
            })
        });
    }

    changeTag(tag){
        let self = this;
        const params = this.props.location.pathname;
        const url = '/api' + params + '?tag=' + tag;

        demosNewsService.getPostsByURL(url).then(function (result) {
            self.setState({
                posts: result.postsPage,
                numPages: result.numPages,
                recentPage: 1,
            })
        });
    }

    render() {
        if (this.state.posts) {

            let load_more;
            if (this.state.recentPage < this.state.numPages) {
                load_more = <div onClick={ this.loadMore } className={Style.LoadMore}>load more</div>;
            }

            return (
                <div className={Style.DemosNews}>
                    <AddPost />
                    <div  className={Style.Posts}>
                        {this.state.posts.map( post =>
                            <Post post={post}
                                  key={post.id}
                                  location={this.props.location.search}
                                  style={Style.TagsInPost}
                                  changeTag={this.changeTag}
                            />
                        )}
                    </div>
                    <Tags tags={this.state.tags}
                          url={this.props.location.search}
                          style={Style.TagsMain}
                          changeTag={this.changeTag}
                    />

                    {load_more}
                </div>
            )
        }
        else {return(<Loading/>)}
    }
}

export default DemosNewsMenu;
