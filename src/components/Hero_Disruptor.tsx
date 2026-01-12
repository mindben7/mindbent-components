import React from "react"
import { ArrowRight, Zap, Target } from "lucide-react"
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

export default function Hero_Disruptor(props: HeroProps) {
    return (
        <section className="relative w-full min-h-screen bg-black text-white font-sans overflow-hidden flex flex-col justify-center border-b border-white/10">

            <div className="max-w-[1400px] mx-auto px-6 w-full relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Bold Typography Left */}
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 bg-[#CCFF00] text-black px-3 py-1 text-xs font-bold uppercase tracking-tighter transform -rotate-2">
                            <Zap size={12} fill="black" />
                            <span>{props.heroTagline}</span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.85] text-white">
                            {props.heroHeadlineOne} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-white">{props.heroHeadlineTwo}</span>
                        </h1>

                        <div className="h-2 w-32 bg-[#CCFF00] my-8"></div>

                        <p className="text-xl md:text-2xl font-medium text-gray-300 max-w-lg leading-tight">
                            {props.heroDescription}
                        </p>

                        <div className="pt-8">
                            <button className="w-full md:w-auto bg-white text-black px-10 py-5 text-xl font-bold hover:bg-[#CCFF00] transition-colors flex items-center justify-between gap-8 border-2 border-transparent">
                                {props.ctaButtonText}
                                <ArrowRight strokeWidth={3} />
                            </button>
                        </div>
                    </div>

                    {/* Brutalist Video Container Right */}
                    <div className="relative">
                        {/* Decorative background blocks */}
                        <div className="absolute top-0 right-0 w-full h-full bg-[#CCFF00] translate-x-4 translate-y-4 z-0"></div>

                        <div className="relative z-10 w-full aspect-square md:aspect-[4/3] bg-zinc-900 border-4 border-black overflow-hidden">
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

                            {/* Overlay Text inside video */}
                            <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm p-4 border border-white/20">
                                <div className="flex items-center gap-3 text-[#CCFF00]">
                                    <Target size={20} />
                                    <span className="font-mono text-sm">TARGET ACQUIRED</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Ticker Bottom */}
            <div className="absolute bottom-0 left-0 w-full bg-[#CCFF00] text-black overflow-hidden py-2 whitespace-nowrap">
                <div className="animate-marquee inline-block font-black text-lg tracking-widest">
                   /// REVENUE LEAK DETECTED /// AUDIT IN PROGRESS /// SCALE YOUR BRAND /// {props.heroHeadlineAccent} ///
                    REVENUE LEAK DETECTED /// AUDIT IN PROGRESS /// SCALE YOUR BRAND /// {props.heroHeadlineAccent} ///
                </div>
            </div>
            <style>{`
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 20s linear infinite;
                }
            `}</style>
        </section>
    )
}
