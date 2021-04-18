import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchMovieCast } from "../../api/Api";
import styles from "./Cast.module.css";

const Cast = () => {
    const [state, setState] = useState({});
    const location = useLocation();

    const getCast = async (id) => {
        try {
            const result = await fetchMovieCast(id);
            setState({ ...result });

        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        getCast(location.state.movieId);

    }, []);

    const { cast } = state;
    return (
        <div className={styles.cast}>
            <ul className={styles.cast_list}>
                {cast &&
                    cast.map((item) => (
                        <li className={styles.cast_listItem} key={item.id}>
                            <img
                                className={styles.cast_listItemImg}
                                src={`https://image.tmdb.org/t/p/w500${item.profile_path}`}
                                alt={item.name}
                                width="100px"
                            />
                            <p className={styles.cast_listItemName}> {item.name}</p>
                            <p className={styles.cast_listItemCharacter}>
                                Role: {item.character}
                            </p>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Cast;