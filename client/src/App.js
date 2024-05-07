import { Routes, Route } from "react-router-dom";
import './App.css';
// import Hero from "./pages/hero";
import Home from "./Home"
import HomePage from "./pages/HomePage";
// import rentalPage from "./pages/rentalPage"
import About from "./pages/About";
import Contact from "./pages/Contact";
import Policy from "./pages/Policy";
import Pagenotfound from "./pages/Pagenotfound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
// import Services from "./pages/Services"

import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Layout/Routes/Private";
import Loading from "./components/Loading";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import AdminRoute from "./components/Layout/Routes/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateCategory from "./pages/admin/CreateCategory";
import CreateProduct from "./pages/admin/CreateProduct";
import Users from "./pages/admin/Users";
import Orders from "./pages/user/Orders";
import Profile from "./pages/user/Profile";
import Product from "./pages/admin/Product";
import UpdateProduct from "./pages/admin/UpdateProduct";
import SearchPage from "./pages/SearchPage";
import ProductDetails from "./pages/ProductDetails";
import CartPage from "./pages/CartPage";
import AdminOrder from "./pages/admin/AdminOrder";
import OrderDetails from "./pages/admin/OrderDetails";

function App() {
  return (
    <div>
      <Routes>
      <Route path="/" element = {<Home />}/>
        <Route path="/Product" element = {<HomePage />}/>
        {/* <Route path="/rentalPage" element = {<rentalPage />}/> */}
        {/* <Route path="/product" element={<HomePage />} /> */}
        <Route path="/search" element={<SearchPage />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/category" element={<Policy />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* <Route path="/Servies" element ={<Services/>}/> */}

        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
        </Route>

        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/orders" element={<AdminOrder />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/order-details" element={<OrderDetails />} />
        </Route>

        <Route path="*" element={<Pagenotfound />} />
        <Route path="/spiner" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
