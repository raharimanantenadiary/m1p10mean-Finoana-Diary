import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: HttpClient) { }

  // apiurl = "localhost:4900/test/getAll";
  apiurl = "https://jf101.onrender.com/test/getAll";
  apiAdd = "https://jf101.onrender.com/test";

  url_finoana = "localhost:3000/api/users/";
  
  userinfo = [{"nom": "Tsanta","marque": "Toyota"},
              {"nom": "Manata","marque": "Chevrolet"},
              {"nom": "Ganta", "marque": "Renault"}];
  
  getListe_Nomena(){
    return this.http.get(this.url_finoana);
  }


  getCarData(){
    return this.userinfo;
  }

  getDataEmplist(){
    return this.http.get(this.apiurl);
  }

  getDataEmp(): Observable<any> {
    return this.http.get<any>(this.apiurl);
  }

  saveData(inputData:any){
      return this.http.post(this.apiAdd,inputData);
  }

  empById(id:any){
      return this.http.get(this.apiAdd+"/"+id);
  }
  
  modifEmp(id:any,inputData:any){
      return this.http.patch(this.apiAdd+"/"+id,inputData);
  }

    deleteEmp(id:any){
      return this.http.delete(this.apiAdd+"/"+id);
  }
}
