import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Splash from "./pages/onboardingpg/Splash";
import Onboarding from "./pages/onboardingpg/Onboarding";
import Home from "./pages/homepg/Home";
import Stadium from "./pages/stadiumpg/Stadium";
import StadiumPgSeat from "./pages/stadiumpg/StadiumPgSeat";
import Ground from "./pages/groundpg/Ground";
import Lockerroom from "./pages/lockerroompg/Lockerroom";
import PlayerDetail from "./pages/homepg/PlayerDetail";
import TeamRank from "./pages/homepg/TeamRank";

const App = () => {
  return (
    <Routes>
      <Route path="/splash" element={<Splash />} />
      <Route path="/onboarding" element={<Onboarding />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="stadium" element={<Stadium />} />
        <Route path="stadium/seat" element={<StadiumPgSeat />} />
        <Route path="ground" element={<Ground />} />
        <Route path="lockerroom" element={<Lockerroom />} />
        <Route path="player/:id" element={<PlayerDetail />} />
        <Route path="teamrank" element={<TeamRank />} />
      </Route>
    </Routes>
  );
};

export default App;
