import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { addPropertyControls, ControlType } from "framer";
import { tokens } from "../styles/tokens";
const containerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing.l,
    justifyContent: "center",
    padding: tokens.spacing.xl,
    width: "100%",
};
const cardStyle = {
    flex: "1 1 300px",
    maxWidth: 400,
    backgroundColor: tokens.colors.surface,
    padding: tokens.spacing.l,
    borderRadius: tokens.borderRadius.l,
    border: `1px solid ${tokens.colors.surfaceHighlight}`,
    display: "flex",
    flexDirection: "column",
    gap: tokens.spacing.m,
    color: tokens.colors.text,
};
const highlightedCardStyle = Object.assign(Object.assign({}, cardStyle), { borderColor: tokens.colors.primary, boxShadow: `0 0 20px -5px ${tokens.colors.primary}40` });
export default function OfferCards(props) {
    return (_jsx("div", { style: containerStyle, children: props.cards.map((card, i) => (_jsxs("div", { style: card.highlight ? highlightedCardStyle : cardStyle, children: [_jsx("h3", { style: { margin: 0, fontSize: "1.5rem" }, children: card.title }), _jsx("div", { style: { fontSize: "2.5rem", fontWeight: "bold" }, children: card.price }), _jsx("ul", { style: { paddingLeft: 20, margin: 0, lineHeight: 1.6, opacity: 0.8 }, children: card.features.map((feat, j) => (_jsx("li", { children: feat }, j))) })] }, i))) }));
}
OfferCards.defaultProps = {
    cards: [
        {
            title: "Starter System",
            price: "$2,000/mo",
            features: ["Monthly Content Day", "Weekly Deliverables", "Social Audit"],
            highlight: false,
        },
        {
            title: "Growth System",
            price: "$4,500/mo",
            features: ["2x Content Days", "Daily Posting", "Strategy Calls", "Ad Creative"],
            highlight: true,
        },
    ]
};
addPropertyControls(OfferCards, {
    cards: {
        type: ControlType.Array,
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String },
                price: { type: ControlType.String },
                features: {
                    type: ControlType.Array,
                    control: { type: ControlType.String },
                },
                highlight: { type: ControlType.Boolean },
            },
        },
    },
});
