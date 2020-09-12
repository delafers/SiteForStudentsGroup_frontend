import React from 'react';
import Style from './Tags.module.css';

const Tags = (props) => {
    if (props.tags) {
        return (
            <div className={props.style}>
                {props.tags.map( tag =>
                    <a href={'http://localhost:3000/demosnews/?tag=' + tag.id} className={Style.Tag} key={tag.name}>{tag.name}</a>
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