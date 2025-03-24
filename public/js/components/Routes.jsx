import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../../../src/pages/HomePage";
import AboutPage from "../../../src/pages/AboutPage";
import LoginPage from "../../../src/pages/Login";
import SignUpPage from "../../../src/pages/SignUp";
import ForgotPasswordPage from "../../../src/pages/ForgotPassword";
import ShopPage from "../../../src/pages/ShopPage";
import ShoppingCartPage from "../../../src/pages/ShoppingCart";
import CheckoutPage from "../../../src/pages/Checkout";
import ClassPage from "../../../src/pages/Class";
import WishlistPage from "../../../src/pages/Wishlist";
import TeamRegisterPage from "../../../src/pages/TeamRegister";
import ContactPage from "../../../src/pages/Contact";
import AddProductPage from "../../../src/pages/AddProduct";
import ResetPasswordPage from "../../../src/pages/ResetPassword";
import ViewProfilePage from "../../../src/pages/ViewProfilePage";
import AddAddressPage from "../../../src/pages/AddAddressPage";
import ViewAllAddressPage from "../../../src/pages/ViewAllAddressPage";
import PageNotFound from "../../../src/pages/PageNotFound";
import AddTeamMemberPage from "../../../src/pages/AddTeamMember";

import {LoginRoute, PrivateRoute} from "../../../src/pages/Auth/PrivateRoutes"
import {UserNotAuthorized} from "../../../src/pages/Auth/UserNotAuthorizedPage"
import {UserNotAuthenticated} from "../../../src/pages/Auth/UserNotAuthenticatedPage"

function AppRoutes() {
  return (
    <>
      <BrowserRouter>

        <Routes>
        
          <Route  element={<Layout />} >
          <Route index element={<HomePage />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/resetPassword" element={<ResetPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* only logged in users can access these pages */}
          <Route path="/shoppingCart" element={<LoginRoute Component={ShoppingCartPage } />} />
          <Route path="/checkout" element={<LoginRoute Component={CheckoutPage } />} />
          <Route path="/wishlist" element={<LoginRoute Component={WishlistPage } />} />
          <Route path="/class" element={<LoginRoute Component={ClassPage } />} />
          <Route path="/registerToTeam" element={<LoginRoute Component={TeamRegisterPage } />} />
          <Route path="/viewDetails" element={<LoginRoute Component={ViewProfilePage } />} />
          <Route path="/addEditAddress" element={<LoginRoute Component={AddAddressPage } />} />
          <Route path="/viewAllAddress" element={<LoginRoute Component={ViewAllAddressPage } />} />
          

          {/* only the admin can access these pages */}
          <Route path="/addProduct" element={<PrivateRoute Component={AddProductPage } />} />
          <Route path="/viewAllRegistrations" element={<PrivateRoute Component={AddTeamMemberPage } />} />
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