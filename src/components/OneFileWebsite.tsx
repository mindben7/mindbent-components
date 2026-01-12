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

// FOR FRAMER: Comment out the line above and UNCOMMENT the lines below.
// import { Play, ArrowRight, Zap, BarChart, Instagram, Linkedin, Mail, Menu, X, CheckCircle, Layers, Cpu, Globe } from "https://esm.sh/lucide-react?deps=react@18.2.0"
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

    const services = [
        {
            icon: <Layers size={48} className="text-pink-500" />,
            title: "THE BLUEPRINT",
            subtitle: "STRATEGY & BRAND DNA",
            desc: "We don't guess. We engineer. We decode your brand's DNA and build a content roadmap designed to dominate algorithms and infiltrate subcultures.",
            color: "border-pink-500",
            hover: "hover:shadow-[0_0_30px_#FF00FF]",
        },
        {
            icon: <Cpu size={48} className="text-cyan-400" />,
            title: "THE DISTORTION",
            subtitle: "PRODUCTION & VFX",
            desc: "High-voltage visuals that stop the scroll. From 3D motion graphics to cinematic edits, we create content that feels like a glitch in the simulation.",
            color: "border-cyan-400",
            hover: "hover:shadow-[0_0_30px_#00FFFF]",
        },
        {
            icon: <Globe size={48} className="text-yellow-400" />,
            title: "THE VIRAL LOOP",
            subtitle: "DISTRIBUTION & GROWTH",
            desc: "Content without eyeballs is just noise. We deploy aggressive growth tactics, community hacking, and trend-jacking to ensure your signal is heard.",
            color: "border-yellow-400",
            hover: "hover:shadow-[0_0_30px_#FFFF00]",
        },
    ]

    const packages = [
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
    ]

    return (
        <div className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden">
            <style>{customStyles}</style>

            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/90 backdrop-blur-md border-b border-gray-800" : "bg-transparent"}`}
            >
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                        {props.brandName}
                    </div>

                    <div className="hidden md:flex space-x-8 text-sm font-medium tracking-wide">
                        <a
                            href="#"
                            className="hover:text-pink-500 transition-colors"
                        >
                            THE STUDIO
                        </a>
                        <a
                            href="#services"
                            className="hover:text-pink-500 transition-colors"
                        >
                            SERVICES
                        </a>
                        <a
                            href="#packages"
                            className="hover:text-pink-500 transition-colors"
                        >
                            PACKAGES
                        </a>
                        <a
                            href="#audit"
                            className="hover:text-pink-500 transition-colors"
                        >
                            FREE AUDIT
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
            <section className="relative pt-32 pb-20 px-6 md:pt-48 md:pb-32 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Copy */}
                <div className="space-y-8 z-10">
                    <div className="inline-block px-4 py-1 border border-pink-500 rounded-full text-pink-500 text-xs font-bold tracking-widest uppercase mb-4 animate-pulse">
                        {props.heroTagline}
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter">
                        {props.heroHeadlineOne} <br />
                        {props.heroHeadlineTwo} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                            {props.heroHeadlineAccent}
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl max-w-md">
                        {props.heroDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <button className="px-8 py-4 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all flex items-center justify-center gap-2">
                            {props.ctaButtonText} <ArrowRight size={20} />
                        </button>
                        <button className="px-8 py-4 border border-gray-700 rounded-full font-bold text-lg hover:bg-gray-900 transition-all flex items-center justify-center gap-2">
                            <Play size={20} className="fill-current" /> Watch
                            Reel
                        </button>
                    </div>
                </div>

                {/* Right: Video/Visual */}
                <div className="relative h-[500px] w-full rounded-2xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gray-900 flex items-center justify-center overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-black opacity-80"></div>
                        <div className="absolute w-64 h-64 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob top-0 -left-4"></div>
                        <div className="absolute w-64 h-64 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 bottom-0 right-0"></div>

                        <div className="z-10 text-center">
                            <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:scale-110 transition-transform cursor-pointer">
                                <Play className="fill-white w-8 h-8 ml-1" />
                            </div>
                            <p className="font-mono text-sm tracking-widest text-white/70">
                                PLAY SHOWREEL
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SERVICES SECTION WITH ANIMATED BACKGROUND */}
            <section id="services" className="py-24 bg-zinc-900 relative">
                <div className="signal-bg">
                    <div className="signal-layer"></div>
                    <div className="signal-layer"></div>
                </div>
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <h2
                            className="text-5xl font-black mb-4 tracking-tighter uppercase glitch"
                            data-text="THE SIGNAL"
                        >
                            THE <span className="text-pink-500">SIGNAL</span>
                        </h2>
                        <p className="text-gray-400 text-xl max-w-2xl mx-auto">
                            We don't just make noise. We broadcast a signal so
                            strong it breaks through the static.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className={`bg-black border-2 ${service.color} p-8 rounded-3xl relative group transition-all duration-300 hover:-translate-y-2 ${service.hover}`}
                            >
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide text-white">
                                    {service.title}
                                </h3>
                                <p
                                    className={`text-sm font-bold mb-4 tracking-widest uppercase ${service.color.replace("border", "text")}`}
                                >
                                    {service.subtitle}
                                </p>
                                <p className="text-gray-400 leading-relaxed">
                                    {service.desc}
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
                className="pt-24 pb-12 max-w-7xl mx-auto px-6"
            >
                <div className="text-center mb-16">
                    <h2 className="text-5xl font-bold mb-6">
                        CHOOSE YOUR{" "}
                        <span className="text-pink-500">REALITY</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Whether you need a spark or a supernova, we have a
                        package that fits. No hidden fees. No boring contracts.
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {packages.map((pkg, idx) => (
                        <div
                            key={idx}
                            className={`relative p-8 rounded-3xl bg-zinc-900 border-2 ${pkg.color} ${pkg.popular ? "transform md:-translate-y-4 shadow-[0_0_30px_rgba(236,72,153,0.2)]" : "border-opacity-30"}`}
                        >
                            {pkg.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                    Most Popular
                                </div>
                            )}
                            <h3 className="text-2xl font-bold mb-2">
                                {pkg.name}
                            </h3>
                            <div className="text-4xl font-black mb-4">
                                {pkg.price}
                                <span className="text-lg text-gray-500 font-normal">
                                    /mo
                                </span>
                            </div>
                            <p className="text-gray-400 mb-8 h-12">
                                {pkg.desc}
                            </p>
                            <ul className="space-y-4 mb-8">
                                {pkg.features.map((feat, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <CheckCircle
                                            size={16}
                                            className={`flex-shrink-0 mt-0.5 ${pkg.popular
                                                ? "text-pink-500"
                                                : "text-gray-500"
                                                }`}
                                        />
                                        {feat}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-4 rounded-xl font-bold text-white transition-all hover:opacity-90 ${pkg.btn}`}
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
                className="pt-12 pb-24 bg-gradient-to-b from-black to-purple-900/20"
            >
                <div className="max-w-4xl mx-auto px-6 text-center bg-zinc-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-pink-500 rounded-full blur-3xl opacity-10"></div>
                    <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-10"></div>

                    <div className="relative z-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500/20 rounded-full mb-6">
                            <BarChart className="text-pink-500" size={32} />
                        </div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">
                            Is Your Social Media <br />{" "}
                            <span className="text-pink-500">
                                Leaking Money?
                            </span>
                        </h2>
                        <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
                            Get a free, no-holds-barred audit of your current
                            digital presence. We'll tell you exactly what's
                            working, what's failing, and how to fix it.
                        </p>

                        <form className="max-w-md mx-auto space-y-4">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full px-6 py-4 bg-black border border-gray-700 rounded-xl focus:outline-none focus:border-pink-500 text-white"
                            />
                            <input
                                type="text"
                                placeholder="Your Instagram Handle (@)"
                                className="w-full px-6 py-4 bg-black border border-gray-700 rounded-xl focus:outline-none focus:border-pink-500 text-white"
                            />
                            <button className="w-full bg-white text-black font-bold text-xl py-4 rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                                Reveal My Score
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-4">
                            No credit card required.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-gray-900">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
                        mindbenT media
                    </div>
                    <div className="text-gray-500 text-sm">
                        © 2025 MindbenT Media. All Rights Reserved.
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
