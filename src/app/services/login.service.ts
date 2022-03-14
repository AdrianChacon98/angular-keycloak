import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //subjects
  public  usernameSubject=new BehaviorSubject("");
  usernameSubject$ = this.usernameSubject.asObservable();
  public   isLoggedSubject = new BehaviorSubject(false);
  isLoggedSubject$ = this.isLoggedSubject.asObservable();
  public  isAdminSubject = new BehaviorSubject(false);
  isAdminSubject$ = this.isAdminSubject.asObservable();

  //variables
  private username:string;
  private isLogged:boolean;
  private isAdmin:boolean;




  constructor(private oauthService:OAuthService)
  {
    this.username=this.getUsernameLocalStorage();
    this.isLogged=this.getIsLoggedLocalStorage();
    this.isAdmin=this.getIsAdminLocalStorage();

    this.usernameSubject.next(this.username);
    this.isLoggedSubject.next(this.isLogged);
    this.isAdminSubject.next(this.isAdmin);

  }


  //setters and getters
  public setUsername(username:string){
    this.username=username;
    localStorage.setItem("username",this.username);
    this.usernameSubject.next(this.username);
  }

  public getUsername():string{
    return this.username;
  }

  public setIsLogged(isLogged:boolean){
    this.isLogged=isLogged;
    localStorage.setItem("isLogged",this.isLogged.toString());
    this.isLoggedSubject.next(this.isLogged);
  }
  public getIsLogged():boolean{
    return this.isLogged;
  }
  public setIsAdmin(isAdmin:boolean){
    this.isAdmin=isAdmin;
    localStorage.setItem("isAdmin",this.isAdmin.toString());
    this.isAdminSubject.next(this.isAdmin);
  }
  public getIsAdmin():boolean{
    return this.isAdmin;
  }

  //methods for get the values from localstorage
  private getIsLoggedLocalStorage():boolean{
    const logged = localStorage.getItem("isLogged");
    return logged?logged==='true':false;
  }
  private getIsAdminLocalStorage():boolean{
    const admin = localStorage.getItem("isAdmin");
    return admin?admin==='true':false;
  }
  private getUsernameLocalStorage():string{
    const username=localStorage.getItem("username");
    return username?username:"";
  }


  //methods login and logout
  public login():void{
    this.oauthService.initImplicitFlowInternal();
  }

  public logout():void{

    this.oauthService.logOut();
  }






}
