import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {


  public foo:Foo;
  public fooName:string;

  constructor(private fooService:FooService,private router:Router) { }


  ngOnInit(): void {


  }

  public create():void{

    this.foo=new Foo(null,this.fooName);

    this.fooService.create(this.foo).subscribe(
      data=>{
        console.log(data);
        this.router.navigate(['/list']);
      },
      error=>console.log(error),
    );

  }

  public volver():void{
    this.router.navigate(['/list']);
  }


}
