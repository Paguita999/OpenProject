/* 
 * Fet per Guillem (sussy baka)
 */

import { BaseComponent } from './base_component.js'

export class ScaffoldComponent extends BaseComponent {
    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${BaseComponent.styles}
                :host {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                }

                .header {
                    background-color: var(--primary-color);
                    background-image: url(img/elust-pizza.png);
                    background-repeat: no-repeat;
                    background-size: contain;

                    color: white;
                    padding: 15px;
                    font-size: 1.5rem;
                    text-align: center;
                }

                .content {
                    flex: 1;
                    padding: 20px;
                    background: var(--background-color);
                }
            </style>
            <div class="header">
                <slot name="header">Capçalera</slot>
            </div>
            <div class="content">
                <slot name="content"></slot>
            </div>
        `;
    }
}

customElements.define('scaffold-component', ScaffoldComponent);
