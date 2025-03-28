import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import ForgotPasswordPage from "../pages/ForgotPassword";
import ShopPage from "../pages/ShopPage";
import ShoppingCartPage from "../pages/ShoppingCart";
import CheckoutPage from "../pages/Checkout";
import ClassPage from "../pages/Class";
import WishlistPage from "../pages/Wishlist";
import TeamRegisterPage from "../pages/TeamRegister";
import ContactPage from "../pages/Contact";
import AddProductPage from "../pages/AddProduct";
import ResetPasswordPage from "../pages/ResetPassword";
import ViewProfilePage from "../pages/ViewProfilePage";
import AddAddressPage from "../pages/AddAddressPage";
import ViewAllAddressPage from "../pages/ViewAllAddressPage";
import PageNotFound from "../pages/PageNotFound";
import AddTeamMemberPage from "../pages/AddTeamMember";
import SuccessPayment from "../pages/Successpayment";
import FailedPayment from "../pages/Failedpayment";
import ChatWithUsPage from "../pages/ChatWithUs";
import ViewOrderHistory from "../pages/ViewOrderHistory";

import { LoginRoute, PrivateRoute } from "../pages/Auth/PrivateRoutes";
import { UserNotAuthorized } from "../pages/Auth/UserNotAuthorizedPage";
import { UserNotAuthenticated } from "../pages/Auth/UserNotAuthenticatedPage";
import ScrollToTop from "./ScrollToTop";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/signUp" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
            <Route path="/resetPassword" element={<ResetPasswordPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* only logged in users can access these pages */}
            <Route
              path="/shoppingCart"
              element={<LoginRoute Component={ShoppingCartPage} />}
            />
            <Route
              path="/checkout"
              element={<LoginRoute Component={CheckoutPage} />}
            />
            <Route
              path="/wishlist"
              element={<LoginRoute Component={WishlistPage} />}
            />
            <Route
              path="/class"
              element={<LoginRoute Component={ClassPage} />}
            />
            <Route
              path="/registerToTeam"
              element={<LoginRoute Component={TeamRegisterPage} />}
            />
            <Route
              path="/viewDetails"
              element={<LoginRoute Component={ViewProfilePage} />}
            />
            <Route
              path="/addEditAddress"
              element={<LoginRoute Component={AddAddressPage} />}
            />
            <Route
              path="/viewAllAddress"
              element={<LoginRoute Component={ViewAllAddressPage} />}
            />
            <Route
              path="/successPayment"
              element={<LoginRoute Component={SuccessPayment} />}
            />
            <Route
              path="/failedPayment"
              element={<LoginRoute Component={FailedPayment} />}
            />
            <Route
              path="/chatWithUs"
              element={<LoginRoute Component={ChatWithUsPage} />}
            />
            <Route
              path="/viewOrderHistory"
              element={<LoginRoute Component={ViewOrderHistory} />}
            />

            {/* only the admin can access these pages */}
            <Route
              path="/addProduct"
              element={<PrivateRoute Component={AddProductPage} />}
            />
            <Route
              path="/viewAllRegistrations"
              element={<PrivateRoute Component={AddTeamMemberPage} />}
            />
          </Route>

          <Route path="/userNotAuthenticated" element={<UserNotAuthorized />} />
          <Route path="/userNotAuthorized" element={<UserNotAuthenticated />} />

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
