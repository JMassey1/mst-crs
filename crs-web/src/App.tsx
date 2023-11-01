import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Navbar";
import routes from "./routes/router";

const router = createBrowserRouter(routes);

function App(): JSX.Element {
  return (
    <div>
      <Nav />
      <div className="container mt-3">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
