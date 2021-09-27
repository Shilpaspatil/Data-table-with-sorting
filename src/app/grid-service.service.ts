import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class GridServiceService {
public serviceUrl ="https://reqres.in/api/users/";
  constructor(private http:HttpClient ) { }
  public getUserData(pageNo:number):Observable<any>{
    var url = this.serviceUrl +"?page=" +pageNo;
    return this.http.get(url,{});
  }
}
