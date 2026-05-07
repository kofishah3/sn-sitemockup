import "./App.css";
import TopNavBar from "./components/navigation/top-navbar";
import Hero from "./components/sections/hero";
import Metrics from "./components/sections/metrics";
import Services from "./components/sections/services";

function App() {
  return (
    <main className="min-h-screen w-full bg-bg text-black font-body scroll-smooth">
      <TopNavBar />
      <Hero />
      <Metrics />
      <Services />

      <div
        id="cta"
        className="h-screen bg-white flex items-center justify-center"
      >
        <h2 className="text-4xl font-display font-bold">
          CTA / Contact Section
        </h2>
      </div>
    </main>
  );
}

export default App;
