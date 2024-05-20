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
import { PostComponent } from './content/post/post.component';
import { PostListComponent } from './content/post-list/post-list.component';
import { ProductsComponent } from './products/products/products.component';
import { FilterComponent } from './products/filter/filter.component';
import { PostersComponent } from './products/posters/posters.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { FilterByPostIdPipe } from './pipes/filter-by-post-id.pipe';
import { LabComponent } from './lab/lab.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommandComponent } from './products/command/command.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';



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
    HomeComponent,
    ContactComponent,
    FilterByPostIdPipe,
    LabComponent,
    CommandComponent,
    UserProfileComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
