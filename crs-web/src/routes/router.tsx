import Home from "./Home";
import NotFound from "./NotFound";

const routes = [
  {
    path: "/",
    errorElement: <NotFound />,
    children: [{ path: "/", element: <Home /> }],
  },
];

export default routes;
