import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistractionService {

  postUrl="http://localhost:3000/enroll"
  constructor(private http: HttpClient) { }

  register(userData: object):Observable<any>{
    return this.http.post<any>(this.postUrl, userData) 
  }
}
