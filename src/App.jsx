import { useEffect, useState } from "react";
import "./App.css";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
  useNavigate,
} from "react-router-dom";
import Cart from "./component/cart/Cart";
import Layout from "./component/layout/Layout";
import Register from "./component/Register/Register";
import Login from "./component/logIn/Login";
import ProductDetails from "./component/productDetails/ProductDetails";
import NotFoundPage from "./component/notFoundPage/NotFoundPage";
import AllOrders from "./component/allOrders/AllOrders";
import { Helmet } from "react-helmet";
import Brands from "./component/brands/Brands";
import Home from "./component/home/Home";
import jwtDecode from "jwt-decode";
import Logout from "./component/logout/Logout";
import Profile from "./component/profile/Profile";
import CartContextProvider from "./context/CartContext";
import Payment from "./component/payment/Payment.1";
import toast, { Toaster } from "react-hot-toast";
import Categories from "./component/categories/Categories";
import CategoriesProducts from "./component/categories/categoriesProducts/CategoriesProducts";

function App() {
  function ProtectedRoute({ children }) {
    if (crrUser == null) {
      return <Navigate to="/Login" />;
    } else {
      return <> {children} </>;
    }
  }

  const [crrUser, setcrrUser] = useState(null);

  // I write this function in app because i need the decoded data in more than one of the childern
  function decodeUserData() {
    const decodedUserData = jwtDecode(localStorage.getItem("tkn"));
    // i store decodedUserData in state because i want if there is any change in data the app rerender
    setcrrUser(decodedUserData);
  }

  // i write this equation here because it beside the equation of decodedUserData its related with it so i need to write them in the smae place
  function clearDecodedUserData() {
    localStorage.clear("tkn");
    setcrrUser(null);
  }

  const router = createHashRouter([
    {
      path: "/",
      element: (
        <Layout crrUser={crrUser} clearDecodedUserData={clearDecodedUserData} />
      ),
      children: [
        {
          index: true,
          element: (
            <CartContextProvider>
              <Home />
            </CartContextProvider>
          ),
        },
        {
          path: "home",
          element: (
            <CartContextProvider>
              <Home />
            </CartContextProvider>
          ),
        },
        {
          path: "categoriesProducts/:id",
          element: (
            <CartContextProvider>
              <CategoriesProducts />
            </CartContextProvider>
          ),
        },

        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <CartContextProvider>
                <Cart />
              </CartContextProvider>
            </ProtectedRoute>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <CartContextProvider>
              <ProductDetails />
            </CartContextProvider>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <AllOrders crrUser={crrUser} />
            </ProtectedRoute>
          ),
        },
        { path: "brands", element: <Brands /> },
        { path: "register", element: <Register /> },
        {
          path: "Profile",
          element: (
            <ProtectedRoute>
              <Profile crrUser={crrUser} />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: <Login decodeUserData={decodeUserData} crrUser={crrUser} />,
        },

        {
          path: "Payment",
          element: (
            <ProtectedRoute>
              <CartContextProvider>
                <Payment />
              </CartContextProvider>
            </ProtectedRoute>
          ),
        },
      ],
    },

    { path: "*", element: <NotFoundPage /> },
  ]);

  // when the user reload the page , react rerender again and the user has to Login again so we make this useeffect and the function in it will reload every time the user Reload
  useEffect(function () {
    if (localStorage.getItem("tkn") != null && crrUser == null) {
      decodeUserData();
    }
  }, []);
  return (
    <>
      <Toaster />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
