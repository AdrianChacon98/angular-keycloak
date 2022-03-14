import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class SignupGuard implements CanActivate {


  constructor(private router:Router,private loginService:LoginService){}


  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {

    if(this.loginService.getIsLogged())
    {
      this.router.navigate(["/"]);
      return false;
    }

    return true;
  }

}
