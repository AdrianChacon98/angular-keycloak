import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  public form:FormGroup;


  constructor(private userService:UserService,private router:Router,private formBuilder:FormBuilder) {
    this.buildForm();
  }



  ngOnInit(): void {
  }



  private buildForm(){

    this.form=this.formBuilder.group({
      username:['',[Validators.required]],
      email:['',[Validators.email]],
      firstName:['',[Validators.required]],
      lastName:['',[Validators.required]],
      password:['',[Validators.required]]
    });
  }



  public save(event:Event){
    console.log(this.form.value);

    const newUser = new User(this.form.value.username,this.form.value.email,this.form.value.firstName,this.form.value.lastName,this.form.value.password);


    this.userService.create(newUser).subscribe(data=>
      {
        console.log(data);
        this.volver();
      },
      error=>console.log(error)
    );

  }

  public volver():void{
    this.router.navigate(['/']);
  }






}
