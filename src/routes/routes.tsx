import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../components/Layouts/AdminLayout";
import { UserLayout } from "../components/Layouts/UserLayout";
import {
  AddLanguages,
  AddRecord,
  AddTranslate,
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
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
      {
        path: "/record/:id",
        element: <Record />,
      },
      {
        path: "/records",
        element: <RecordsTable />,
      },
      {
        path: "/add-records",
        element: <AddRecord />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/entities",
        element: <Entity />,
      },
      {
        path: "/users",
        element: <UsersTable />,
      },
      {
        path: "/add-user",
        element: <User />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/version",
        element: <Version />,
      },
      {
        path: "/console",
        element: <Console />,
      },
      {
        path: "/translates",
        element: <TranslatesTable />,
      },
      {
        path: "/add-translate",
        element: <AddTranslate />,
      },
      {
        path: "/add-language",
        element: <AddLanguages />,
      },
      {
        path: "/languages",
        element: <LanguagesTable />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const userRouter = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <RecordsTable />,
      },
      {
        path: "/buy",
        element: <Buy />,
      },
      {
        path: "/entities",
        element: <Entity />,
      },
      {
        path: "/user/:id",
        element: <User />,
      },
      {
        path: "/version",
        element: <Version />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export const authRouter = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    index: true,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
