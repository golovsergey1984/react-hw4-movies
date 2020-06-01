import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/app.module.css';
import PropTypes from 'prop-types';



const MoviesGallery = ({ items, parentPage }) => (
    <Fragment>
        {items.map(item => (
            <li key={item.id} >
                <Link
                    to={{
                        pathname: `/movies/${item.id}`,
                        state: {
                            goOnBack: parentPage,
                        }
                    }}
                    className={styles['List-items-li-link']}
                > {item.title}{item.original_name}</Link>
            </li>

        ))}
    </Fragment >
);

export default MoviesGallery;

MoviesGallery.propTypes = {
    parentPage: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string,
            original_name: PropTypes.string,
        }),
    ),
};
