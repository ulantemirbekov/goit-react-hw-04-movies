import React, { useState, useEffect, Suspense } from "react";
import {
    NavLink,
    Route,
    Switch,
    useHistory,
    useLocation,
    useRouteMatch,
} from "react-router-dom";
import { fetchMovieDetails } from "../../../api/Api";
import moviesDetailsRoutes from "../../../routes/MoviesDetailsRoutes";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
    const [state, setState] = useState({});
    const [from, setFrom] = useState({});
    const match = useRouteMatch();
    const history = useHistory();
    const location = useLocation();

    const getMovieDetails = async (id) => {
        const result = await fetchMovieDetails(id);

        setState({ ...result });
    };
    useEffect(() => {
        setFrom({ ...location.state });
        getMovieDetails(history.location.state.movieId);

    }, []);

    const goBack = () => {
        from.query
            ? history.push(
                {
                    pathname: from.from,
                    search: `?query=${from.query}`,
                    state: {
                        from: from.from,
                        query: from.query,
                    },
                }
            )
            : history.push(from.from);
    };

    const {
        id,
        poster_path,
        title,
        release_date,
        vote_average,
        overview,
        genres,
    } = state;

    return (
        <div className={styles.details}>
            <button className={styles.details_Btn} type="button" onClick={goBack}>
                Go Back
        </button>
            <div className={styles.details_info}>
                {poster_path && (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                        alt={title}
                        width="250px"
                    />
                )}
                <div className={styles.details_infoDescription}>
                    <h2 className={styles.details_infoTitle}>
                        {title} ({release_date && release_date.slice(0, 4)})
            </h2>
                    <span className={styles.details_infoList}>
                        User score: {vote_average * 10}%
            </span>
                    <h3 className={styles.details_infoTitle}>Overview</h3>
                    <span className={styles.details_infoList}>{overview}</span>
                    <h3 className={styles.details_infoTitle}>Genres</h3>
                    <ul className={styles.details_infoGenre}>
                        {genres &&
                            genres.map((item) => (
                                <li className={styles.details_infoGenreItem} key={item.id}>
                                    {item.name}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            <div className={styles.inform}>
                <h4 className={styles.details_infoTitle}>Additional information</h4>
                <ul className={styles.inform_list}>
                    {moviesDetailsRoutes.map(({ name, path, exact }) => (
                        <li className={styles.inform_listItem} key={`${id}${name}`}>
                            <NavLink
                                to={{
                                    pathname: `${match.url}${path}`,
                                    state: { ...location.state },
                                }}
                                exact={exact}
                                className={styles.inform_listItemLink}
                                activeClassName={styles.inform_listItemLinkActive}>
                                {name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <Suspense fallback={<h2>Loading...</h2>}>
                <Switch>
                    {moviesDetailsRoutes.map(({ path, exact, component }) => (
                        <Route
                            path={`${match.url}${path}`}
                            exact={exact}
                            key={`${id}${path}`}
                            component={component}
                        />
                    ))}
                </Switch>
            </Suspense>
        </div >
    );
};

export default MovieDetailsPage;