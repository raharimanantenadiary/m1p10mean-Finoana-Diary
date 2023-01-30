import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SgarageService {


  constructor(private http: HttpClient) { }

  // apiurl = "localhost:4900/test/getAll";
  // apiurl = "http://localhost:3050/api/";
  apiurl = "https://projet-mean.onrender.com/api/";
  apiAdd = "https://jf101.onrender.com/test";


  //liste depot no averin ito
  listedepot() {
    return this.http.get(this.apiurl + "depot/");
  }

  ajoutDeposition(inputData: any) {
    return this.http.post(this.apiurl + 'depot/save', inputData);
  }

  ajoutDeposition_dans_reparation(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/save', inputData);
  }

  //liste reparation no averin ito
  listeReparation() {
    return this.http.get(this.apiurl + "reparation/");
  }
  
  listemoyenneparvoiture() {
    return this.http.get(this.apiurl + "reparation/moyenne/voiture");
  }
  

  
  listeReparationFin() {
    return this.http.get(this.apiurl + "reparation/finition/template");
  }
  
  detailDepot_dans_Reparation(id:any){
    return this.http.get(this.apiurl + "reparation/infodepot/"+id);
  }
  
  voirAvancement(id:any){
    return this.http.get(this.apiurl + "reparation/findAvancement/"+id);
  }
  
  voirHistorique(id:any){
    return this.http.get(this.apiurl + "reparation/histoRep/"+id);
  }

  ajoutListeReparation(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/saveDiag', inputData);
  }
  
  transfertDansFin(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/finir', inputData);
  }
 
  validationBondeSortie(inputData: any) {
    return this.http.put(this.apiurl + 'bonsortie/validation', {"idBonSortie": inputData});
  }
 
  recuperarationVoiture(idvoiture: any) {
    return this.http.put(this.apiurl + 'voiture/recuperation/',{"idvoiture": idvoiture});
  }
  
  listeReparationByVoitureReparation(idreparation:any, idvoiture:any) {
    return this.http.get(this.apiurl + 'reparation/findRep/'+idreparation+"/"+idvoiture);
  }
  
  reparationPourBondeSortie(idreparation:any, idvoiture:any) {
    return this.http.get(this.apiurl + 'reparation/findRepfin/'+idreparation+"/"+idvoiture);
  }
  
  updateDiag(inputData: any) {
    return this.http.put(this.apiurl + 'reparation/update', inputData);
  }
  
  

}
