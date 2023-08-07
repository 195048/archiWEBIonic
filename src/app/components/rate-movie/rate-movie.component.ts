import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../../services/rating.service';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.scss']
})
export class RateMovieComponent implements OnInit {
  ratingForm!: FormGroup;  
  movieTitle: string = '';
  userEmail: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private ratingService: RatingService,
    private movieService: MovieService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.movieTitle = this.route.snapshot.paramMap.get('movietitle') || '';
    this.userEmail = localStorage.getItem('email') || '';
    this.initForm();
  }

  initForm(): void {
    this.ratingForm = this.fb.group({
      score: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      review: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      const ratingData = {
        ...this.ratingForm.value,

      };
      this.ratingService.rateMovie(this.movieTitle,ratingData).subscribe(() => {
        // Navigate to another page or display a success message
        this.router.navigate(['/home']);
      }, error => {
        console.error('Error adding rating:', error);
      });
    }
  }
}
