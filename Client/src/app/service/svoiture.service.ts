import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvoitureService {

  constructor(private http: HttpClient) { }

  api = "http://localhost:3050/api/";

  ajoutVoiture(inputData: any) {
    return this.http.post(this.api + 'voiture/save', inputData);
  }

  modifierVoiture(data: any) {
    return this.http.patch(this.api + '/update/', data);
  }



  voitureById(id: any) {
    return this.http.get(this.api + "voiture/byclient/" + id);
  }
  
  voitureByIdDansGarage(id: any) {
    return this.http.get(this.api + "voiture/byclient/garage/" + id);
  }

  


}
