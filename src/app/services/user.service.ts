import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private url:string=`${environment.API_URL}/user`;
  private httpOptions = {
    headers:new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private httpClient:HttpClient)
  {



  }

  public create(user:User):Observable<any>{

    return this.httpClient.post<User>(this.url+"/create",user,this.httpOptions);

  }
}
