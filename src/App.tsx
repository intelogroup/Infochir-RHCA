import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import RHCA from "./pages/RHCA";
import IGM from "./pages/IGM";
import ADC from "./pages/ADC";
import IndexMedicus from "./pages/IndexMedicus";
import Admin from "./pages/Admin";
import { Navbar } from "./components/Navbar";
import AuthPage from "./pages/Auth";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const hideNavbarPaths = ['/igm', '/rhca', '/index-medicus', '/adc', '/auth', '/admin'];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/rhca" element={<RHCA />} />
        <Route path="/igm" element={<IGM />} />
        <Route path="/adc" element={<ADC />} />
        <Route path="/index-medicus" element={<IndexMedicus />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;