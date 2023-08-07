import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import {RatingService} from '../../services/rating.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie$!: Observable<any>;  // Make this an observable
  movieTitle: string = '';
  userRating: any = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private ratingService: RatingService,
    private router: Router
  ) { }
  

  ngOnInit() {
    this.movieTitle = this.route.snapshot.paramMap.get('title') || '';
    console.log("title "+ this.movieTitle);
    this.movie$ = this.getMovie();
    this.getUserRating();
  }

  getMovie(): Observable<any> {
    return this.movieService.getMovie(this.movieTitle);
  }
  

  getUserRating(): void {
    const userEmail = localStorage.getItem('email') || '';
    if (userEmail && this.movieTitle) {
      this.ratingService.getRatingByEmailAndTitle(userEmail, this.movieTitle).subscribe(
        response => {
          this.userRating = response;
        },
        error => {
          console.log("No rating found for this movie from this user");
        }
      );
    }
  }

  updateRating(): void {
    const userEmail = localStorage.getItem('email') || '';
    if (userEmail && this.movieTitle) {
      this.router.navigate([`/update-rating/${userEmail}/${this.movieTitle}`]);
    }
  }
}
