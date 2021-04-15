import { lazy } from "react";

const movieDetailsRoutes = [
    {
        path: "/cast",
        name: "Cast",
        exact: true,
        component: lazy(() =>
            import(
                "../components/pages/moviedetails/details/cast/Cast" /* webpackChunkName: "Cast"*/
            )
        ),
    },
    {
        path: "/reviews",
        name: "Reviews",
        exact: true,
        component: lazy(() =>
            import(
                "../components/pages/moviedetails/details/reviews/Reviews" /* webpackChunkName: "Reviews"*/
            )
        ),
    },
];

export default movieDetailsRoutes;