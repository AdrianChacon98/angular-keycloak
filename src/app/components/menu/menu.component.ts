import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  public isAdmin:boolean;
  public isLogged:boolean;
  public username:string;

  constructor(private loginService:LoginService) {

    this.loginService.isAdminSubject.subscribe(subcriber=>{

      this.isAdmin=subcriber;
    });

    this.loginService.isLoggedSubject.subscribe(subcriber=>{

      this.isLogged=subcriber;
    });

    this.loginService.usernameSubject.subscribe(subscriber=>{

      this.username = subscriber;
    })


  }

  ngOnInit(): void {
  }

  public login():void{
    this.loginService.login();
  }
  public logout():void{
    this.loginService.setIsAdmin(false);
    this.loginService.setIsLogged(false);
    this.loginService.setUsername("");
    this.loginService.logout();

  }

}
