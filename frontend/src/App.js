import React from "react";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./pages/home";
import SignIn from "./components/login/login";
import SignUp from "./components/login/signup";
import AdminDashboard from "./pages/adminDashboard";
import ProductDescriptionPage from "./pages/product";
import Category from "./pages/category";
import CartHome from "./pages/cart";
import { useRecoilState } from "recoil";
import userAtom from "./atom/userAtom.js";
import WishList from "./pages/wishlist.js";
import "./App.css"
import PlaceOrderPage from "./pages/placeOrderPage.js";
import TransactionSuccessPage from "./pages/success.js";
import TransactionFailedPage from "./pages/cancel.js";
import NavBar from "./components/home/navBar.js";
import { Container } from "@mui/material";

const App = () => {
  const [user, setUser] = useRecoilState(userAtom)
  return (
    <>
    <NavBar />
    <Routes>
      <Route path="/" element={ <HomePage />} />
      <Route path="/login" element={ !user ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={ !user ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/dashboard" element={ <AdminDashboard />} />
      <Route path="/cart" element={ <CartHome />} />
      <Route path="/placeOrder" element={ <PlaceOrderPage />} />
      <Route path="/success" element={ <TransactionSuccessPage />} />
      <Route path="/cancel" element={ <TransactionFailedPage />} />
      <Route path="/wishlist" element={ <WishList />} />
      <Route path="/category/:cid" element={ <Category />} />
      <Route path="/product/:pid" element={ <ProductDescriptionPage />} />
    </Routes>
    </>
  );
}

export default App;
