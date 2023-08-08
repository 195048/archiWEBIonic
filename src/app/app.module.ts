import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  // Add FormsModule
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent  } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';
import { UpdateRatingComponent } from './components/update-rating/update-rating.component';
import { MyMoviesComponent } from './components/my-movies/my-movies.component';
import { UserDetailsComponent } from './components/user-details/user-details.component';
import { ChangeAddressComponent } from './components/change-address/change-address.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomePageComponent,
    MovieDetailComponent,
    RateMovieComponent,
    UpdateRatingComponent,
    MyMoviesComponent,
    UserDetailsComponent,
    ChangeAddressComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,
    FormsModule,  // Add FormsModule to imports
    HttpClientModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
