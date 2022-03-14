import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Foo } from 'src/app/models/foo';
import { FooService } from 'src/app/services/foo.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {


  public foo:Foo;

  constructor(private fooService:FooService,private activedRoute:ActivatedRoute,private router:Router) { }



  ngOnInit(): void {

    const id = this.activedRoute.snapshot.params['id'];
    this.fooService.detail(id).subscribe(
      subscriber=>{
        this.foo=subscriber;
      },
      error=>console.log(error),
      ()=>console.log("Completed")
    )

  }

  volver():void{
    this.router.navigate(['/list']);
  }

}
