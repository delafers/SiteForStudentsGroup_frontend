import React from 'react';
import Style from './Tags.module.css';
import StyleParent from '../DemosNews.module.css';

const Tags = (props) => {
    if (props.tags) {
        return (
            <div className={StyleParent.Tags}>
                {props.tags.map( tag =>
                    <div className={Style.Tag} key={tag.name}>{tag.name}</div>
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