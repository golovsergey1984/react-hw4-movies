import React, { Component, Fragment } from 'react';
import * as MoviesAPI from "../services/movie-api.js";
import Loader from '../components/Loader';
import ErrorNotification from '../components/errorNotification';
import styles from '../components/app.module.css';
import PropTypes from 'prop-types';


const getIdFromProps = props => props.match.params.movieId;
const imgUrl = 'https://image.tmdb.org/t/p/w500/';
export default class Cast extends Component {
    state = {
        casts: [],
        isLoading: false,
        error: null,
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        const id = getIdFromProps(this.props);
        MoviesAPI
            .fetchMoviesCast(id)
            .then(({ data }) => (this.setState({ casts: data.cast })))
            .catch(error => this.setState({ error }))
            .finally(() => this.setState({ isLoading: false }))

    }

    render() {
        const { isLoading, error, casts } = this.state;
        return (
            <Fragment>
                {isLoading && <Loader />}
                {casts.length > 0 &&
                    <Fragment>
                        <h3>Total cast: {casts.length}</h3>
                        <ol type="1" className={styles['']}>
                            {casts.map(item => (
                                <li key={item.cast_id} className={styles['movie-detail-review-li']}>
                                    <p><img src={imgUrl+item.profile_path} className={styles['movie-detail-cast-img']} alt={item.name}></img></p>
                                   <p><b>{item.name}</b></p> 
                                   <p>Character: {item.character}</p>
                                   </li>
                            ))}
                        </ol>
    </Fragment>
                }
                {casts.length === 0 &&
                    <h1>there is currently no information on the cast</h1>
                }
                {error && <ErrorNotification text={error.message} />}
            </Fragment>

        )
    }
};

Cast.propTypes = {

    casts: PropTypes.arrayOf(
        PropTypes.shape({
            cast_id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            character: PropTypes.string.isRequired,
            profile_path: PropTypes.string.isRequired,
        }),
    ),
};