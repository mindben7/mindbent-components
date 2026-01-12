import * as React from "react"
import { useState, useEffect } from "react"

// --- IMPORT INSTRUCTIONS ---
// FOR PREVIEW HERE: Use the standard import below.
import {
    Play,
    ArrowRight,
    Zap,
    BarChart,
    Instagram,
    Linkedin,
    Mail,
    Menu,
    X,
    CheckCircle,
    Layers,
    Cpu,
    Globe,
} from "lucide-react"
import ReactPlayer from "react-player"


// FOR FRAMER: Comment out the line above and UNCOMMENT the lines below.
// import { Play, ArrowRight, Zap, BarChart, Instagram, Linkedin, Mail, Menu, X, CheckCircle, Layers, Cpu, Globe } from "https://esm.sh/lucide-react@0.263.1?deps=react@18.2.0"
// import ReactPlayer from "https://esm.sh/react-player@2.14.1?deps=react@18.2.0"
// import { addPropertyControls, ControlType } from "framer"

// --- Tailwind Injection Helper ---
const useTailwind = () => {
    useEffect(() => {
        const existingScript = document.getElementById("tailwind-script")
        if (!existingScript) {
            const script = document.createElement("script")
            script.id = "tailwind-script"
            script.src = "https://cdn.tailwindcss.com"
            script.async = true
            document.head.appendChild(script)
        }
    }, [])
}

// --- Custom Styles for Film Grain & Animation ---
const customStyles = `
    .film-grain {
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E");
        mix-blend-mode: overlay;
    }
    @keyframes glitch {
        0% { transform: translate(0) }
        20% { transform: translate(-2px, 2px) }
        40% { transform: translate(-2px, -2px) }
        60% { transform: translate(2px, 2px) }
        80% { transform: translate(2px, -2px) }
        100% { transform: translate(0) }
    }
    .glitch-effect {
        animation: glitch 0.3s cubic-bezier(.25, .46, .45, .94) both infinite;
    }

    /* Subtle Signal Background Animation */
    @keyframes signal-pulse {
        0% {
            transform: scale(0.95);
            opacity: 0.3;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.6;
        }
        100% {
            transform: scale(0.95);
            opacity: 0.3;
        }
    }
    .signal-bg {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
    }
    .signal-layer {
        position: absolute;
        inset: -50%;
        background: radial-gradient(circle at center, rgba(236, 72, 153, 0.1) 0%, transparent 60%), radial-gradient(circle at center, rgba(34, 211, 238, 0.1) 0%, transparent 60%);
        opacity: 0.4;
        mix-blend-mode: screen;
        animation: signal-pulse 8s ease-in-out infinite alternate;
    }
    .signal-layer:nth-child(2) {
        animation-delay: -4s;
        opacity: 0.3;
        background: radial-gradient(circle at center, rgba(236, 72, 153, 0.05) 0%, transparent 70%), radial-gradient(circle at center, rgba(34, 211, 238, 0.05) 0%, transparent 70%);
    }
    .video-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        overflow: hidden;
        z-index: 0;
    }
    .video-wrapper iframe {
        width: 100vw;
        height: 56.25vw; /* 16:9 Aspect Ratio */
        min-height: 100vh;
        min-width: 177.77vh; /* 16:9 Aspect Ratio */
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
    }
    .luma-ambient {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 0;
        pointer-events: none;
        background: 
            radial-gradient(circle at 15% 50%, rgba(236, 72, 153, 0.08), transparent 25%), 
            radial-gradient(circle at 85% 30%, rgba(59, 130, 246, 0.08), transparent 25%);
        filter: blur(60px);
        animation: luma-shift 15s ease-in-out infinite alternate;
    }
    @keyframes luma-shift {
        0% { transform: scale(1); opacity: 0.5; }
        50% { transform: scale(1.1); opacity: 0.8; }
        100% { transform: scale(1); opacity: 0.5; }
    }
    @keyframes pink-vibe {
        0%, 100% { transform: translate(0, 0) skewX(0); }
        90% { transform: translate(0, 0) skewX(0); }
        92% { transform: translate(-1px, 1px) skewX(-5deg); }
        94% { transform: translate(1px, -1px) skewX(5deg); }
        96% { transform: translate(0, 1px) skewX(0); }
        98% { transform: translate(1px, 0) skewX(-2deg); }
    }
    .pink-motion {
        display: inline-block; /* Required for transform */
        animation: pink-vibe 4s infinite;
    }

`

interface MindBenTProps {
    brandName: string;
    heroTagline: string;
    heroHeadlineOne: string;
    heroHeadlineTwo: string;
    heroHeadlineAccent: string;
    heroDescription: string;
    ctaButtonText: string;
}

