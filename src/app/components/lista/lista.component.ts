import { Component, OnInit } from '@angular/core';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';
import { LoginService } from 'src/app/services/login.service';
@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  public fooList:Foo[]=[];
  public admin:boolean;


  constructor(private fooService:FooService,private loginService:LoginService) {


  }

  ngOnInit(): void {
    this.loadFoo();
    this.admin=this.loginService.getIsAdmin();

  }

  private loadFoo():void{
    this.fooService.list().subscribe(
      data=>this.fooList=data,
      error=>console.log(error),
      ()=>console.log("completer")
    );


  }
  public delete(id:number):void{

    this.fooService.delete(id).subscribe(
      data=>{
        console.log(data.message)
        this.loadFoo();
      },
      error=>console.log(error)
    );


  }


}
