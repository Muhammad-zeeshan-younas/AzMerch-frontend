import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Navbar from "../components/Navbar/Navbar";
import { useCallback, useEffect, useState } from "react";
import { user, setUser } from "..//Redux/reducers/slices/userSlice";
import userContext from "../utils/apis/userContext";
import ProductDetails from "../pages/ProductDeatils";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../pages/Checkout/Index";
const AppRoutes = () => {
  const LoggedinUser = useSelector(user).isLoggedIn;
  const User = useSelector(user);
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  const checkIfTokenExists = () => {
    return !!localStorage.getItem("accessToken");
  };

  const retrieveUser = useCallback(async () => {
    if (checkIfTokenExists()) {
      setLoading(true);

      await userContext
        .getUser()
        .then((response: any) => {
          dispatch(setUser({ ...response.data, isLoggedIn: true }));
          setLoading(false);
        })
        .catch(() => {
          dispatch(
            setUser({
              id: "",
              username: "",
              email: "",
              avatar: "",
              isLoggedIn: false,
            })
          );
          setLoading(false);
        });
    } else {
      setUser({
        id: "",
        username: "",
        email: "",
        avatar: "",
        isLoggedIn: false,
      });
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    retrieveUser();
  }, []);
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:slug" element={<ProductDetails />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
