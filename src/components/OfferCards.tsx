import * as React from "react"
import { addPropertyControls, ControlType } from "framer"
import { tokens } from "../styles/tokens"

const containerStyle: React.CSSProperties = {
    display: "flex",
    flexWrap: "wrap",
    gap: tokens.spacing.l,
    justifyContent: "center",
    padding: tokens.spacing.xl,
    width: "100%",
}

const cardStyle: React.CSSProperties = {
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
}

const highlightedCardStyle: React.CSSProperties = {
    ...cardStyle,
    borderColor: tokens.colors.primary,
    boxShadow: `0 0 20px -5px ${tokens.colors.primary}40`,
}

interface Props {
    cards: {
        title: string
        price: string
        features: string[]
        highlight: boolean
    }[]
}

export default function OfferCards(props: Props) {
    return (
        <div style={containerStyle}>
            {props.cards.map((card, i) => (
                <div key={i} style={card.highlight ? highlightedCardStyle : cardStyle}>
                    <h3 style={{ margin: 0, fontSize: "1.5rem" }}>{card.title}</h3>
                    <div style={{ fontSize: "2.5rem", fontWeight: "bold" }}>{card.price}</div>
                    <ul style={{ paddingLeft: 20, margin: 0, lineHeight: 1.6, opacity: 0.8 }}>
                        {card.features.map((feat, j) => (
                            <li key={j}>{feat}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    )
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
}

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
})
