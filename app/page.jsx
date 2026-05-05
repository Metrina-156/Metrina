import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import SkillsOrbit from './components/SkillsOrbit';
import Work from './components/Work';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <Marquee />
      <section id="about">
        <About />
      </section>
      <SkillsOrbit />
      <section id="work">
        <Work />
      </section>
      <Testimonials />
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
