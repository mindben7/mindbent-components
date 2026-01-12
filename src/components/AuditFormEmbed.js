import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { addPropertyControls, ControlType } from "framer";
export default function AuditFormEmbed(props) {
    const { portalId, formId } = props;
    React.useEffect(() => {
        const script = document.createElement("script");
        script.src = "//js.hsforms.net/forms/embed/v2.js";
        document.body.appendChild(script);
        script.addEventListener("load", () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    region: "na1",
                    portalId: portalId,
                    formId: formId,
                    target: "#hubspot-form-container"
                });
            }
        });
        return () => {
            // Cleanup if needed, though removing script tag doesn't remove the form
        };
    }, [portalId, formId]);
    return (_jsx("div", { id: "hubspot-form-container", style: {
            width: '100%',
            minHeight: 400,
            padding: 20,
            background: 'rgba(255,255,255,0.02)',
            borderRadius: 8
        } }));
}
AuditFormEmbed.defaultProps = {
    portalId: "",
    formId: "",
};
addPropertyControls(AuditFormEmbed, {
    portalId: { type: ControlType.String, title: "Portal ID" },
    formId: { type: ControlType.String, title: "Form ID" },
});
