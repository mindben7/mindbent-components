import * as React from "react"
import { motion } from "framer-motion"
import { addPropertyControls, ControlType } from "framer"
import { tokens } from "../styles/tokens"

// Simple SVG Icons
const Icons = {
    Instagram: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
    ),
    LinkedIn: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
            <rect x="2" y="9" width="4" height="12"></rect>
            <circle cx="4" cy="4" r="2"></circle>
        </svg>
    ),
    Facebook: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
    ),
}

const barStyle: React.CSSProperties = {
    position: "fixed",
    right: tokens.spacing.m,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.s,
    zIndex: 100,
}

const itemStyle: React.CSSProperties = {
    width: 48,
    height: 48,
    borderRadius: "50%",
    backgroundColor: tokens.colors.surface,
    backdropFilter: "blur(10px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: tokens.colors.text,
    cursor: "pointer",
    border: `1px solid ${tokens.colors.surfaceHighlight}`,
}

interface Props {
    instagramUrl: string
    linkedinUrl: string
    facebookUrl: string
}

export default function SocialDMBar(props: Props) {
    return (
        <div style={barStyle}>
            <SocialItem icon={Icons.Instagram} url={props.instagramUrl} />
            <SocialItem icon={Icons.LinkedIn} url={props.linkedinUrl} />
            <SocialItem icon={Icons.Facebook} url={props.facebookUrl} />
        </div>
    )
}

function SocialItem({ icon, url }: { icon: any, url: string }) {
    if (!url) return null
    return (
        <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={itemStyle}
            whileHover={{
                scale: 1.1,
                backgroundColor: tokens.colors.primary,
                color: "#000" // active text color
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
            <div style={{ width: 24, height: 24 }}>{icon}</div>
        </motion.a>
    )
}

SocialDMBar.defaultProps = {
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    facebookUrl: "https://facebook.com",
}

addPropertyControls(SocialDMBar, {
    instagramUrl: { type: ControlType.String, title: "Instagram" },
    linkedinUrl: { type: ControlType.String, title: "LinkedIn" },
    facebookUrl: { type: ControlType.String, title: "Facebook" },
})
