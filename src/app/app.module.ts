import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { HttpClientModule } from '@angular/common/http';

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
    SignUpComponent
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
