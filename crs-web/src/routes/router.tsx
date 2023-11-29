import Home from "./Home";
import NotFound from "./NotFound";
import Reserve from "./Reserve";

const routes = [
  {
    path: "/",
    errorElement: <NotFound />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/reserve/:roomId", element: <Reserve /> },
    ],
  },
];

export default routes;
