import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../../../src/pages/HomePage";
import AboutPage from "../../../src/pages/AboutPage";
import LoginPage from "../../../src/pages/Login";
import SignUpPage from "../../../src/pages/SignUp";
import ForgotPasswordPage from "../../../src/pages/ForgotPassword";
import ShopPage from "../../../src/pages/ShopPage";
import ShopDetailsPage from "../../../src/pages/ShopDetails";
import ShoppingCartPage from "../../../src/pages/ShoppingCart";
import CheckoutPage from "../../../src/pages/Checkout";
import ClassPage from "../../../src/pages/Class";
import WishlistPage from "../../../src/pages/Wishlist";
import TeamRegisterPage from "../../../src/pages/TeamRegister";
import BlogDetailsPage from "../../../src/pages/BlogDetails";
import BlogPage from "../../../src/pages/Blog";
import ContactPage from "../../../src/pages/Contact";
import AddProductPage from "../../../src/pages/AddProduct";
import ResetPasswordPage from "../../../src/pages/ResetPassword";
import ViewProfilePage from "../../../src/pages/ViewProfilePage";
import AddAddressPage from "../../../src/pages/AddAddressPage";
import ViewAllAddressPage from "../../../src/pages/ViewAllAddressPage";

function AppRoutes() {
  return (
    <>
      {/* <Header /> */}
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<Layout />} />
          <Route index element={<HomePage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/addProduct" element={<AddProductPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/shopDetails" element={<ShopDetailsPage />} />
          <Route path="/shoppingCart" element={<ShoppingCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/class" element={<ClassPage />} />
          <Route path="/registerToTeam" element={<TeamRegisterPage />} />
          <Route path="/blogDetails" element={<BlogDetailsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/viewDetails" element={<ViewProfilePage />} />
          <Route path="/addEditAddress" element={<AddAddressPage />} />
          <Route path="/viewAllAddress" element={<ViewAllAddressPage />} />
        </Routes>
      </BrowserRouter>
      {/* <Footer /> */}
    </>
  );
}

export default AppRoutes;
