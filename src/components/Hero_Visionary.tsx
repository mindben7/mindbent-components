import React from "react"
import { Globe, ArrowRight, Sparkles } from "lucide-react"
import ReactPlayer from "react-player"

interface HeroProps {
    brandName: string;
    heroTagline: string;
    heroHeadlineOne: string;
    heroHeadlineTwo: string;
    heroHeadlineAccent: string;
    heroDescription: string;
    ctaButtonText: string;
}

export default function Hero_Visionary(props: HeroProps) {
    return (
        <section className="relative w-full min-h-screen bg-[#000510] text-white font-sans overflow-hidden flex items-center justify-center">

            {/* Ethereal Background Blobs */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/30 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/30 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }}></div>

            {/* Grid Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

            <div className="max-w-6xl mx-auto px-6 w-full relative z-20 flex flex-col items-center text-center">

                <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors cursor-default">
                    <Sparkles size={14} className="text-cyan-400" />
                    <span className="text-sm tracking-wide text-cyan-200">{props.heroTagline}</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-cyan-100 to-slate-400">
                        {props.heroHeadlineOne} <br /> {props.heroHeadlineTwo}
                    </span>
                </h1>

                <p className="text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed">
                    {props.heroDescription}
                </p>

                {/* Glassmorphic Video Card */}
                <div className="w-full max-w-4xl aspect-[21/9] rounded-3xl overflow-hidden relative border border-white/10 shadow-[0_0_50px_rgba(0,100,255,0.2)] group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 z-10 pointer-events-none"></div>

                    <ReactPlayer
                        url="https://vimeo.com/990744884/dfcf032b50"
                        playing
                        loop
                        muted
                        width="100%"
                        height="100%"
                        config={{
                            vimeo: {
                                playerOptions: {
                                    background: 1,
                                    autoplay: 1,
                                    loop: 1,
                                    byline: 0,
                                    portrait: 0,
                                    title: 0
                                }
                            }
                        }}
                    />

                    {/* Floating HUD Elements */}
                    <div className="absolute bottom-6 left-6 z-20 flex items-center gap-4">
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-8 py-3 rounded-2xl font-bold transition-all flex items-center gap-2">
                            {props.ctaButtonText} <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

            </div>
        </section>
    )
}
