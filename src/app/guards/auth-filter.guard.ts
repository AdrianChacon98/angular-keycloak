import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthFilterGuard implements CanActivate {


  constructor(private loginService:LoginService,private router:Router){}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {


    const requiredRoles=route.data['requiredRoles'];

    if(!this.loginService.getIsLogged()){
      this.router.navigate(["/signup"]);
      return false;
    }

    const realmRole:string = this.loginService.getIsAdmin()?'admin':'user';


    console.log(realmRole);
    console.log(requiredRoles);
    console.log(requiredRoles.indexOf(realmRole)===-1);

    if(requiredRoles.indexOf(realmRole) === -1){

      this.router.navigate(["/"]);
      return false;
    }


    return true;
  }

}
