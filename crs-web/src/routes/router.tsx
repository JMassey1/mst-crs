import AccountPage from "./Account";
import Home from "./Home";
import Reserve from "./Reserve";
import NotFound from "./errors/NotFound";
import NotLoggedIn from "./errors/NotLoggedIn";

const routes = [
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/reserve/:roomId", element: <Reserve /> },
      { path: "/forbidden", element: <NotLoggedIn /> },
      { path: "/account", element: <AccountPage /> },
    ],
  },
];

export default routes;
