import React, { Component, Fragment } from 'react';
import * as MoviesAPI from "../services/movie-api.js";
import Loader from '../components/Loader';
import ErrorNotification from '../components/errorNotification';
import styles from '../components/app.module.css';
import PropTypes from 'prop-types';

const getIdFromProps = props => props.match.params.movieId;
export default class Reviews extends Component {
    state = {
        reviews: [],
        isLoading: false,
        error: null,
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const id = getIdFromProps(this.props);
        MoviesAPI
            .fetchMoviesReviews(id)
            .then(({ data }) => (this.setState({ reviews: data.results })))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))

    }

    render() {
        const { reviews, isLoading, error } = this.state
        return (
            <Fragment>
                {isLoading && <Loader />}
                {reviews.length > 0 &&
                    <Fragment>
                        <h3>Total reviews: {reviews.length}</h3>
                        <ol type="1" className={styles['']}>
                            {reviews.map(item => (
                                <li key={item.id} className={styles['movie-detail-review-li']}><b>{item.author}</b> <p>{item.content}</p></li>

                            ))}
                        </ol>
                    </Fragment>
                }
                {reviews.length === 0 &&
                    <h1>No reviews yet.</h1>
                }
                {error && <ErrorNotification text={error.message} />}
            </Fragment>

        )
    }
};

Reviews.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            author: PropTypes.string.isRequired,
            content: PropTypes.string.isRequired,
        }),
    ),
};