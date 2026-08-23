import {NavBar} from "../components/NavBar"
import {Hero} from "../components/Hero"
import {About} from "../components/About"

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      {/* Temporaire pour tester le scroll */}
      <div
        style={{
          height: "150vh",
          background: "#111",
        }}
      />
    </>
  );
}
