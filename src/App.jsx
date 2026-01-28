import { useState, Suspense, lazy } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import Home from './sections/Home'
import Footer from './sections/Footer'

// Lazy load below-the-fold content
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Research = lazy(() => import('./sections/Research'))
const Resume = lazy(() => import('./sections/Resume'))
const Contact = lazy(() => import('./sections/Contact'))

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);

    return (
        <div className={`app ${isContentVisible ? 'content-visible' : ''}`}>
            {isLoading && (
                <LoadingScreen
                    onComplete={() => setIsLoading(false)}
                    onFadeOutStart={() => setIsContentVisible(true)}
                />
            )}

            <div className="luxury-bg-container">
                <div className="luxury-orb orb-1"></div>
                <div className="luxury-orb orb-2"></div>
                <div className="luxury-orb orb-3"></div>
            </div>

            <Header />
            <ScrollProgress />

            <div className="content-wrapper">
                <main>
                    <Home />
                    <Suspense fallback={<div style={{ height: '100vh' }}></div>}>
                        <About />
                        <Skills />
                        <Projects />
                        <Experience />
                        <Research />
                        <Resume />
                        <Contact />
                    </Suspense>
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App
