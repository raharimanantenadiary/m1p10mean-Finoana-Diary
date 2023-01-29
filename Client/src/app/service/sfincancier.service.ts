import { ListepaiementComponent } from './../composant/financier/listepaiement/listepaiement.component';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SfincancierService {

 

  constructor(private http: HttpClient) { }


  apiurl = "http://localhost:3050/api/";
  apiAdd = "https://jf101.onrender.com/test";


  listeFactureNonValide() {
    return this.http.get(this.apiurl + "facture/nonValide");
  }
 
  
  validerFacture(inputdata: any) {
    return this.http.post(this.apiurl + "facture/validerFacture", inputdata);
  }



  facturebyvoiture(idvoiture:any) {
    return this.http.get(this.apiurl + "facture/byvoiture/"+idvoiture);
  }


  beneficeMois(mois:any){
     return this.http.get(this.apiurl + "facture/benefice/"+mois);
  }

  chiffremois(mois:any){
     return this.http.get(this.apiurl + "facture/chiffre/"+mois);
  }
 
  getAllTypeDepense(){
     return this.http.get(this.apiurl + "depense/");
  }

  ajoutTypeDepense(inputdata: any) {
    return this.http.post(this.apiurl + "depense/saveType", inputdata);
  }
  
  ajoutDepense(inputdata: any) {
    return this.http.post(this.apiurl + "depense/save", inputdata);
  }


}
