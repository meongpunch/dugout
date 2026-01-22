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
import StadiumSeatDetail from "./pages/stadiumpg/StadiumSeatDetail";
import TodayQuiz from "./pages/homepg/TodayQuiz";
import ScrollToTop from "./components/ScrollToTop";
import Md from "./pages/homepg/Md";
import LockerroomEditProfile from "./pages/lockerroompg/LockerroomEditProfile";
import Login from "./pages/onboardingpg/Login";
import TeamChoice from "./pages/onboardingpg/TeamChoice";
import GroundTopic from "./pages/groundpg/GroundTopic";
import StadiumPgReview from "./pages/stadiumpg/StadiumPgReview";
import OnboardingTopBar from "./components/OnboardingTopBar";
import Calendar from "./pages/lockerroompg/Calendar";
import Review from "./pages/lockerroompg/Review";
import ChatbotWidget from "./components/ChatbotWidget";
import ReviewComplete from "./pages/lockerroompg/ReviewComplete";
import Ticket from "./pages/lockerroompg/Ticket";
import { GuideProvider } from "./contexts/GuideContext";
import GroundPostDetail from "./pages/groundpg/GroundPostDetail";

const App = () => {
  return (
    <GuideProvider>
      <ScrollToTop />
      <ChatbotWidget />
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teamchoice" element={<TeamChoice />} />
        <Route
          path="/onboardingtopbar"
          element={<OnboardingTopBar iconType="back" skipType="skip" />}
        />
        <Route path="/lockerroom/review/:id" element={<Review />} />
        <Route
          path="/lockerroom/review/complete/:id"
          element={<ReviewComplete />}
        />
        <Route path="/lockerroom/calendar/ticket/:date" element={<Ticket />} />

        <Route path="/stadium" element={<Stadium />} />
        <Route path="/stadium/seat" element={<StadiumPgSeat />} />
        <Route path="/stadium/seat/section" element={<StadiumSeatDetail />} />
        <Route path="/stadium/seat/review" element={<StadiumPgReview />} />

        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />

          <Route path="/ground" element={<Ground />} />
          <Route path="/ground/post" element={<GroundPostDetail />} />
          <Route path="/topic" element={<GroundTopic />} />
          <Route path="/lockerroom" element={<Lockerroom />} />
          <Route path="/player/:id" element={<PlayerDetail />} />
          <Route path="/teamrank" element={<TeamRank />} />
          <Route path="/Quiz" element={<TodayQuiz />} />
          <Route path="/shop" element={<Md />} />
          <Route path="/lockerroom/edit" element={<LockerroomEditProfile />} />
          <Route path="/lockerroom/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </GuideProvider>
  );
};

export default App;
