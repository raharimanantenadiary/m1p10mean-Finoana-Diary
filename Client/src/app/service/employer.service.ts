import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private http: HttpClient) { 

    getListeEmp(){
        return this.http.get('localhost:4900/test');
    }
  }
}
