import React, { Component } from 'react';
import styles from '../components/app.module.css';
import PropTypes from 'prop-types';
import PNotify from 'pnotify/dist/es/PNotify';
import 'material-design-icons/iconfont/material-icons.css';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'pnotify/dist/es/PNotifyStyleMaterial.js';
import 'pnotify/dist/es/PNotifyButtons.js';


PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

export default class SearchBar extends Component {
    state = {
        queryToSearch: '',
    }
    componentDidMount() {
        if (this.props.query) {
            this.setState({ queryToSearch: this.props.query });
        }
    }

    handleSubmitSearchTxt = e => {
        e.preventDefault();
        if (this.state.queryToSearch === "") { this.pnotifyError(); return }
        else { this.props.onSubmit(this.state.queryToSearch); }

    }

    handleChange = e => {
        this.setState({ queryToSearch: e.target.value });
    }

    pnotifyError = () => {
        let notice = PNotify.error({
            text: 'No empty request allowed',
            animateSpeed: 'slow',
            delay: 4000,
        });
        notice.on('click', function () {
            notice.close();
        });
    };

    render() {
        const { queryToSearch } = this.state;
        return (
            <header className={styles.Searchbar}>
                <form className={styles.SearchForm} onSubmit={this.handleSubmitSearchTxt}>
                    <button type="submit" className={styles['SearchForm-button']}>
                        <span className={styles['SearchForm-button-label']}>Search</span>
                    </button>

                    <input
                        className={styles['SearchForm-input']}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search movies"
                        value={queryToSearch}
                        onChange={this.handleChange}
                    />
                </form>
            </header>
        )
    }
};

SearchBar.propTypes = {
    query: PropTypes.string,
};