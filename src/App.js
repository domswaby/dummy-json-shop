import "./App.css";
import { useState } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import AuthGuard from "./components/Auth/AuthGuard.js";
import UnAuthGuard from "./components/Auth/UnAuthGuard";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/SignUp";
import Account from "./components/Account/Account";
import Product from "./components/Product/Product";

import { AppContext } from "./Contexts/AppContext";
import { AppContextProvider } from "./Contexts/AppContext";
import Cart from "./components/Cart/Cart";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />}>
        <Route index element={<Home />}></Route>
        <Route
          path="dashboard"
          element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          }
        ></Route>
        <Route path="/product/:id" element={<Product />}></Route>
        <Route path="/account" element={<Account />}></Route>
        <Route path="/cart" element={<Cart />}></Route>
        {/* <Route path="/account/:accountId" element={<Account />}></Route> */}
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
      </Route>
    )
  );

  return (
    <div>
      <AppContextProvider>
        <div className="App-container">
          <RouterProvider router={router} />
        </div>
      </AppContextProvider>
    </div>
  );
}

const Root = () => {
  return (
    <>
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default App;
