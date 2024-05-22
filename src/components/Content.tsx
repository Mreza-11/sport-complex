import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ChooseSessions from "../pages/ChangeSessions";
import CoachRequests from "../pages/CoachRequests";

const Content = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/choose-sessions" element={<ChooseSessions />} />
      <Route path="/coach-requests" element={<CoachRequests />} />
    </Routes>
  );
};

export default Content;
