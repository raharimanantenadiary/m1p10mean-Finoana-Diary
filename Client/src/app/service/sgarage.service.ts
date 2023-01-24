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


}
