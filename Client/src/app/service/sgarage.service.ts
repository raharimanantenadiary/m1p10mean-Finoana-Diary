import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SgarageService {


  constructor(private http: HttpClient) { }

  // apiurl = "localhost:4900/test/getAll";
  apiurl = "http://localhost:3050/api/";
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
  
  listeReparationFin() {
    return this.http.get(this.apiurl + "reparation/finition/template");
  }
  
  detailDepot_dans_Reparation(id:any){
    return this.http.get(this.apiurl + "reparation/infodepot/"+id);
  }

  ajoutListeReparation(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/saveDiag', inputData);
  }
  
  transfertDansFin(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/finir', inputData);
  }
  
  listeReparationByVoitureReparation(idreparation:any, idvoiture:any) {
    return this.http.get(this.apiurl + 'reparation/findRep/'+idreparation+"/"+idvoiture);
  }
  
  updateDiag(inputData: any) {
    return this.http.put(this.apiurl + 'reparation/update', inputData);
  }
  
  

}
