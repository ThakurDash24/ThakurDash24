import { useState, lazy, Suspense } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

// Lazy load non-critical sections for better performance
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Research = lazy(() => import('./sections/Research'))
const Resume = lazy(() => import('./sections/Resume'))

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

            <div className="content-wrapper">
                <main>
                    <Home />
                    <About />
                    <Skills />
                    <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
                        <Projects />
                        <Experience />
                        <Research />
                        <Resume />
                    </Suspense>
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App
