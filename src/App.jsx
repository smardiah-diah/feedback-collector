import { Routes, Route } from "react-router-dom";
import Dashboard from './pages/Dashboard';
import FeedbackForm from './pages/FeedbackForm';
import ThankYou from './pages/ThankYou';
import EnterCode from './pages/EnterCode';
import Login from "./pages/LoginForm.jsx";
import TestSupabase from './pages/TestSupabase';

function App() {
  return (
    <Routes>
      <Route path="/" element={<EnterCode />} />
      <Route path="/form/feedback" element={<FeedbackForm />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/test" element={<TestSupabase />} />
    </Routes>
  );
}

export default App;
