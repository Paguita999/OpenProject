import { BaseComponent } from './base_component.js'

export class ScaffoldComponent extends BaseComponent {
    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = `
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
        `;

        const header = document.createElement('div');
        header.classList.add('header');
        const headerSlot = document.createElement('slot');
        headerSlot.name = 'header';
        headerSlot.textContent = 'Capçalera';
        header.appendChild(headerSlot);

        const content = document.createElement('div');
        content.classList.add('content');
        const contentSlot = document.createElement('slot');
        contentSlot.name = 'content';
        content.appendChild(contentSlot);

        this.shadowRoot.append(style, header, content);
    }
}

customElements.define('scaffold-component', ScaffoldComponent);
