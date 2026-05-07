import "./App.css";
import TopNavBar from "./components/navigation/top-navbar";
import Hero from "./components/sections/hero";

function App() {
  return (
    <main className="min-h-screen bg-bg text-black font-body overflow-y-scroll scroll-smooth">
      <TopNavBar />
      <Hero />
      
      {/* Placeholder sections for navigation */}
      <div id="services-sticky" className="h-screen bg-cream flex items-center justify-center">
        <h2 className="text-4xl font-display font-bold">Services Section</h2>
      </div>
      <div id="cta" className="h-screen bg-white flex items-center justify-center">
        <h2 className="text-4xl font-display font-bold">CTA / Contact Section</h2>
      </div>
    </main>
  );
}

export default App;

