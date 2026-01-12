import React from 'react'
import ReactDOM from 'react-dom/client'
import OneFileWebsite from './components/OneFileWebsite'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <OneFileWebsite
            brandName="mindbenT media"
            heroTagline="Media Reimagined"
            heroHeadlineOne="WE DON'T"
            heroHeadlineTwo="JUST POST."
            heroHeadlineAccent="WE BEND REALITY."
            heroDescription="Direct, data-driven strategies injected with chaos and personality. Stop scrolling, start stopping the scroll."
            ctaButtonText="Get Your Free Audit"
        />
    </React.StrictMode>,
)
