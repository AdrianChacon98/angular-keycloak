import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './components/create/create.component';
import { DetailComponent } from './components/detail/detail.component';
import { HomeComponent } from './components/home/home.component';
import { ListaComponent } from './components/lista/lista.component';
import { SignupComponent } from './components/signup/signup.component';
import { UpdateComponent } from './components/update/update.component';
import { AuthFilterGuard } from './guards/auth-filter.guard';
import { SignupGuard } from './guards/signup.guard';

const routes: Routes = [

  {path:'list',component:ListaComponent, canActivate:[AuthFilterGuard],data:{requiredRoles:["admin","user"]}},
  {path:'create',component:CreateComponent,canActivate:[AuthFilterGuard],data:{requiredRoles:["admin","user"]}},
  {path:'detail/:id',component:DetailComponent,canActivate:[AuthFilterGuard],data:{requiredRoles:["admin","user"]}},
  {path:'update/:id',component:UpdateComponent,canActivate:[AuthFilterGuard],data:{requiredRoles:["admin","user"]}},
  {path:'signup',component:SignupComponent,canActivate:[SignupGuard]},
  {path:'',component:HomeComponent},
  {path:'**',redirectTo:'',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
