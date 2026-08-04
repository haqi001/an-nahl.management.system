import Navbar from "@/components/landing/navbar";
import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import TimelinePreview from "@/components/landing/timeline-preview";
import CompetitionPreview from "@/components/landing/competition-preview";
import Footer from "@/components/landing/footer";

export default function Home() {
  return (
    <main>

      <Navbar />

      <Hero />

      <About />

      <TimelinePreview />

      <CompetitionPreview />

      <Footer />

    </main>
  );
}