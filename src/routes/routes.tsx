import { createBrowserRouter, Navigate } from "react-router-dom";
import { LanguageWrapper } from "../components/Language/LanguageWrapper";
import { AdminLayout } from "../components/Layouts/AdminLayout";
import { UserLayout } from "../components/Layouts/UserLayout";
import {
  AddRecord,
  Auth,
  Buy,
  Console,
  Dashboard,
  Entity,
  LanguagesTable,
  NotFound,
  RecordsTable,
  Stats,
  TranslatesTable,
  User,
  UsersTable,
  Version,
} from "../pages";
import { Record } from "../pages/Record";
export const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
  {
    path: "/:lang",
    element: <LanguageWrapper />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
          {
            path: "record/:id",
            element: <Record />,
          },
          {
            path: "records",
            element: <RecordsTable />,
          },
          {
            path: "add-records",
            element: <AddRecord />,
          },
          {
            path: "buy",
            element: <Buy />,
          },
          {
            path: "entities",
            element: <Entity />,
          },
          {
            path: "users",
            element: <UsersTable />,
          },
          {
            path: "user/add-user",
            element: <User />,
          },
          {
            path: "user/:id",
            element: <User />,
          },
          {
            path: "version",
            element: <Version />,
          },
          {
            path: "console",
            element: <Console />,
          },
          {
            path: "translates",
            element: <TranslatesTable />,
          },
          {
            path: "languages",
            element: <LanguagesTable />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/en" replace />,
  },
]);

export const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
  {
    path: "/:lang",
    element: <LanguageWrapper />,
    children: [
      {
        element: <UserLayout />,
        children: [
          {
            index: true,
            element: <RecordsTable />,
          },
          {
            path: "buy",
            element: <Buy />,
          },
          {
            path: "entities",
            element: <Entity />,
          },
          {
            path: "user/:id",
            element: <User />,
          },
          {
            path: "record/:id",
            element: <Record />,
          },
          {
            path: "version",
            element: <Version />,
          },
          {
            path: "*",
            element: <NotFound />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/en" replace />,
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/en" replace />,
  },
  {
    path: "/:lang",
    element: <LanguageWrapper />,
    children: [
      {
        element: <Auth />,
        index: true,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/en" replace />,
  },
]);
