import "./App.css";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import { TUserInterface } from "./types/userType";
import userContext from "./utils/apis/userContext";

function App() {
  const [user, setUser] = useState<TUserInterface | null>(null);
  const [isLoading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkIfTokenExists = () => {
    return !!localStorage.getItem("accessToken");
  };

  const retrieveUser = async () => {
    if (checkIfTokenExists()) {
      setLoading(true);

      await userContext
        .getUser()
        .then((response: any) => {
          setUser(response.data.user);
          setLoading(false);
        })
        .catch(() => {
          setUser(null);
          setLoading(false);
        });
    } else {
      setUser(null);
      setLoading(false);
    }
  };

  return (
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
