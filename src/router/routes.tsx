import type { RouteObject } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout/BasicLayout";
import HomePage from "../pages/HomePage";
import ActivityPage from "../pages/global_nav/ActivityPage";
import ArticlePage from "../pages/global_nav/ArticlePage";
import CoursePage from "../pages/global_nav/CoursePage";
import DocumentPage from "../pages/global_nav/DocumentPage";
import QAPage from "../pages/global_nav/QAPAge";
import ArticleDetail from "../pages/ArticleDetail";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "activity",
        element: <ActivityPage />,
      },
      {
        path: "article",
        children: [
          {
            index: true,
            element: <ArticlePage />,
          },
          {
            path: ":id", 
            element: <ArticleDetail />,
          },
        ],
      },
      {
        path: "course",
        element: <CoursePage />,
      },
      {
        path: "document",
        element: <DocumentPage />,
      },
      {
        path: "qa",
        element: <QAPage />,
      },
      //   {
      //     path: "/article/:id",
      //     element: <Article />,
      //   },
    ],
  },
];
