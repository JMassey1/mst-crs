import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import NavHeader from "./components/Nav";
import { UserContextProvider } from "./contexts/UserAuthContext";
import routes from "./routes/router";

const router = createBrowserRouter(routes);

function App(): JSX.Element {
  return (
    <UserContextProvider>
      <NavHeader />
      <ToastContainer position="bottom-right" theme="dark" autoClose={2000} hideProgressBar={false} newestOnTop={false} pauseOnHover closeOnClick />
      <div className="container mt-3">
        <RouterProvider router={router} />
      </div>
    </UserContextProvider>
  );
}

export default App;
