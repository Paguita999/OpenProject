export class ProjecteModel {
    constructor({id, nom, desc, vegetariana, alergens, img, preu}){
        this.id=id;
        this.nom=nom;
        this.desc=desc;
        this.vegetariana=vegetariana;
        this.alergens=alergens;
        this.img=img;
        this.preu=preu;
    }


    toString() {
        return `${this.nom} - ${this.preu} €`;
    }
}
