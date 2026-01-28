import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Header from './components/Header'
import Home from './sections/Home'
import About from './sections/About'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Research from './sections/Research'
import Resume from './sections/Resume'

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
                    <Projects />
                    <Experience />
                    <Research />
                    <Resume />
                    <Contact />
                </main>
                <Footer />
            </div>
        </div>
    )
}

export default App
