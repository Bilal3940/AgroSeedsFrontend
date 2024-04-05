import React, { useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  SignupPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  FAQPage,
  CheckoutPage,
  PaymentPage,
  OrderSuccessPage,
  ProductDetailsPage,
  ProfilePage,
  ShopCreatePage,
  ShopLoginPage,
  OrderDetailsPage,
} from "./routes/Routes.js";
import {
  ShopDashboardPage,
  ShopCreateProduct,
  ShopAllProducts,
  ShopPreviewPage,
  ShopAllOrders,
  ShopOrderDetails,
  ShopSettingsPage,
} from "./routes/ShopRoutes";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Store from "./redux/store";
import { loadSeller, loadUser } from "./redux/actions/user";
import ProtectedRoute from "./routes/ProtectedRoute";
import { ShopHomePage } from "./ShopRoutes.js";
import SellerProtectedRoute from "./routes/SellerProtectedRoute";
import { getAllProducts } from "./redux/actions/product";

import axios from "axios";
import { server } from "./server";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import EventsPage from "./pages/EventsPage.jsx";
import Cookies from "js-cookie";
import ShopActivation from "./pages/Shop/ShopActivation.jsx";
import Inbox from "./components/inbox/Inbox.jsx";

const App = () => {
  const [stripeApikey, setStripeApiKey] = useState("");
  // const [user, setuser] = useState({})

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }
  // async function getUser (){
  //   const token = Cookies.get("token")
  //   const user = await axios.get("https://agroseedsserver.vercel.app/api/v2/user/getuser", {
  //       headers: {
  //         'x-access-token': token,
  //       },
      
  //   });
  //   setuser(user)
  // }
  useEffect(() => {
    // getUser()
    Store.dispatch(loadUser())
    Store.dispatch(loadSeller());
    Store.dispatch(getAllProducts());
    // getStripeApikey();
  }, []);

  return (
    <BrowserRouter>
     
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={
       
        <LoginPage />
     
        } />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/products" element={ <ProtectedRoute><ProductsPage /></ProtectedRoute>} />
        <Route path="/product/:id" element={<ProductDetailsPage />} />
        <Route path="/yield-pediction" element={<BestSellingPage />} />
        <Route path="/price-prediction" element={<EventsPage/>} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
          
         
        <Route
              path="/payment"
              element={
                <PaymentPage/>
              }
            />
        
        <Route path="/order/success" element={<OrderSuccessPage />} />
        <Route
          path="/inbox"
          element={
            <ProtectedRoute>
              <Inbox />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/user/track/order/:id"
          element={
            <ProtectedRoute>
              <OrderDetailsPage />
            </ProtectedRoute>
          }
        />
        
        <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
        {/* shop Routes */}
        <Route path="/shop-create" element={<ShopCreatePage />} />
        <Route path="/activate-shop" element={<ShopActivation/>} />

        <Route path="/shop-login" element={<ShopLoginPage />} />
        <Route
          path="/shop/:id"
          element={
            <SellerProtectedRoute>
              <ShopHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <SellerProtectedRoute>
              <ShopSettingsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <ShopDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <ShopCreateProduct />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-orders"
          element={
            <SellerProtectedRoute>
              <ShopAllOrders />
            </SellerProtectedRoute>
          }
        />

        <Route
          path="/order/:id"
          element={
            <SellerProtectedRoute>
              <ShopOrderDetails />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <ShopAllProducts />
            </SellerProtectedRoute>
          }
        />

 
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
