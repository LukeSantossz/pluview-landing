import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Features from './sections/Features'
import Gallery from './sections/Gallery'
import Roadmap from './sections/Roadmap'
import Team from './sections/Team'
import CTA from './sections/CTA'
import Footer from './sections/Footer'

function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Navbar />
      <main className="relative">
        <Hero />
        <About />
        <Features />
        <Gallery />
        <Roadmap />
        <Team />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
