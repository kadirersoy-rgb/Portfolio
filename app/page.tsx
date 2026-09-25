import {NavBar} from "../components/NavBar"
import {Hero} from "../components/Hero"
import {About} from "../components/about"
import {Skills} from "../components/Skills/Skills"
import CosmicTransition from "../components/Cosmic/CosmicTransition"
import JourneySection from "../components/Timeline/JourneySection"

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <JourneySection />
      <CosmicTransition />
      <Skills />
    </>
  );
}
