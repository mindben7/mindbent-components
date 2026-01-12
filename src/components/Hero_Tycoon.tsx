import React from "react"
import { Play, ArrowRight, ArrowUpRight } from "lucide-react"
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

export default function Hero_Tycoon(props: HeroProps) {
    return (
        <section className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden flex items-center">
            {/* Subtle Background Texture */}
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #333 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto px-8 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Text Content */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="h-[1px] w-12 bg-[#D4AF37]"></div> {/* Gold Line */}
                        <span className="text-[#D4AF37] tracking-[0.2em] text-xs font-serif uppercase">Premium Consulting</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-serif leading-tight text-white">
                        {props.heroHeadlineOne} <br />
                        <span className="italic text-gray-400">{props.heroHeadlineTwo}</span>
                    </h1>

                    <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light border-l border-white/10 pl-6">
                        {props.heroDescription}
                    </p>

                    <div className="pt-4 flex items-center gap-6">
                        <button className="group bg-white text-black px-8 py-4 rounded-sm font-medium hover:bg-[#D4AF37] hover:text-white transition-all duration-300 flex items-center gap-2">
                            {props.ctaButtonText}
                            <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                        <button className="text-white/60 hover:text-[#D4AF37] transition-colors text-sm tracking-widest uppercase border-b border-transparent hover:border-[#D4AF37]">
                            View Portfolio
                        </button>
                    </div>
                </div>

                {/* Video / Visual */}
                <div className="lg:col-span-7 relative">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-sm">
                        {/* Overlay for cinematic feel */}
                        <div className="absolute inset-0 bg-black/20 z-10"></div>

                        <div className='player-wrapper w-full h-full relative'>
                            <ReactPlayer
                                url="https://vimeo.com/990744884/dfcf032b50"
                                playing
                                loop
                                muted
                                width="100%"
                                height="100%"
                                style={{ position: 'absolute', top: 0, left: 0, objectFit: 'cover' }}
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
                        </div>
                    </div>

                    {/* Floating 'Stamp' */}
                    <div className="absolute -bottom-8 -left-8 bg-[#1a1a1a] p-6 border border-[#333] hidden md:block">
                        <div className="text-[#D4AF37] text-4xl font-serif">25+</div>
                        <div className="text-gray-500 text-xs tracking-wider uppercase mt-1">Years of<br />Excellence</div>
                    </div>
                </div>
            </div>
        </section>
    )
}
