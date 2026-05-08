import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import TopNavBar from "./components/navigation/top-navbar";
import SubmitBrief from "./components/sections/submit-brief";
import Hero from "./components/sections/hero";
import Metrics from "./components/sections/metrics";
import Services from "./components/sections/services";
import ContactPage from "./pages/contact";
import Footer from "./components/navigation/footer";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SelectionProvider } from "./context/SelectionContext";
import InteractiveBackground from "./components/ui/interactive-background";
import ScrollToTop from "./components/navigation/scroll-to-top";

gsap.registerPlugin(ScrollTrigger);

function HomePage() {
  return (
    <>
      <Hero />
      <Metrics />
      <Services />
      <SubmitBrief />
    </>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <main className="min-h-screen w-full text-black font-body scroll-smooth flex flex-col relative overflow-x-hidden">
      <InteractiveBackground />
      <TopNavBar />
      <div className="grow relative z-10">
        <Routes key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
}

function App() {
  return (
    <SelectionProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AppContent />
      </BrowserRouter>
    </SelectionProvider>
  );
}

export default App;

