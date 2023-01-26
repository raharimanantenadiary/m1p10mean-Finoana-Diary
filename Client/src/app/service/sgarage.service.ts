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


  listedepot() {
    return this.http.get(this.apiurl + "depot/");
  }

  ajoutDeposition(inputData: any) {
    return this.http.post(this.apiurl + 'depot/save', inputData);
  }

  ajoutDeposition_dans_reparation(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/save', inputData);
  }

  listeReparation() {
    return this.http.get(this.apiurl + "reparation/");
  }
  
  detailDepot_dans_Reparation(id:any){
    return this.http.get(this.apiurl + "reparation/infodepot/"+id);
  }

  ajoutListeReparation(inputData: any) {
    return this.http.post(this.apiurl + 'reparation/saveDiag', inputData);
  }
  
  // ajoutListeReparation(inputData: any) {
  //   return this.http.put(this.apiurl + 'reparation/saveDiag', inputData);
  // }
  
  

}
