import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { RateMovieComponent } from './components/rate-movie/rate-movie.component';
import { UpdateRatingComponent } from './components/update-rating/update-rating.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  {
    path: 'movie/:title',
    component: MovieDetailComponent
  },
  {
    path : 'rate-movie/:movietitle',
    component : RateMovieComponent
  },
  {
    path : 'update-rating/:email/:title',
    component : RateMovieComponent
  },
  // ... (other routes if any)
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule { }

