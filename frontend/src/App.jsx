
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound.jsx';  // Ensure we're using the JSX version
import { Toaster } from "@/components/ui/toaster";
import CrownSummary from './pages/CrownSummary.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/crown-summary" element={<CrownSummary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
