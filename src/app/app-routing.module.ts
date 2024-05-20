import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './info/form/form.component';
import { LogInComponent } from './info/log-in/log-in.component';
import { SignUpComponent } from './info/sign-up/sign-up.component';
import { LandingComponent } from './landing/landing/landing.component';
import { HomeComponent } from './home/home.component';
import { PostListComponent } from './content/post-list/post-list.component';
import { ProductsComponent } from './products/products/products.component';
import { authGuard } from './guard/auth.guard';
import { ContactComponent } from './contact/contact.component';
import { PosterDetailComponent } from './products/poster-detail/poster-detail.component';
import { CommandComponent } from './products/command/command.component';
import { LabComponent } from './lab/lab.component';

const routes: Routes = [
 
   { path: '', redirectTo: 'home', pathMatch: 'full' },
  

  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'poster-detail/:id', component: PosterDetailComponent },
      { path: 'comunity', component: PostListComponent ,canActivate: [authGuard]},
      { path : 'contact' , component: ContactComponent,canActivate:[authGuard]},
      { path: '', redirectTo: 'landing', pathMatch: 'full' },
      { path: '**', redirectTo: 'landing', pathMatch: 'full' },
    ],
  },

  {
    path: 'form',
    component: FormComponent,
    children: [
      { path: 'login', component: LogInComponent },
      { path: 'signup', component: SignUpComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
