import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginServicesService {

  constructor(private http:  HttpClient) { }

  login(payload: any) : any{
    return this.http.post<any>(`${environment.app}/login`,payload)
  }

  register(payload: any){
    return this.http.post<any>(`${environment.app}/signup`,payload)
  }
}
