import "./App.css";
import Summarizer  from "./components/Summarizer";
import Hero from "./components/Hero";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Hero/>
        <Summarizer/>
      </div>
    </main>
  );
};

export default App;
