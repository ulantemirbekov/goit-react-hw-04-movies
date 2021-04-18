import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { fetchTrending } from "../../api/Api";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const [trendMovies, setTrendMovies] = useState([]);
    const location = useLocation();

    useEffect(() => {
        fetchTrending().then((response) => {
            setTrendMovies([...response]);
        });
    }, []);
    return (

        <div className={styles.homepage}>
            <h2 className={styles.homepage_title}>Trending today</h2>
            <ul className={styles.trending_list}>
                {trendMovies.map((movie, index) => (
                    <li className={styles.trending_listItem} key={`${movie.id}${index}`}>
                        <NavLink
                            className={styles.trending_listLink}
                            to={{
                                pathname: `/movies/${movie.id}`,
                                state: {
                                    from: location.pathname,
                                    movieId: movie.id,
                                },
                            }}
                        >
                            {movie.title}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>

    );
};

export default HomePage;