import type { RouteObject } from "react-router-dom";
import BasicLayout  from "../layouts/BasicLayout/BasicLayout";


export const routes: RouteObject[] = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      // {
      //   index: true,
      //   element: <HomePage />,
      // },
    //   {
    //     path: "/article/:id",
    //     element: <Article />,
    //   },
    ],
  },

];