import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent  } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';

@NgModule({
  declarations: [AppComponent,LoginComponent,HomePageComponent,MovieDetailComponent,RateMovieComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    ReactiveFormsModule,  // Add ReactiveFormsModule
    HttpClientModule  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Add CUSTOM_ELEMENTS_SCHEMA
})
export class AppModule {}
