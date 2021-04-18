import { lazy } from "react";

const mainRoutes = [
    {
        path: "/",
        name: "Home",
        exact: true,
        component: lazy(() =>
            import(
                "../pages/homepage/HomePage" /* webpackChunkName: "HomePage"*/
            )
        ),
    },
    {
        path: "/movies",
        name: "Movies",
        exact: true,
        component: lazy(() =>
            import(
                "../pages/moviespage/MoviesPage" /* webpackChunkName: "MoviesPage"*/
            )
        ),
    },
];

export default mainRoutes;