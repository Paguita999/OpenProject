class MyAlert extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.type = "info";
        this.message = "Missatge per defecte";
        this.timeout = 5000;

        // Crear estructura HTML una sola vez
        this.styleElement = document.createElement("style");
        this.iconSpan = document.createElement("span");
        this.iconSpan.classList.add("icon");

        this.messageSpan = document.createElement("span");

        this.closeBtn = document.createElement("button");
        this.closeBtn.classList.add("close-btn");
        this.closeBtn.innerHTML = "&times;";
        this.closeBtn.addEventListener("click", () => this.remove());

        this.shadowRoot.append(this.styleElement, this.iconSpan, this.messageSpan, this.closeBtn);
    }

    static get observedAttributes() {
        return ["type", "message", "timeout"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "type") this.type = newValue;
        if (name === "message") this.message = newValue;
        if (name === "timeout") this.timeout = parseInt(newValue);

        this.updateDisplay(); // Actualiza el contenido sin render()
    }

    connectedCallback() {
        this.updateDisplay();
        setTimeout(() => this.remove(), this.timeout);
    }

    updateDisplay() {
        this.styleElement.textContent = `
            :host {
                position: fixed;
                top: 20px;
                right: 20px;
                background: ${this.getBackgroundColor()};
                color: white;
                padding: 15px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                font-family: Arial, sans-serif;
                display: flex;
                align-items: center;
                gap: 10px;
                animation: fadeIn 0.3s ease-out;
                z-index: 9999;
            }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }

            .icon {
                font-size: 20px;
            }

            .close-btn {
                margin-left: auto;
                background: transparent;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
            }
        `;

        this.iconSpan.textContent = this.getIcon();
        this.messageSpan.textContent = this.message;
    }

    getBackgroundColor() {
        switch (this.type) {
            case "success": return "#2ecc71";
            case "error": return "#e74c3c";
            case "warning": return "#f39c12";
            case "info": return "#3498db";
            default: return "#95a5a6";
        }
    }

    getIcon() {
        switch (this.type) {
            case "success": return "✅";
            case "error": return "❌";
            case "warning": return "⚠️";
            case "info": return "ℹ️";
            default: return "💬";
        }
    }
}

customElements.define("my-alert", MyAlert);

export function ShowMyAlert(type, message, options = {}) {
    const alertBox = document.createElement("my-alert");
    alertBox.setAttribute("type", type);
    alertBox.setAttribute("message", message);
    if (options.timeout) alertBox.setAttribute("timeout", options.timeout);

    document.body.appendChild(alertBox);
}