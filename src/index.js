import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import store from "./Redux/Redux-store";
import App from './App';
import {Provider} from "react-redux";

export let RenderEntireTree = (state) =>{
    ReactDOM.render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>,
        document.getElementById('root')
    );
}


RenderEntireTree(store.getState());

