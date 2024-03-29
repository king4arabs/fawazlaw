import DarkblueSection from "./components/DarkblueSection";
import Hero from "./components/Hero";
import HomeSection1 from "./components/HomeSection1";
import HomeSection3 from "./components/HomeSection3";
import NavBar from "./components/NavBar";
import Truts from "./components/Truts";

function App() {
  return (
    <div className=" overflow-hidden">
      <NavBar />
      <Hero />
      <HomeSection1 />
      <Truts />
      <DarkblueSection />
      <HomeSection3 />
    </div>
  );
}

export default App;
