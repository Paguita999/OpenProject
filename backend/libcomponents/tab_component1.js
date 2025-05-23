import { BaseComponent } from './base_component.js'

export class TabComponent extends BaseComponent {
    constructor() {
        super();

        const style = document.createElement('style');
        style.textContent = `
            ${BaseComponent.styles}
            .tabs {
                display: flex;
                border-bottom: 2px solid var(--primary-color);
            }

            ::slotted(.tab) {  
                padding: 10px 20px;
                cursor: pointer;
                border: none;
                background: transparent;
                color: var(--text-color);
                font-size: 1.4em;
            }

            ::slotted(.tab.active) {  
                background: var(--primary-color);
                color: white;
            }

            ::slotted(.content > div ) {  
                display: none;
                padding: 20px;
                border: 1px solid var(--primary-color);
            }
        `;

        const tabsWrapper = document.createElement('div');
        tabsWrapper.classList.add('tabs');

        const tabsSlot = document.createElement('slot');
        tabsSlot.name = 'tabs';
        tabsWrapper.appendChild(tabsSlot);

        const contentWrapper = document.createElement('div');
        contentWrapper.classList.add('content');

        const contentSlot = document.createElement('slot');
        contentSlot.name = 'contents';
        contentWrapper.appendChild(contentSlot);

        this.shadowRoot.append(style, tabsWrapper, contentWrapper);
    }

    connectedCallback() {
        this.setupTabs();
    }

    setupTabs() {
        const tabs = this.querySelectorAll('.tab');
        const contents = this.shadowRoot
            .querySelector('slot[name="contents"]')
            ?.assignedElements()
            .flatMap(slot => Array.from(slot.children)) || [];

        contents.forEach((c, index) => {
            c.style.display = index === 0 ? 'block' : 'none';
        });

        tabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => t.classList.remove('active'));
                contents.forEach(c => c.style.display = 'none');

                tab.classList.add('active');
                if (contents[index]) {
                    contents[index].style.display = 'block';
                }
            });
        });

        tabs[0]?.classList.add('active');
        if (contents[0]) {
            contents[0].style.display = 'block';
        }
    }
}

customElements.define('tab-component', TabComponent);
