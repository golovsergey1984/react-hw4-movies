import React, { Component } from "react";
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import styles from '../components/app.module.css';

export default class App extends Component {
    //other logic
    render() {
        return (
            <div className={styles.loader}>
                <Loader
                    type="Oval"
                    color="#00BFFF"
                    height={100}
                    width={100}

                />
            </div>
        );
    }
}