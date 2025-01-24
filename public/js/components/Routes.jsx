import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../../../src/pages/HomePage";
import AboutPage from "../../../src/pages/AboutPage";
import LoginPage from "../../../src/pages/Login";
import SignUpPage from "../../../src/pages/SignUp";
import ShopPage from "../../../src/pages/ShopPage";
import ShopDetailsPage from "../../../src/pages/ShopDetails";
import ShoppingCartPage from "../../../src/pages/ShoppingCart";
import CheckoutPage from "../../../src/pages/Checkout";
import ClassPage from "../../../src/pages/Class";
import WishlistPage from "../../../src/pages/Wishlist";
import BlogDetailsPage from "../../../src/pages/BlogDetails";
import BlogPage from "../../../src/pages/Blog";
import ContactPage from "../../../src/pages/Contact";
// import Header from "./Header";
// import Footer from "./Footer";

function AppRoutes() {
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>
        {/* <NavLink to="/">Home</NavLink>
        <NavLink to="/signUp">SignUpPage</NavLink>
        <NavLink to="/login">LoginPage</NavLink>
        <NavLink
          to="/about"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          AboutPage
        </NavLink>
        <NavLink
          to="/shop"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          ShopPage
        </NavLink>
        <NavLink to="/shopDetails">ShopDetailsPage</NavLink>
        <NavLink to="/shoppingCart">ShoppingCartPage</NavLink>
        <NavLink to="/checkout">CheckoutPage</NavLink>
        <NavLink to="/wishlist">WishlistPage</NavLink>
        <NavLink to="/class">ClassPage</NavLink>
        <NavLink to="/blogDetails">BlogDetailsPage</NavLink>
        <NavLink to="/blog">BlogPage</NavLink>
        <NavLink to="/contact">ContactPage</NavLink> */}

        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<HomePage />} />
          <Route path="signUp" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shopDetails" element={<ShopDetailsPage />} />
          <Route path="shoppingCart" element={<ShoppingCartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="class" element={<ClassPage />} />
          <Route path="blogDetails" element={<BlogDetailsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  );
}

export default AppRoutes;
