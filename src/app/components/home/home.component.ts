import { Component, OnInit } from '@angular/core';
import { Subscriber } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public username:string;


  constructor(private loginService:LoginService)
  {

    loginService.usernameSubject.subscribe(Subscriber=>{
      this.username=Subscriber;
    })


  }

  ngOnInit(): void {

  }

}
