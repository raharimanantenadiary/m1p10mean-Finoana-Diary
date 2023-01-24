import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  // apiurl = "localhost:4900/test/getAll";
  apiurl = "http://localhost:3050/api/";
  apiAdd = "https://jf101.onrender.com/test";




  signin(data: any) {
    return this.http.post(this.apiurl + "auth/signin", data);
  }

  signup(data: any) {
    return this.http.post(this.apiurl + "auth/signup", data);
  }

  activation(data: any) {
    console.log(data);
    return this.http.put(this.apiurl + "auth/activation", data);
  }



}