// We add 'props' here to accept inputs from the Framer sidebar
export default function MindbenT_Homepage(props: MindBenTProps) {
    useTailwind()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)


    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Helper to safely unwrap components (handling ESM default exports and ForwardRef objects)
    // This fixes "Element type is invalid" and "Cannot add property current, object is not extensible" errors.
    const resolveComponent = (Component: any) => {
        const extracted = Component?.default || Component;
        // If it's a ForwardRef object (has .render function), we unwrap it to a plain function
        // and explicitly pass null as the ref to avoid React passing a frozen legacy context object.
        if (extracted && typeof extracted === 'object' && typeof extracted.render === 'function') {
            const RenderFn = extracted.render;
            return (props: any) => RenderFn(props, null);
        }
        return extracted;
    };

    // Pre-resolve VideoPlayer
    const ResolvedVideoPlayer = resolveComponent(ReactPlayer);

    const SERVICES_DATA = [
        {
            Icon: Layers,
            title: "Content Strategy + Direction",
            subtitle: "Positioning • Concepts • Content System",
            desc: "We build the plan behind the content—what to say, what to show, and how to stay consistent without burning out.",
            details: "Includes: content pillars • hooks/topics • light scripting • shot plans • creative direction",
            color: "border-pink-500",
            hover: "hover:shadow-[0_0_30px_#FF00FF]",
        },
        {
            Icon: Cpu,
            title: "Production",
            subtitle: "Video • Photo • Events • Drone",
            desc: "High-end capture for brands, spaces, and experiences—designed to look premium and perform on social.",
            details: "Includes: talking heads • hospitality/interiors • event coverage • drone/aerial • on-site capture days",
            color: "border-cyan-400",
            hover: "hover:shadow-[0_0_30px_#00FFFF]",
        },
        {
            Icon: Globe,
            title: "Channel Management + Distribution",
            subtitle: "Post • Publish • Channel Management",
            desc: "You don’t just get files—you get reach. We edit, version, write captions, and publish across multiple networks so your content works harder everywhere.",
            details: "Includes: vertical + horizontal versions • captions/hashtags • scheduling • cross-platform posting • basic channel upkeep",
            color: "border-yellow-400",
            hover: "hover:shadow-[0_0_30px_#FFFF00]",
        },
    ];

    // Pre-resolve Icons
    const RESOLVED_SERVICES = SERVICES_DATA.map(service => ({
        ...service,
        IconComponent: resolveComponent(service.Icon)
    }));

    const PACKAGES_DATA = [
        {
            name: "The Spark",
            price: "$997",
            desc: "For brands that need a heartbeat.",
            features: [
                "12 Static Posts / Month",
                "2 Custom Reels / Shorts",
                "Hashtag & SEO Strategy",
                "Basic Community Management",
                "Monthly Performance Report",
                "1 Social Platform Included",
                "Content Calendar Access",
                "3 Revision Rounds",
            ],
            color: "border-blue-400",
            btn: "bg-blue-400",
        },
        {
            name: "The Frequency",
            price: "$2,497",
            desc: "Consistent, high-voltage output.",
            popular: true,
            features: [
                "20 Mixed Posts (Static/Carousel)",
                "6 High-Production Reels",
                "Daily Community Engagement (1hr)",
                "Competitor Analysis Deep Dive",
                "Story Strategy (3x Weekly)",
                "Bi-Weekly Strategy Calls",
                "2 Social Platforms Included",
                "Priority Support",
                "Trend Jacking Alerts",
            ],
            color: "border-pink-500",
            btn: "bg-pink-500",
        },
        {
            name: "Mind Bender",
            price: "Custom",
            desc: "Total reality takeover.",
            features: [
                "Daily Content (30+ Assets)",
                "Viral Engineering & Scripting",
                "On-site Production Days",
                "24/7 Crisis Management",
                "Influencer Outreach Program",
                "Cross-Platform Dominance (4+)",
                "Dedicated Creative Director",
                "Unlimited Revisions",
                "Paid Ad Creative Management",
                "Raw File Access",
            ],
            color: "border-purple-500",
            btn: "bg-purple-500",
        },
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden relative">
            <style>{customStyles}</style>

            {/* Luma Ambient Background */}
            <div className="luma-ambient"></div>

            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"}`}
            >
                <div className="w-full px-6 md:px-12 flex items-center justify-between">
                    <div className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-lg">
                        {props.brandName}
                    </div>

                    <div className="hidden lg:flex space-x-12 text-xl font-black tracking-widest">
                        <a
                            href="#"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">THE STUDIO</span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#services"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">SERVICES</span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#packages"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">PACKAGES</span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#audit"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">FREE AUDIT</span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                    </div>

                    <button className="hidden md:block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105">
                        LET'S TALK
                    </button>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center space-y-8 text-2xl font-bold">
                    <a href="#" onClick={() => setIsMenuOpen(false)}>
                        THE STUDIO
                    </a>
                    <a href="#services" onClick={() => setIsMenuOpen(false)}>
                        SERVICES
                    </a>
                    <a href="#packages" onClick={() => setIsMenuOpen(false)}>
                        PACKAGES
                    </a>
                    <a
                        href="#audit"
                        onClick={() => setIsMenuOpen(false)}
                        className="text-pink-500"
                    >
                        FREE AUDIT
                    </a>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* Video Background with Cover Fix */}
                <div className="video-wrapper">
                    <ResolvedVideoPlayer
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
                </div>
                <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>

                {/* Content */}
                <div className="relative z-20 w-full px-6 md:px-12 text-center space-y-10">
                    <h1 className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter text-white mix-blend-screen">
                        {props.heroHeadlineOne} <br />
                        {props.heroHeadlineTwo} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            {props.heroHeadlineAccent}
                        </span>
                    </h1>
                    <div className="inline-block px-6 py-2 border-2 border-pink-500 rounded-full text-pink-500 text-sm font-black tracking-[0.3em] uppercase mb-4 animate-pulse">
                        {props.heroTagline}
                    </div>
                    <p className="text-gray-200 text-xl md:text-3xl max-w-4xl mx-auto font-bold drop-shadow-xl leading-relaxed">
                        {props.heroDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8">
                        <button className="px-12 py-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-black text-2xl hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] hover:scale-105 transition-all text-white flex items-center justify-center gap-4 animate-bounce-subtle border-4 border-white/20">
                            GET YOUR FREE AUDIT <ArrowRight size={32} />
                        </button>
                    </div>
                </div>
            </section>


            {/* SERVICES SECTION WITH ANIMATED BACKGROUND */}
            <section id="services" className="py-16 bg-zinc-900 relative">
                <div className="signal-bg">
                    <div className="signal-layer"></div>
                    <div className="signal-layer"></div>
                </div>
                <div className="w-full px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2
                            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase glitch"
                            data-text="THE SIGNAL"
                        >
                            THE <span className="text-pink-500 pink-motion">SIGNAL</span>
                        </h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            We don't just make noise. We broadcast a signal so
                            strong it breaks through the static.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {RESOLVED_SERVICES.map((service, index) => (
                            <div
                                key={index}
                                className={`bg-black border-2 ${service.color} p-8 rounded-3xl relative group transition-all duration-300 hover:-translate-y-2 ${service.hover}`}
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    <service.IconComponent size={48} className={service.color.replace("border", "text")} />
                                </div>
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide text-white">
                                    {service.title}
                                </h3>
                                <p
                                    className={`text-sm font-bold mb-4 tracking-widest uppercase ${service.color.replace("border", "text")}`}
                                >
                                    {service.subtitle}
                                </p>
                                <p className="text-gray-400 leading-relaxed mb-4">
                                    {service.desc}
                                </p>
                                {/* New Details Section */}
                                <p className="text-xs text-gray-500 font-mono border-t border-gray-800 pt-3 opacity-80">
                                    {service.details}
                                </p>
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <ArrowRight
                                        className={service.color.replace(
                                            "border",
                                            "text"
                                        )}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Packages (Adjusted Padding) */}
            <section
                id="packages"
                className="py-24 w-full px-6 md:px-12"
            >
                <div className="text-center mb-20">
                    <h2 className="text-6xl md:text-8xl font-bold mb-8">
                        CHOOSE YOUR{" "}
                        <span className="text-pink-500 pink-motion">REALITY</span>
                    </h2>
                    <p className="text-gray-400 text-2xl max-w-3xl mx-auto font-medium">
                        Whether you need a spark or a supernova, we have a
                        package that fits. No hidden fees. No boring contracts.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {PACKAGES_DATA.map((pkg, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-3xl bg-zinc-900 border-2 ${pkg.color} ${pkg.popular ? "transform md:-translate-y-4 shadow-[0_0_30px_rgba(236,72,153,0.2)]" : "border-opacity-30"}`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-8 py-2 rounded-full text-sm font-black uppercase tracking-widest shadow-lg">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-3xl md:text-4xl font-black mb-4 text-white">
                                {pkg.name}
                            </h3>
                            <div className="text-6xl md:text-7xl font-black mb-6 tracking-tighter">
                                {pkg.price}
                                <span className="text-xl md:text-2xl text-gray-500 font-bold ml-2">
                                    /mo
                                </span>
                            </div>
                            <p className="text-gray-400 text-xl mb-4 h-16 font-medium leading-tight">
                                {pkg.desc}
                            </p>
                            <ul className="space-y-6 mb-12">
                                {pkg.features.map((feat, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-4 text-lg font-medium text-gray-300"
                                    >
                                        <CheckCircle
                                            size={24}
                                            className={`flex-shrink-0 mt-1 ${pkg.popular
                                                ? "text-pink-500"
                                                : "text-gray-600"
                                                }`}
                                        />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-6 rounded-2xl font-black text-xl text-white transition-all hover:opacity-90 hover:scale-[1.02] ${pkg.btn}`}
                            >
                                Select Package
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            {/* The Audit (Lead Gen) - Adjusted Top Margin */}
            <section
                id="audit"
                className="py-12 md:py-16 bg-gradient-to-b from-black to-purple-900/20"
            >
                <div className="max-w-5xl mx-auto px-6 text-center bg-zinc-900/50 backdrop-blur-lg border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -mr-24 -mt-24 w-80 h-80 bg-pink-500 rounded-full blur-[100px] opacity-20"></div>
                    <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500/20 rounded-full mb-6 md:mb-8">
                            <BarChart className="text-pink-500" size={40} />
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-6 md:mb-8 leading-tight">
                            Is Your Social Media <br />{" "}
                            <span className="text-pink-500 pink-motion">
                                Leaking Money?
                            </span>
                        </h2>
                        <p className="text-gray-300 text-2xl mb-8 md:mb-12 max-w-2xl mx-auto font-medium">
                            Get a free, no-holds-barred audit of your current
                            digital presence. We'll tell you exactly what's
                            working, what's failing, and how to fix it.
                        </p>

                        <form className="max-w-2xl mx-auto space-y-6">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-8 py-6 bg-black border-2 border-gray-800 rounded-2xl focus:outline-none focus:border-pink-500 text-white text-xl font-bold placeholder:font-medium"
                            />
                            <input
                                type="text"
                                placeholder="Your Instagram Handle (@)"
                                className="w-full px-8 py-6 bg-black border-2 border-gray-800 rounded-2xl focus:outline-none focus:border-pink-500 text-white text-xl font-bold placeholder:font-medium"
                            />
                            <button className="w-full bg-white text-black font-black text-2xl py-6 rounded-2xl hover:bg-pink-500 hover:text-white transition-all transform hover:scale-[1.02]">
                                Reveal My Score
                            </button>
                        </form>
                        <p className="text-sm text-gray-500 mt-6 font-bold uppercase tracking-widest">
                            No credit card required.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-24 border-t border-white/10 relative z-10 bg-black">
                <div className="w-full px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transition-transform cursor-default">
                        mindbenT media
                    </div>
                    <div className="text-gray-500 text-lg font-bold tracking-widest uppercase">
                        © 2026 MindbenT Media. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    )
}

// --- DEFAULT PROPS (For Preview) ---
MindbenT_Homepage.defaultProps = {
    brandName: "mindbenT media",
    heroTagline: "Media Reimagined",
    heroHeadlineOne: "WE DON'T",
    heroHeadlineTwo: "JUST POST.",
    heroHeadlineAccent: "WE BEND REALITY.",
    heroDescription:
        "Direct, data-driven strategies injected with chaos and personality. Stop scrolling, start stopping the scroll.",
    ctaButtonText: "Get Your Free Audit",
}

// --- FRAMER PROPERTY CONTROLS (UNCOMMENT THIS BLOCK IN FRAMER) ---
/*
addPropertyControls(MindbenT_Homepage, {
    brandName: {
        type: ControlType.String,
        title: "Brand Name",
        defaultValue: "mindbenT media",
    },
    heroTagline: {
        type: ControlType.String,
        title: "Tagline",
        defaultValue: "Media Reimagined",
    },
    heroHeadlineOne: {
        type: ControlType.String,
        title: "Headline Line 1",
        defaultValue: "WE DON'T",
    },
    heroHeadlineTwo: {
        type: ControlType.String,
        title: "Headline Line 2",
        defaultValue: "JUST POST.",
    },
    heroHeadlineAccent: {
        type: ControlType.String,
        title: "Headline Accent",
        defaultValue: "WE BEND REALITY.",
    },
    heroDescription: {
        type: ControlType.String,
        title: "Description",
        displayTextArea: true,
        defaultValue:
            "Direct, data-driven strategies injected with chaos and personality...",
    },
    ctaButtonText: {
        type: ControlType.String,
        title: "Button Text",
        defaultValue: "Get Your Free Audit",
    },
})
*/
