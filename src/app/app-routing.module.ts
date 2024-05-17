import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './info/form/form.component';
import { LogInComponent } from './info/log-in/log-in.component';
import { SignUpComponent } from './info/sign-up/sign-up.component';
import { LandingComponent } from './landing/landing/landing.component';

const routes: Routes = [
  {path:'landing' ,component:LandingComponent },
  {path: '', redirectTo: 'landing', pathMatch: 'full' },
  {path:"form",component:FormComponent,
    children:[
    {path:"login",component:LogInComponent},
    {path:"signup",component:SignUpComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
