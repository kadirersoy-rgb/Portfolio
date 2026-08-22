import {NavBar} from "../components/NavBar"
import {Hero} from "../components/Hero"

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
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
