import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './info/form/form.component';
import { LogInComponent } from './info/log-in/log-in.component';
import { SignUpComponent } from './info/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
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
