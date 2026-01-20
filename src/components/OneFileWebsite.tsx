import * as React from "react"
import { useState, useEffect, useRef } from "react"

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
    Search,
    Edit3,
    Share2,
    Star,
    ArrowUpRight,
    ChevronDown,
    ChevronUp,
} from "lucide-react"
import ReactPlayer from "react-player"

// FOR FRAMER: Comment out the line above and UNCOMMENT the lines below.
// import { Play, ArrowRight, Zap, BarChart, Instagram, Linkedin, Mail, Menu, X, CheckCircle, Layers, Cpu, Globe, Search, Edit3, Share2, Star, ArrowUpRight } from "https://esm.sh/lucide-react@0.263.1?deps=react@18.2.0"
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

    /* Stealth Mode: Hide HubSpot Branding */
    .hubspot-link__container, 
    .hs-link-section, 
    .hbspt-form .hubspot-link__container {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
    }

    /* VOID GRID ANIMATION */
    @keyframes grid-scroll {
        0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
        100% { transform: perspective(500px) rotateX(60deg) translateY(40px); }
    }

    @keyframes pulse-fast {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.1); }
    }

    .void-bg {
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% -20%, #4c1d95 0%, #000000 60%);
        overflow: hidden;
        z-index: 0;
    }

    .void-grid {
        position: absolute;
        inset: -100%;
        background-image: 
            linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px);
        background-size: 80px 80px;
        animation: grid-scroll 2s linear infinite;
        opacity: 0.3;
        transform-origin: center top;
        mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 60%);
    }

    .void-glows {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        pointer-events: none;
    }
    
    .void-glows::before {
        content: '';
        position: absolute;
        top: 20%;
        left: 20%;
        width: 40vw;
        height: 40vw;
        background: radial-gradient(circle, rgba(219, 39, 119, 0.4) 0%, transparent 70%);
        filter: blur(60px);
        animation: pulse-fast 4s ease-in-out infinite alternate;
        mix-blend-mode: screen;
    }

     .void-glows::after {
        content: '';
        position: absolute;
        bottom: 10%;
        right: 10%;
        width: 50vw;
        height: 30vw;
        background: radial-gradient(circle, rgba(79, 70, 229, 0.4) 0%, transparent 70%);
        filter: blur(80px);
        animation: pulse-fast 5s ease-in-out infinite alternate-reverse;
        mix-blend-mode: screen;
    }

    /* Rating Shimmer Effect */
    @keyframes shimmer {
        0% { transform: translateX(-100%) skewX(-15deg); }
        100% { transform: translateX(200%) skewX(-15deg); }
    }
    
    .rating-shimmer {
        position: relative;
        overflow: hidden;
    }
    
    .rating-shimmer::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
        transform: translateX(-100%) skewX(-15deg);
        animation: shimmer 3s infinite;
    }

    /* Cyber Glitch Snake */
    .cyber-segment {
        position: fixed;
        width: 16px;
        height: 16px;
        background: white; /* Inverts to black on white, etc */
        mix-blend-mode: difference;
        pointer-events: none;
        z-index: 9999;
        transform: translate(-50%, -50%);
        box-shadow: 0 0 2px rgba(255,255,255,0.8);
    }

    .cyber-segment:first-child {
        width: 24px;
        height: 24px;
        border: 2px solid #db2777; /* Pink border on head */
        background: transparent;
        mix-blend-mode: normal;
        box-shadow: 0 0 10px #db2777;
    }

    /* Holographic Data Bars */
    @keyframes bar-grow {
        0% { height: 5%; opacity: 0; }
        100% { height: var(--target-height); opacity: 1; }
    }
    
    .holo-bar {
        position: relative;
        width: 100%;
        background: linear-gradient(to top, rgba(236, 72, 153, 0.2), rgba(236, 72, 153, 0.8));
        box-shadow: 0 0 15px rgba(236, 72, 153, 0.4);
        border-top: 2px solid rgba(255, 255, 255, 0.8);
        animation: bar-grow 1.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        transform-origin: bottom;
        opacity: 0;
    }
    
    .holo-grid {
        background-size: 20px 20px;
        background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
    }


