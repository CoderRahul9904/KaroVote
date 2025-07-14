
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import PollCreation from "./pages/PollCreation";
import PollDashboard from "./pages/PollDashboard";
import VotingPage from "./pages/VotingPage";
import ResultsPage from "./pages/ResultsPage";
import AdminView from "./pages/AdminView";
import JoinPoll from "./pages/JoinPoll";
import LoginSignup from "./pages/LoginSignup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<PollCreation />} />
          <Route path="/poll/:id/dashboard" element={<PollDashboard />} />
          <Route path="/poll/:id/vote" element={<VotingPage />} />
          <Route path="/poll/:id/results" element={<ResultsPage />} />
          <Route path="/poll/:id/admin" element={<AdminView />} />
          <Route path="/join" element={<JoinPoll />} />
          <Route path="/auth" element={<LoginSignup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
