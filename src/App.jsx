import { useState, Suspense, lazy, useEffect, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import ScrollProgress from './components/ScrollProgress'
import ChatbotIcon from './components/ChatbotIcon'
import Footer from './sections/Footer'
import { BeamsBackground } from './components/ui/beams-background'

// Lazy load ALL sections for proper suspense coordination
const Home = lazy(() => import('./sections/Home'))
const About = lazy(() => import('./sections/About'))
const Skills = lazy(() => import('./sections/Skills'))
const Certifications = lazy(() => import('./sections/Certifications'))
const Projects = lazy(() => import('./sections/Projects'))
const Experience = lazy(() => import('./sections/Experience'))
const Research = lazy(() => import('./sections/Research'))
const Resume = lazy(() => import('./sections/Resume'))
const Contact = lazy(() => import('./sections/Contact'))

// Main content component - triggers suspense for all lazy components
function MainContent({ onAllLoaded }) {
    useEffect(() => {
        // Signal that all components have loaded
        onAllLoaded();
    }, [onAllLoaded]);

    return (
        <>
            <main>
                <Home />
                <About />
                <Skills />
                <Certifications />
                <Projects />
                <Experience />
                <Research />
                <Resume />
                <Contact />
            </main>
            <Footer />
        </>
    );
}

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const [allComponentsLoaded, setAllComponentsLoaded] = useState(false);

    const handleAllLoaded = useCallback(() => {
        setAllComponentsLoaded(true);
    }, []);

    return (
        <BeamsBackground 
            intensity="subtle" 
            active={isContentVisible}
            className={`app ${isContentVisible ? 'content-visible' : ''}`}
        >
            {isLoading && (
                <LoadingScreen
                    onComplete={() => setIsLoading(false)}
                    onFadeOutStart={() => setIsContentVisible(true)}
                    allComponentsLoaded={allComponentsLoaded}
                />
            )}

            <Header />
            <ScrollProgress />
            <ChatbotIcon />

            <div className="content-wrapper">
                <Suspense fallback={null}>
                    <MainContent onAllLoaded={handleAllLoaded} />
                </Suspense>
            </div>
        </BeamsBackground>
    )
}

export default App
