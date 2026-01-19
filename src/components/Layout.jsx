import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import "./Layout.css";
import ChatbotWidget from "./ChatbotWidget";

const Layout = () => {
  return (
    <div className="layout">
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
