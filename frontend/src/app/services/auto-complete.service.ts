import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutoCompleteService {

  private url = 'https://shopperzoid.stackroute.io:8443/product/api/v1/productNames';

  constructor(private http: HttpClient) { }

  getAllProductsList(): Observable<any> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Authorization': 'Bearer ' + localStorage.getItem('token')
    //   })
    // };
    return this.http.get<any>(this.url);
  }


}
