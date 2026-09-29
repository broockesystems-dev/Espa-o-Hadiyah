import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Timeline from "@/components/Timeline";
import Stage from "@/components/Stage";
import GrandDay from "@/components/GrandDay";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import { weddingTimeline } from "@/data/weddingTimeline";

export default function Home() {
  return (
    <>
      <Header />
      <main id="conteudo">
        <Hero />
        <Intro />
        <Timeline />
        {weddingTimeline.map((stage) =>
          stage.variant === "grand-day" ? (
            <GrandDay key={stage.id} stage={stage} />
          ) : (
            <Stage key={stage.id} stage={stage} />
          ),
        )}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
