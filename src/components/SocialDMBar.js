import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { tokens } from "../styles/tokens";
// Simple SVG Icons
const Icons = {
    Instagram: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("rect", { x: "2", y: "2", width: "20", height: "20", rx: "5", ry: "5" }), _jsx("path", { d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" }), _jsx("line", { x1: "17.5", y1: "6.5", x2: "17.51", y2: "6.5" })] })),
    LinkedIn: (_jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("path", { d: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" }), _jsx("rect", { x: "2", y: "9", width: "4", height: "12" }), _jsx("circle", { cx: "4", cy: "4", r: "2" })] })),
    Facebook: (_jsx("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: _jsx("path", { d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" }) })),
};
const barStyle = {
    position: "fixed",
    right: tokens.spacing.m,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.s,
    zIndex: 100,
};
const itemStyle = {
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
};
export default function SocialDMBar(props) {
    return (_jsxs("div", { style: barStyle, children: [_jsx(SocialItem, { icon: Icons.Instagram, url: props.instagramUrl }), _jsx(SocialItem, { icon: Icons.LinkedIn, url: props.linkedinUrl }), _jsx(SocialItem, { icon: Icons.Facebook, url: props.facebookUrl })] }));
}
function SocialItem({ icon, url }) {
    if (!url)
        return null;
    return (_jsx(motion.a, { href: url, target: "_blank", rel: "noopener noreferrer", style: itemStyle, whileHover: {
            scale: 1.1,
            backgroundColor: tokens.colors.primary,
            color: "#000" // active text color
        }, whileTap: { scale: 0.95 }, transition: { type: "spring", stiffness: 300, damping: 20 }, children: _jsx("div", { style: { width: 24, height: 24 }, children: icon }) }));
}
SocialDMBar.defaultProps = {
    instagramUrl: "https://instagram.com",
    linkedinUrl: "https://linkedin.com",
    facebookUrl: "https://facebook.com",
};
addPropertyControls(SocialDMBar, {
    instagramUrl: { type: ControlType.String, title: "Instagram" },
    linkedinUrl: { type: ControlType.String, title: "LinkedIn" },
    facebookUrl: { type: ControlType.String, title: "Facebook" },
});
