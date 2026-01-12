import * as React from "react"
import ReactPlayer from "react-player"
import { addPropertyControls, ControlType } from "framer"
import { tokens } from "../styles/tokens"

const containerStyle: React.CSSProperties = {
    width: "100%",
    height: "100vh",
    position: "relative",
    display: "flex", // Ensure it fills container in Framer if not 100vh
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: tokens.colors.background,
}

const playerWrapperStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    opacity: 0.6, // Dim video slightly
}

const contentStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    width: "100%",
    padding: tokens.spacing.l,
    maxWidth: 1200,
}

const titleStyle: React.CSSProperties = {
    fontSize: "clamp(3rem, 5vw, 6rem)",
    fontWeight: 800,
    color: tokens.colors.text,
    margin: 0,
    lineHeight: 1.1,
    textTransform: "uppercase",
    letterSpacing: "-0.02em",
}

interface Props {
    vimeoUrl: string
    title: string
    showTitle: boolean
}

export default function HeroNeon(props: Props) {
    const { vimeoUrl, title, showTitle } = props

    return (
        <div style={containerStyle}>
            {/* Background Video Layer */}
            <div style={playerWrapperStyle}>
                <ReactPlayer
                    url={vimeoUrl}
                    playing={true}
                    loop={true}
                    muted={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    style={{ position: 'absolute', top: 0, left: 0 }}
                    config={{
                        vimeo: {
                            playerOptions: {
                                background: 1,
                                loop: 1,
                                autoplay: 1,
                                muted: 1,
                                transparent: 0
                            }
                        }
                    }}
                />
            </div>

            {/* Content Layer (Optional overlays) */}
            {showTitle && (
                <div style={contentStyle}>
                    <h1 style={titleStyle}>{title}</h1>
                </div>
            )}
        </div>
    )
}

HeroNeon.defaultProps = {
    vimeoUrl: "https://vimeo.com/76979871", // Example Loop
    title: "MindBenT Media",
    showTitle: true,
}

addPropertyControls(HeroNeon, {
    vimeoUrl: {
        type: ControlType.String,
        title: "Vimeo URL",
        defaultValue: "https://vimeo.com/76979871",
    },
    title: {
        type: ControlType.String,
        title: "Hero Title",
        defaultValue: "MindBenT Media",
    },
    showTitle: {
        type: ControlType.Boolean,
        title: "Show Title",
        defaultValue: true,
    },
})
