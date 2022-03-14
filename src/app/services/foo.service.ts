import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Foo } from '../models/foo';



@Injectable({
  providedIn: 'root'
})
export class FooService {

  private url:string=`${environment.API_URL}/foo`;
  private httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };


  constructor(private httpClient:HttpClient) {

  }


  public list():Observable<Foo[]>{

    return this.httpClient.get<Foo[]>(this.url+"/list",this.httpOptions);
  }

  public detail(id:number):Observable<Foo>{
    return this.httpClient.get<Foo>(this.url+`/detail/${id}`,this.httpOptions);
  }

  public create(foo:Foo):Observable<any>
  {

    const data = this.httpClient.post<any>(this.url+`/create`,JSON.stringify(foo),this.httpOptions);

    return data;

  }

  public update(id:number,foo:Foo):Observable<any>{
    return this.httpClient.put<any>(this.url+`/update/${id}`,foo,this.httpOptions);
  }

  public delete(id:number):Observable<any>{
    return this.httpClient.delete<any>(this.url+`/delete/${id}`,this.httpOptions);
  }





}
