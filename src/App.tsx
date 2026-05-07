import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TopNavBar from "./components/navigation/top-navbar";
import SubmitBrief from "./components/sections/submit-brief";
import Hero from "./components/sections/hero";
import Metrics from "./components/sections/metrics";
import Services from "./components/sections/services";
import ContactPage from "./pages/contact";

import Footer from "./components/navigation/footer";

function HomePage() {
  return (
    <>
      <TopNavBar />
      <Hero />
      <Metrics />
      <Services />
      <SubmitBrief />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <main className="min-h-screen w-full bg-bg text-black font-body scroll-smooth">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
