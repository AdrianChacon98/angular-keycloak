import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {


  public  foo:Foo;



  constructor(private fooService:FooService,private router:Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params["id"];

    this.fooService.detail(id).subscribe(data=>{this.foo=data},error=>console.log(error))

  }

  update():void{
    const id = this.activatedRoute.snapshot.params['id'];

    this.fooService.update(id,this.foo).subscribe(
      data=>{
        console.log(data);
        this.volver();
      },error=>console.log(error)
    )

  }

  public volver():void{
    this.router.navigate(['/list']);
  }



}
