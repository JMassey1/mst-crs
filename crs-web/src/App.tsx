import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import { UserContextProvider } from "./contexts/UserAuthContext";
import routes from "./routes/router";

const router = createBrowserRouter(routes);

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <Nav />
      <div className="container mt-3">
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  );
}

export default App;
