export class Employer{
    nom: string = '';
    type: boolean = true;
    age: number = 0;

    constructor (nom: string, type: boolean, age:number){
        this.nom = nom;
        this.type = type;
        this.age = age;
    }
  }