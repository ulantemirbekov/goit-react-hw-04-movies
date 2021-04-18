import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovieReviews } from "../../api/Api";
import styles from "./Reviews.module.css";

const Reviews = () => {
    const [state, setState] = useState({});
    const location = useLocation();

    const getReviews = async (id) => {
        try {
            const results = await fetchMovieReviews(id);
            setState({ ...results });

        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getReviews(location.state.movieId);

    }, []);

    const { results } = state;

    return (

        <div className={styles.reviews}>
            {results !== undefined && results.length === 0 && (
                <div className={styles.reviews_list}>
                    <p className={styles.reviews_listContent}>
                        We don't have any reviews for this movie
            </p>
                </div>
            )}
            <ul className={styles.reviews_list}>
                {results &&
                    results.map((item) => (
                        <li className={styles.reviews_listItem} key={item.id}>
                            <h3 className={styles.reviews_listTitle}>Author: {item.author}</h3>
                            <p className={styles.reviews_listContent}>{item.content}</p>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Reviews;