`

interface MindBenTProps {
    brandName: string
    heroTagline: string
    heroHeadlineOne: string
    heroHeadlineTwo: string
    heroHeadlineAccent: string
    heroDescription: string
    ctaButtonText: string
    heroVideoUrl?: string
    heroVideoUrlMobile?: string
    hubspotPortalId?: string
    hubspotFormId?: string
    googleBusinessUrl?: string
}

// We add 'props' here to accept inputs from the Framer sidebar
export default function MindbenT_Homepage(props: MindBenTProps) {
    useTailwind()

    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [isVideoOpen, setIsVideoOpen] = useState(false)

    // Cyber Snake Logic
    const TRAIL_LENGTH = 8
    const segmentsRef = useRef<HTMLDivElement[]>([])
    // Store positions for each segment
    const positions = useRef(Array(TRAIL_LENGTH).fill({ x: 0, y: 0 }))
    const mousePos = useRef({ x: 0, y: 0 })
    const requestRef = useRef<number>()

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mousePos.current = { x: e.clientX, y: e.clientY }
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        const animateSnake = () => {
            const head = mousePos.current

            // Update head position directly (or with slight ease)
            positions.current[0] = head

            // Update trailing segments
            // Each segment moves towards the one before it
            for (let i = 1; i < TRAIL_LENGTH; i++) {
                const current = positions.current[i]
                const target = positions.current[i - 1]

                const ease = 0.35 // Quick snap for glitch feel

                const dx = target.x - current.x
                const dy = target.y - current.y

                positions.current[i] = {
                    x: current.x + dx * ease,
                    y: current.y + dy * ease
                }
            }

            // Apply transforms
            segmentsRef.current.forEach((el, i) => {
                if (el) {
                    const pos = positions.current[i]
                    el.style.transform = `translate(${pos.x}px, ${pos.y}px) translate(-50%, -50%)`
                    // Fade out tail
                    el.style.opacity = (1 - i / TRAIL_LENGTH).toString()
                }
            })

            requestRef.current = requestAnimationFrame(animateSnake)
        }
        requestRef.current = requestAnimationFrame(animateSnake)
        return () => cancelAnimationFrame(requestRef.current!)
    }, [])

    // HubSpot Script Loader
    useEffect(() => {
        const scriptId = "hubspot-form-script"
        const existingScript = document.getElementById(scriptId)

        if (!existingScript) {
            const script = document.createElement("script")
            script.id = scriptId
            script.src = "https://js.hsforms.net/forms/embed/20279409.js"
            script.defer = true
            script.async = true
            document.body.appendChild(script)
        }
    }, [])
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
        const extracted = Component?.default || Component
        // If it's a ForwardRef object (has .render function), we unwrap it to a plain function
        // and explicitly pass null as the ref to avoid React passing a frozen legacy context object.
        if (
            extracted &&
            typeof extracted === "object" &&
            typeof extracted.render === "function"
        ) {
            const RenderFn = extracted.render
            return (props: any) => RenderFn(props, null)
        }
        return extracted
    }

    // Pre-resolve VideoPlayer
    const ResolvedVideoPlayer = resolveComponent(ReactPlayer)

    const SERVICES_DATA = [
        {
            Icon: Layers,
            title: "Content Strategy + Direction",
            subtitle: "Positioning • Concepts • Content System",
            desc: "We build the plan behind the content—what to say, what to show, and how to stay consistent without burning out.",
            details:
                "Includes: content pillars • hooks/topics • light scripting • shot plans • creative direction",
            color: "border-pink-500",
            hover: "hover:shadow-[0_0_30px_#FF00FF]",
        },
        {
            Icon: Cpu,
            title: "Production",
            subtitle: "Video • Photo • Events • Drone",
            desc: "High-end capture for brands, spaces, and experiences—designed to look premium and perform on social.",
            details:
                "Includes: talking heads • hospitality/interiors • event coverage • drone/aerial • on-site capture days",
            color: "border-cyan-400",
            hover: "hover:shadow-[0_0_30px_#00FFFF]",
        },
        {
            Icon: Globe,
            title: "Channel Management + Distribution",
            subtitle: "Post • Publish • Channel Management",
            desc: "You don’t just get files—you get reach. We edit, version, write captions, and publish across multiple networks so your content works harder everywhere.",
            details:
                "Includes: vertical + horizontal versions • captions/hashtags • scheduling • cross-platform posting • basic channel upkeep",
            color: "border-yellow-400",
            hover: "hover:shadow-[0_0_30px_#FFFF00]",
        },
    ]



    const TESTIMONIALS_DATA = [
        {
            name: "Sarah Jenkins",
            role: "CMO, TechFlow",
            quote: "MindBenT didn't just edit our video, they completely rewired our brand voice. We saw a 300% increase in engagement within two weeks.",
            rating: 5,
        },
        {
            name: "Marcus Thorne",
            role: "Founder, Apex Realty",
            quote: "I was skeptical about the 'chaos' approach, but it works. They cut through the noise. Professional, fast, and undeniably cool.",
            rating: 5,
        },
        {
            name: "Elena Rodriguez",
            role: "Director, ArtHouse",
            quote: "Finally, an agency that understands that 'safe' is risky. The visuals they produced for our launch were incredible.",
            rating: 5,
        },
    ]

    const TRUSTED_BY_LOGOS = [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2560px-Google_2015_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/2560px-Tesla_logo.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    ]

    const PAIN_POINTS_DATA = [
        {
            title: "The Ghost Town Feed",
            desc: "You post. Crickets. You post again. Tumbleweeds. Your content isn't bad, it's just invisible.",
            icon: Search,
        },
        {
            title: "The One-Hit Wonder",
            desc: "One viral reel, then nothing. You built an audience for a moment, but couldn't keep them.",
            icon: Zap,
        },
        {
            title: "The Identity Crisis",
            desc: "Your feed looks like a junk drawer. No aesthetic, no voice, no reason for anyone to follow.",
            icon: Layers,
        },
    ]

    const FAQ_DATA = [
        {
            q: "Do I need to be on camera?",
            a: "Not if you don't want to be. We build faceless brands that still have personality, or we coach you to be natural on lens."
        },
        {
            q: "How fast will I see results?",
            a: "We usually see traction in weeks 2-4. But real dominance takes 90 days of consistent pressure."
        },
        {
            q: "What if I don't have a strategy?",
            a: "That's why we're here. We don't just edit; we engineer the entire roadmap before we shoot a single frame."
        },
        {
            q: "Do you handle posting?",
            a: "Yes. From upload to caption to hashtags. You approve the content, we handle the rest."
        },
    ]

    const PROCESS_DATA = [
        {
            title: "Phase 1: The Audit",
            icon: Search,
            desc: "We tear down your current presence. What's working? What's dead weight? We find the gaps in your reality.",
            step: "01",
            color: "text-blue-400",
            border: "border-blue-400",
        },
        {
            title: "Phase 2: The Signal",
            icon: Zap,
            desc: "We craft the high-voltage strategy. The hooks, the look, the feel. We define how you'll bend the algorithm.",
            step: "02",
            color: "text-pink-500",
            border: "border-pink-500",
        },
        {
            title: "Phase 3: The Broadcast",
            icon: Share2,
            desc: "Consistent, premium output. We verify, edit, and deploy. Your signal goes live and the reality shift begins.",
            step: "03",
            color: "text-purple-500",
            border: "border-purple-500",
        },
    ]

    // Pre-resolve Icons for Services
    const RESOLVED_SERVICES = SERVICES_DATA.map((service) => ({
        ...service,
        IconComponent: resolveComponent(service.Icon),
    }))


    // Pre-resolve Icons for Process
    const RESOLVED_PROCESS = PROCESS_DATA.map((step) => ({
        ...step,
        IconComponent: resolveComponent(step.icon),
    }))

    return (
        <div className="w-full min-h-screen bg-black text-white font-sans overflow-x-hidden relative cursor-none-optional">
            <style>{customStyles}</style>

            {/* Cyber Snake Cursor */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    ref={el => segmentsRef.current[i] = el!}
                    className="cyber-segment"
                ></div>
            ))}
            {/* Luma Ambient Background */}
            <div className="luma-ambient"></div>

            {/* Navigation */}
            <nav
                className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-black/95 backdrop-blur-xl border-b border-white/10 py-4" : "bg-transparent py-8"}`}
            >
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                    <div className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 drop-shadow-lg">
                        {props.brandName}
                    </div>

                    <div className="hidden lg:flex space-x-12 text-xl font-black tracking-widest">
                        <a
                            href="#"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">
                                THE STUDIO
                            </span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#services"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">
                                SERVICES
                            </span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#process"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">
                                THE METHOD
                            </span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                        <a
                            href="#audit"
                            className="relative group transition-colors duration-300"
                        >
                            <span className="relative z-10 text-white group-hover:text-pink-500 transition-colors uppercase">
                                FREE AUDIT
                            </span>
                            <span className="absolute -inset-4 rounded-full bg-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        </a>
                    </div>

                    <button className="hidden md:block bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-pink-500 hover:text-white transition-all transform hover:scale-105">
                        LET'S TALK
                    </button>

                    <button
                        className="lg:hidden"
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
                    <a href="#process" onClick={() => setIsMenuOpen(false)}>
                        THE METHOD
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
                {/* Void Background (Replaces Aurora) */}
                <div className="void-bg">
                    <div className="void-grid"></div>
                    <div className="void-glows"></div>
                </div>
                {/* CRT/Signal Overlays */}
                <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

                {/* Top Vignette for Logo Visibility */}
                <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black/90 via-black/50 to-transparent z-10 pointer-events-none"></div>

                {/* Scanlines */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-20"
                    style={{
                        backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 3px)",
                    }}
                ></div>

                {/* Static Noise */}
                <div
                    className="absolute inset-0 z-10 pointer-events-none opacity-[0.03] mix-blend-overlay"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`,
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-20 w-full max-w-7xl mx-auto px-4 md:px-12 text-center space-y-6 pt-32 md:pt-48 pb-12">
                    {/* SOCIAL PROOF BADGE */}
                    <a
                        href={props.googleBusinessUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rating-shimmer inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-4 hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                        <div className="flex text-yellow-400 gap-1 group-hover:scale-110 transition-transform duration-300">
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                            <Star size={16} fill="currentColor" />
                        </div>
                        <span className="text-sm font-bold text-white tracking-widest uppercase group-hover:text-pink-500 transition-colors">
                            5.0 RATING ON GOOGLE
                        </span>
                    </a>

                    <h1 className="font-black leading-[0.85] tracking-tighter text-white mix-blend-screen select-none">
                        {/* Fluid typography: Reduced to 10vw/8rem to reveal more video */}
                        <div className="text-[10vw] md:text-[8rem] transition-all duration-300">
                            {props.heroHeadlineOne} <br />
                            {props.heroHeadlineTwo}
                        </div>
                        <div className="text-[10vw] md:text-[8rem] text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 transition-all duration-300">
                            {props.heroHeadlineAccent}
                        </div>
                    </h1>
                    <div className="inline-block px-6 py-2 border-2 border-pink-500 rounded-full text-pink-500 text-sm font-black tracking-[0.3em] uppercase mb-4 animate-pulse">
                        {props.heroTagline}
                    </div>
                    <p className="text-gray-200 text-xl md:text-3xl max-w-4xl mx-auto font-bold drop-shadow-xl leading-relaxed">
                        {props.heroDescription}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-8 justify-center pt-8 items-center">
                        <button className="px-12 py-6 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full font-black text-2xl hover:shadow-[0_0_60px_rgba(236,72,153,0.8)] hover:scale-105 transition-all text-white flex items-center justify-center gap-4 animate-bounce-subtle border-4 border-white/20">
                            GET YOUR FREE AUDIT <ArrowRight size={32} />
                        </button>
                        <button
                            onClick={() => setIsVideoOpen(true)}
                            className="text-white font-bold text-xl tracking-widest uppercase hover:text-pink-500 transition-colors flex items-center gap-3 group"
                        >
                            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-pink-500 group-hover:bg-pink-500/10 transition-all">
                                <Play size={20} className="fill-current ml-1" />
                            </div>
                            Watch Reel
                        </button>
                    </div>
                </div>
            </section>

            {/* TRUSTED BY MARQUEE */}
            <section className="py-10 bg-black border-b border-white/5 overflow-hidden relative z-20">
                <p className="text-center text-xs font-bold text-gray-500 uppercase tracking-[0.3em] mb-8">
                    Trusted By Industry Leaders
                </p>
                <div className="flex gap-12 md:gap-24 items-center justify-center opacity-40 grayscale hover:grayscale-0 transition-all duration-500 overflow-x-auto no-scrollbar mask-gradient px-12">
                    {/* Doubled for marquee effect logic (simplified as flex here) */}
                    {TRUSTED_BY_LOGOS.map((logo, i) => (
                        <img key={i} src={logo} alt="Client Logo" className="h-8 md:h-10 w-auto object-contain brightness-0 invert" />
                    ))}
                    {TRUSTED_BY_LOGOS.map((logo, i) => (
                        <img key={`dup-${i}`} src={logo} alt="Client Logo" className="h-8 md:h-10 w-auto object-contain brightness-0 invert hidden md:block" />
                    ))}
                </div>
            </section>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-8" onClick={() => setIsVideoOpen(false)}>
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setIsVideoOpen(false)}
                            className="absolute top-4 right-4 z-10 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-all"
                        >
                            <X size={24} />
                        </button>
                        <ResolvedVideoPlayer
                            url={props.heroVideoUrl || "https://vimeo.com/990744884/dfcf032b50"}
                            playing={true}
                            controls={true}
                            width="100%"
                            height="100%"
                        />
                    </div>
                </div>
            )}

            {/* SERVICES SECTION WITH ANIMATED BACKGROUND */}
            {/* THE STRUGGLE (PAIN POINTS) */}
            <section className="py-24 bg-zinc-900 overflow-hidden relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">
                            The <span className="text-gray-500 line-through decoration-pink-500">Problem</span> <span className="text-pink-500">Reality.</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Most brands aren't failing because their product sucks. They're failing because their signal is weak.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {PAIN_POINTS_DATA.map((pain, i) => (
                            <div key={i} className="p-8 border border-white/5 bg-black/40 rounded-3xl hover:border-pink-500/30 transition-colors group">
                                <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mb-6 text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                                    <pain.icon size={28} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{pain.title}</h3>
                                <p className="text-gray-400 leading-relaxed font-medium">
                                    {pain.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="services" className="py-24 bg-black relative overflow-hidden">
                {/* Dynamic Background Elements */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(76,29,149,0.15),_rgba(0,0,0,1)_70%)]"></div>
                <div className="absolute inset-0 opacity-20"
                    style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                </div>

                <div className="signal-bg mix-blend-screen">
                    <div className="signal-layer"></div>
                    <div className="signal-layer" style={{ animationDelay: '-2s' }}></div>
                </div>
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2
                            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter uppercase glitch"
                            data-text="SERVICES"
                        >
                            OUR{" "}
                            <span className="text-pink-500 pink-motion">
                                SERVICES
                            </span>
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
                                className={`bg-gradient-to-b from-zinc-900 to-black border ${service.color} p-8 rounded-3xl relative group transition-all duration-300 hover:-translate-y-2 ${service.hover} overflow-hidden`}
                            >
                                {/* Subtle Luma Cloud / Glow */}
                                <div className="absolute -top-24 -right-24 w-80 h-80 bg-white/5 rounded-full blur-[80px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    <service.IconComponent
                                        size={48}
                                        className={service.color.replace(
                                            "border",
                                            "text"
                                        )}
                                    />
                                </div>
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-wide text-white">
                                    {service.title}
                                </h3>
                                <p
                                    className={`text-sm font-bold mb-4 tracking-widest uppercase ${service.color.replace("border", "text")}`}
                                >
                                    {service.subtitle}
                                </p>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6 font-medium">
                                    {service.desc}
                                </p>
                                {/* New Details Section */}
                                <p className="text-sm text-gray-400 font-medium border-t border-gray-800 pt-4 opacity-90 leading-relaxed">
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

            {/* Process / Methodology Section */}
            <section
                id="process"
                className="py-24 w-full px-6 md:px-12 bg-black relative overflow-hidden"
            >
                {/* Background Grid */}
                <div
                    className="absolute inset-0 opacity-10 pointer-events-none"
                    style={{
                        backgroundImage: `linear-gradient(to right, #333 1px, transparent 1px), linear-gradient(to bottom, #333 1px, transparent 1px)`,
                        backgroundSize: "40px 40px",
                    }}
                ></div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-tighter">
                            THE{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                METHOD
                            </span>
                        </h2>
                        <p className="text-gray-400 text-2xl max-w-3xl mx-auto font-medium">
                            Chaos is our medium. Structure is our weapon. Here's
                            how we execute.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {RESOLVED_PROCESS.map((step, idx) => (
                            <div
                                key={idx}
                                className={`relative p-8 rounded-3xl border border-white/10 bg-zinc-900/50 backdrop-blur-sm group hover:border-white/30 transition-all duration-500`}
                            >
                                <div
                                    className={`text-6xl font-black opacity-20 mb-4 ${step.color}`}
                                >
                                    {step.step}
                                </div>
                                <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300 origin-left">
                                    <step.IconComponent
                                        size={48}
                                        className={step.color.replace(
                                            "text",
                                            "text"
                                        )}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold mb-4 text-white uppercase tracking-wider">
                                    {step.title}
                                </h3>
                                <p className="text-gray-400 text-lg leading-relaxed">
                                    {step.desc}
                                </p>
                                <div
                                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${step.color.split("-")[1]}-${step.color.split("-")[2]} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                                ></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CASE STUDY SECTION: ROW01 */}
            <section className="py-24 bg-black relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 to-black pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left: The Narrative */}
                        <div className="space-y-8">
                            <div className="inline-block px-4 py-1 border border-pink-500/50 rounded-full text-pink-500 text-xs font-bold tracking-[0.2em] uppercase mb-2">
                                Case Study: ROW01
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black leading-none uppercase tracking-tighter">
                                ARCHITECTING <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                    ATTENTION
                                </span>
                            </h2>
                            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-medium">
                                <p>
                                    <strong className="text-white">The Challenge:</strong> Luxury interior design has a "safe" problem.
                                    Perfect portfolios look beautiful, but on social, "perfect" means "boring."
                                    The algorithm ignored the polish.
                                </p>
                                <p>
                                    <strong className="text-white">The Blueprint:</strong> We stopped treating the feed like a museum
                                    and started treating it like a construction site. We injected raw, high-speed walkthroughs
                                    and personality-driven commentary into the pristine visuals.
                                </p>
                                <p className="text-pink-400 font-bold italic">
                                    "We turned a portfolio into a personality."
                                </p>
                            </div>

                            <div className="pt-4">
                                <button className="group flex items-center gap-3 text-white font-bold tracking-widest uppercase hover:text-pink-500 transition-colors">
                                    Read Full Case Study <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Right: Holographic Data Dashboard */}
                        <div className="relative bg-zinc-900/40 border border-white/10 rounded-3xl p-8 backdrop-blur-md holo-grid overflow-hidden">
                            {/* Decorative Tech Elements */}
                            <div className="absolute top-4 right-4 flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                            </div>
                            <div className="text-xs font-mono text-gray-500 mb-8 tracking-widest">
                                /// ANALYTICS_TERMINAL_V.04 <br />
                                TARGET: ROW01_INTERIORS
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-8">
                                {/* Metric 1 */}
                                <div>
                                    <div className="text-4xl font-black text-white mb-1 flex items-baseline gap-2">
                                        +400%
                                        <ArrowUpRight size={16} className="text-green-400" />
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Engagement</div>
                                    {/* Bar Chart Representation */}
                                    <div className="h-32 mt-4 flex items-end gap-2 border-b border-white/10 pb-1">
                                        <div className="w-1/3 bg-gray-700/30 h-[20%] rounded-t-sm"></div>
                                        <div className="w-1/3 bg-gray-700/50 h-[35%] rounded-t-sm"></div>
                                        <div className="holo-bar w-1/3 rounded-t-sm" style={{ "--target-height": "100%" } as React.CSSProperties}></div>
                                    </div>
                                </div>

                                {/* Metric 2 */}
                                <div>
                                    <div className="text-4xl font-black text-white mb-1 flex items-baseline gap-2">
                                        150k+
                                        <ArrowUpRight size={16} className="text-green-400" />
                                    </div>
                                    <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Reach</div>
                                    {/* Bar Chart Representation */}
                                    <div className="h-32 mt-4 flex items-end gap-2 border-b border-white/10 pb-1">
                                        <div className="w-1/3 bg-gray-700/30 h-[15%] rounded-t-sm"></div>
                                        <div className="w-1/3 bg-gray-700/50 h-[25%] rounded-t-sm"></div>
                                        <div className="holo-bar w-1/3 rounded-t-sm" style={{ "--target-height": "95%" } as React.CSSProperties}></div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-xl flex items-center gap-4">
                                <div className="p-2 bg-green-500/20 rounded-full text-green-400">
                                    <CheckCircle size={20} />
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white uppercase">Authority Status</div>
                                    <div className="text-xs text-green-400">Verified Market Leader</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS SECTION */}
            <section className="py-24 bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(236,72,153,0.15),_transparent_50%)]"></div>

                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl md:text-7xl font-black mb-8 uppercase tracking-tighter">
                            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">VERDICT</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS_DATA.map((testimonial, idx) => (
                            <div
                                key={idx}
                                className="group bg-zinc-900/30 border border-white/10 p-8 rounded-3xl relative backdrop-blur-md hover:border-pink-500/50 transition-all duration-300 hover:bg-zinc-900/60 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
                            >
                                <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur-md transition-opacity"></div>

                                <div className="flex text-pink-500 mb-6 gap-1 relative z-10">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} size={18} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]" />
                                    ))}
                                </div>
                                <p className="text-xl text-gray-200 font-medium mb-8 leading-relaxed relative z-10">
                                    "{testimonial.quote}"
                                </p>
                                <div className="flex items-center gap-4 relative z-10 border-t border-white/5 pt-6">
                                    <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-white text-lg shadow-lg">
                                        {testimonial.name[0]}
                                    </div>
                                    <div>
                                        <div className="font-bold text-white uppercase tracking-wide text-sm">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-xs text-pink-400 font-bold uppercase tracking-widest mt-1">
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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

                        <div className="w-full">
                            <div
                                className="hs-form-frame"
                                data-region="na1"
                                data-form-id="d46826e9-0229-4248-b901-ffc8b07b29a8"
                                data-portal-id="20279409"
                            ></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-6 font-bold uppercase tracking-widest">
                            No credit card required.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            {/* FAQ SECTION */}
            <section className="py-24 bg-black relative z-10">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <h2 className="text-5xl md:text-7xl font-black text-center mb-16 uppercase tracking-tighter text-white">
                        Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Questions</span>
                    </h2>

                    <div className="space-y-4">
                        {FAQ_DATA.map((item, i) => (
                            <details key={i} className="group border-b border-white/10 pb-4">
                                <summary className="flex justify-between items-center cursor-pointer list-none py-4 text-xl md:text-2xl font-bold text-white hover:text-pink-500 transition-colors">
                                    <span>{item.q}</span>
                                    <span className="transition delay-300 md:delay-0 group-open:rotate-180">
                                        <ChevronDown size={24} />
                                    </span>
                                </summary>
                                <p className="text-gray-400 text-lg leading-relaxed mt-4 pr-12">
                                    {item.a}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="py-24 border-t border-white/10 relative z-10 bg-black">
                <div className="w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-6xl md:text-9xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 transition-transform cursor-default">
                        mindbenT media
                    </div>
                    <div className="text-gray-500 text-lg font-bold tracking-widest uppercase">
                        © 2026 MindbenT Media. All Rights Reserved.
                    </div>
                </div>
            </footer>
            {/* Sticky Mobile CTA */}
            <div className={`fixed bottom-6 left-6 right-6 z-50 md:hidden transition-all duration-500 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
                <a href="#audit" className="block w-full py-4 bg-pink-600 text-white font-black text-center uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]">
                    Book Free Audit
                </a>
            </div>
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
    heroVideoUrl: "https://vimeo.com/990744884/dfcf032b50",
    heroVideoUrlMobile: "https://vimeo.com/990744884/dfcf032b50", // Placeholder until user provides vertical reel
    hubspotPortalId: "20279409", // Enter your HubSpot Portal ID
    hubspotFormId: "",   // Enter your HubSpot Form GUID
    googleBusinessUrl: "https://www.google.com/search?q=MindBenT+Media+Miami",
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
    hubspotPortalId: {
        type: ControlType.String,
        title: "HubSpot Portal ID",
        placeholder: "e.g. 12345678",
    },
    hubspotFormId: {
        type: ControlType.String,
        title: "HubSpot Form ID",
        placeholder: "e.g. d841...",
    },
})
*/
