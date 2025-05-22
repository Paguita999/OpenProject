import { BaseComponent } from '../libcomponents/base_component.js';

class projectscard extends BaseComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        const type=type.getAttribute(users-type);
        const id=id.getAttribute(users-id);
        const name=name.getAttribute(users-name);
        const createdAt=createdAt.getAttribute(users-createdAt);
        const updatedAt=updatedAt.getAttribute(users-updatedAt);
        const login=login.getAttribute(users-login);
        const admin=admin.getAttribute(users-admin);
        const firstName=firstName.getAttribute(users-firstName);
        const lastName=lastName.getAttribute(users-lastName);
        const email=email.getAttribute(users-email);
        const avatar=avatar.getAttribute(users-avatar);
        const status=status.getAttribute(users-status);
        const identityUrl=identityUrl.getAttribute(users-identityUrl);
        const language=language.getAttribute(users-language);
    }
}