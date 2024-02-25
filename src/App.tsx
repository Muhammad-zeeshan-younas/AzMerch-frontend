import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./Redux/store/store";
import { ToastContainer } from "react-toastify";

import AppRoutes from "./Routes";

function App() {
  return (
    <Provider store={store}>
      <ToastContainer position="top-right" />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
