import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SclientService {

  constructor(private http: HttpClient) { }
  api_client = "";

  getUserInformation(){
      return;
  }

  


}
