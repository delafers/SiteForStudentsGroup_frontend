import React from 'react';
import Style from './AddPost.module.css';
import StyleParent from '../DemosNews.module.css';


const AddPost = (props) => {
    return (
        <div className={StyleParent.AppPost}>
            <p className={Style.Date}>add</p>
            {/*{props.event.map( (event, i)  =>*/}
            {/*    <div key={i}>*/}

            {/*    </div>*/}
            {/*)}*/}
        </div>
    );
};

export default AddPost;