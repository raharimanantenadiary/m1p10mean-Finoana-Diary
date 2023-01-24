import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SvoitureService {

  constructor(private http: HttpClient) { }

  api = "";

  ajoutVoiture(data:any){
    this.http.post(this.api + '/post/', data);
  }
  
  modifierVoiture(data:any){
    this.http.patch(this.api + '/update/', data);
  }

  saveData(inputData:any){
    return this.http.post(this.api,inputData);
}

empById(id:any){
    return this.http.get(this.api+"/"+id);
}

modifEmp(id:any,inputData:any){
    return this.http.patch(this.api+"/"+id,inputData);
}

  deleteEmp(id:any){
    return this.http.delete(this.api+"/"+id);
}

}
