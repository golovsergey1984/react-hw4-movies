import React, { Component } from "react";
import SearchBar from '../components/Searchbar';
import * as MoviesAPI from "../services/movie-api.js";
import styles from '../components/app.module.css';
import MoviesGallery from '../components/moviesGallery';
import ErrorNotification from '../components/errorNotification';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';

var lastQuery = null;
export default class MoviesPage extends Component {
    state = {
        query: '',
        moviesFound: [],
        isLoading: false,
        error: null,
    };
    componentDidMount() {
        if (lastQuery) {
            this.setState({ query: lastQuery });
            this.fetchAPI(lastQuery)
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.query !== this.state.query) {
            lastQuery = this.state.query;
            this.fetchAPI(this.state.query)
        }
    }

    fetchAPI(query) {
        if (this.state.query === "") { return }
        this.setState({ isLoading: true });
        MoviesAPI
            .fetchMoviesToSearh(query)
            .then(({ data }) => (this.setState({ moviesFound: data.results })))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))
    }



    handleChangeQuery = (queryToSearch) => {
        this.setState({ query: queryToSearch })
    }


    render() {
        const { moviesFound, isLoading, error, query } = this.state

        const currentPath = this.props.location.pathname;
        return (

            < div >
                <SearchBar onSubmit={this.handleChangeQuery} query={lastQuery} />
                {error && <ErrorNotification text={error.message} />}
                {isLoading && <Loader />}
                {moviesFound.length > 0 && <ul className={styles['List-items-ul']}> <MoviesGallery items={moviesFound} parentPage={currentPath} query={query} /></ul>}

            </div >
        );
    }
}

MoviesPage.propTypes = {
    queryToSearch: PropTypes.string,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            original_name: PropTypes.string,
        }),
    ),
};