export class UsersModel{
    constructor({_type,id,name,createdAt,updatedAt,login,admin,firstName,lastName,email,avatar,status,identityUrl,language}){
        this.type=type;
            this.id=id;
            this.name=name;
            this.createdAt=createdAt;
            this.updatedAt=updatedAt;
            this.login=login;
            this.admin=admin;
            this.firstName=firstName;
            this.lastName=lastName;
            this.email=email;
            this.avatar=avatar;
            this.status=status;
            this.identityUrl=identityUrl;
            this.language=language;
    }

    toString(){
        return '${this._type} (${this.id} (${this.name} (${this.createdAt} ($this.updatedAt) ($this.login) ($this.admin)($this.firstName) ($this.lastName) ($this.email) ($this.avatar) ($this.status) ($this.identityUrl) ($this.language)';
    }
}

