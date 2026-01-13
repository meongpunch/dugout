import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Splash from "./pages/Splash";
import Onboarding from "./pages/Onboarding";
import Home from "./pages/Home";
import Stadium from "./pages/Stadium";
import Ground from "./pages/Ground";
import Lockerroom from "./pages/Lockerroom";
import PlayerDetail from "./pages/PlayerDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stadium" element={<Stadium />} />
        <Route path="ground" element={<Ground />} />
        <Route path="lockerroom" element={<Lockerroom />} />
        <Route path="player/:id" element={<PlayerDetail />} />
      </Route>
    </Routes>
  );
};

export default App;
