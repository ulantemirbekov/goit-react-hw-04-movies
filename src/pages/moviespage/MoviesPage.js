import React, { useState, useEffect } from "react";
import {
    NavLink,
    useHistory,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import { fetchMovies } from "../../api/Api";
import styles from "./MoviesPage.module.css";

const initialState = {
    searchMovies: [],
    query: "",
    serching: "false",
};
const MoviesPage = () => {
    const [state, setState] = useState({ ...initialState });
    const history = useHistory();
    const location = useLocation();
    const match = useRouteMatch();

    const onHandleChange = (e) => {
        const { value } = e.target;
        setState({ query: value, serching: "true" });
    };

    const getMovies = async (query) => {
        const result = await fetchMovies(query);

        setState((prev) => ({
            ...prev,
            searchMovies: [...result],
        }));
    };

    const onFormSubmit = (e) => {
        e.preventDefault();
        getMovies(state.query);
        history.push({
            pathname: location.pathname,
            search: `?query=${state.query}`,
        });
    };

    useEffect(() => {
        if (!location.state) {
            return;
        } else {
            location.state.query &&
                getMovies(location.state.query).then(() =>
                    setState((prev) => ({ ...prev, ...location.state }))
                );
        }

    }, []);

    const { searchMovies, query } = state;

    return (

        <div className={styles.movies}>
            <h2 className={styles.movies_title}>Movies</h2>
            <form className={styles.movies_form} onSubmit={onFormSubmit}>
                <input
                    className={styles.movies_formInput}
                    type="text"
                    placeholder="Search movies"
                    onChange={onHandleChange}
                    value={query}
                />
                <button type="submit" className={styles.movies_formBtn}>
                    <span className={styles.movies_formBtnLabel}>Search</span>
                </button>
            </form>
            <ul className={styles.movies_searchList}>
                {searchMovies &&
                    searchMovies.map((movie, index) => (
                        <li
                            className={styles.movies_searchListItem}
                            key={`${movie.id}${index}`}
                        >
                            <NavLink
                                className={styles.movies_searchListLink}
                                to={{
                                    pathname: `${match.url}/${movie.id}`,

                                    state: {
                                        from: location.pathname,
                                        query: query,
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

export default MoviesPage;