import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
import { addPropertyControls, ControlType } from "framer";
import { tokens } from "../styles/tokens";
const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: tokens.spacing.l,
    width: "100%",
    padding: tokens.spacing.l,
    maxWidth: 1400,
    margin: "0 auto",
};
const cardStyle = {
    backgroundColor: tokens.colors.surface,
    backdropFilter: "blur(10px)",
    borderRadius: tokens.borderRadius.m,
    overflow: "hidden",
    height: 400,
    position: "relative",
    border: `1px solid ${tokens.colors.surfaceHighlight}`,
};
export default function ParallaxGrid(props) {
    return (_jsx("div", { style: gridStyle, children: props.items.map((item, index) => (_jsx(GridItem, { item: item, index: index }, index))) }));
}
function GridItem({ item, index }) {
    // Basic parallax stub - in real Framer use, rely on scroll variants or specialized hooks
    // For now, just a nice hover effect
    return (_jsxs(motion.div, { style: cardStyle, whileHover: { scale: 1.02, borderColor: tokens.colors.primary }, transition: { duration: 0.3 }, children: [_jsx("div", { style: {
                    width: "100%",
                    height: "100%",
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    opacity: 0.7,
                } }), _jsx("div", { style: {
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    padding: tokens.spacing.m,
                    background: "linear-gradient(to top, rgba(0,0,0,0.9), transparent)",
                }, children: _jsx("h3", { style: { margin: 0, color: tokens.colors.text }, children: item.title }) })] }));
}
ParallaxGrid.defaultProps = {
    items: [
        { title: "Project One", image: "" },
        { title: "Project Two", image: "" },
        { title: "Project Three", image: "" },
    ]
};
addPropertyControls(ParallaxGrid, {
    items: {
        type: ControlType.Array,
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String },
                image: { type: ControlType.Image },
            },
        },
        defaultValue: [
            { title: "Cinematic Reel", image: "https://source.unsplash.com/random/800x600?neon" },
            { title: "Brand Story", image: "https://source.unsplash.com/random/800x600?camera" },
            { title: "Social Series", image: "https://source.unsplash.com/random/800x600?city" },
        ],
    },
});
