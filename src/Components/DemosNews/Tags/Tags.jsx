import React from 'react';
import Style from './Tags.module.css';
import {Link} from "react-router-dom";

const Tags = (props) => {
    if (props.tags) {
        return (
            <div className={props.style}>
                {props.tags.map( tag =>
                    <Link to={'/demosnews/?tag=' + tag.id}
                          className={Style.Tag}
                          key={tag.name}
                          onClick={() => props.changeTag(tag.id)}
                    >{tag.name}</Link>

                    // <a href={'http://localhost:3000/demosnews/?tag=' + tag.id} className={Style.Tag} key={tag.name}>{tag.name}</a>
                )}
            </div>
        );
    }
    else {
        return (
            <p>loading...</p>
        )
    }
};

export default Tags;