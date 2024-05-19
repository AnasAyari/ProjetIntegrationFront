import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './static/header/header.component';
import { BannerComponent } from './landing/banner/banner.component';
import { LandingComponent } from './landing/landing/landing.component';
import { PostersSecComponent } from './landing/posters-sec/posters-sec.component';
import { CardComponent } from './landing/card/card.component';
import { PersoSecComponent } from './landing/perso-sec/perso-sec.component';
import { SuggestionComponent } from './landing/suggestion/suggestion.component';
import { FormComponent } from './info/form/form.component';
import { LogInComponent } from './info/log-in/log-in.component';
import { SignUpComponent } from './info/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './content/post/post.component';
import { PostListComponent } from './content/post-list/post-list.component';
import { ProductsComponent } from './products/products/products.component';
import { FilterComponent } from './products/filter/filter.component';
import { PostersComponent } from './products/posters/posters.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    LandingComponent,
    PostersSecComponent,
    CardComponent,
    PersoSecComponent,
    SuggestionComponent,
    FormComponent,
    LogInComponent,
    SignUpComponent,
    PostComponent,
    PostListComponent,
    ProductsComponent,
    FilterComponent,
    PostersComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
