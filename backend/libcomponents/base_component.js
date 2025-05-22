/* 
 * Fet per Guillem (sussy baka)
 */

export class BaseComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    static get styles() {
        return `
            :host {
                font-family: 'Bangers', 'Arial', sans-serif;
                --primary-color: #ff3131;
                --secondary-color: #ffd700;
                --accent-color: #4a90e2;
                --dark-red: #8b0000;
                --text-color: #ffffff;
                --background-color: #1a1a1a;
                --card-gradient: linear-gradient(145deg, #2a2a2a 0%, #1a1a1a 100%);
            }

            * {
                box-sizing: border-box;
            }

            body {
                background-color: var(--background-color);
                color: var(--text-color);
                background-image: 
                    linear-gradient(45deg, rgba(255, 49, 49, 0.05) 0%, transparent 20%),
                    linear-gradient(-45deg, rgba(74, 144, 226, 0.05) 0%, transparent 20%);
            }

            h2 {
                color: var(--primary-color);
                text-transform: uppercase;
                letter-spacing: 2px;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            }

            .tab {
                background: linear-gradient(to bottom, var(--primary-color), var(--dark-red));
                color: var(--text-color);
                border: none;
                padding: 12px 24px;
                cursor: pointer;
                text-transform: uppercase;
                font-weight: bold;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            }

            .tab:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 8px rgba(0,0,0,0.3);
                background: linear-gradient(to bottom, var(--dark-red), var(--primary-color));
            }

            #llista-pizzes, #llista-entrants, #carret-comanda {
                background: var(--card-gradient);
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.2);
                border: 1px solid rgba(255,49,49,0.1);
            }

            button[slot="tabs"] {
                margin-right: 10px;
                border-radius: 4px;
                position: relative;
                overflow: hidden;
            }

            button[slot="tabs"]::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(rgba(255,255,255,0.1), transparent);
                opacity: 0;
                transition: opacity 0.3s;
            }

            button[slot="tabs"]:hover::after {
                opacity: 1;
            }
        `;
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>${BaseComponent.styles}</style>
            <slot></slot>
        `;
    }
}

customElements.define('base-component', BaseComponent);