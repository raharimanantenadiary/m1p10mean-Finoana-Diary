export class Client {
    id: number ;
    nom: string;
    role: String;
    is_active: boolean;

    constructor(id: number, nom:string, role:string , is_active:boolean){
            this.id = id;
            this.nom = nom;
            this.role = role;
            this.is_active = is_active;
    }
}