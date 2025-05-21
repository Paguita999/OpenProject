export class ProjecteModel {
    constructor({id, identifier, name, description, createdAt, _links, statusExplanation}){
        this.id = id;
        this.identifier = identifier;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.status = _links.status;
        this.statusExplanation = statusExplanation;
    }

    toString() {
        return `${this.name} (${this.identifier}) - ${this.status.title}`;
    }
}
