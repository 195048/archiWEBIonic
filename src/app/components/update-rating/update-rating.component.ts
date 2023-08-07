import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RatingService } from '../../services/rating.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-rating',
  templateUrl: './update-rating.component.html',
  styleUrls: ['./update-rating.component.scss']
})
export class UpdateRatingComponent implements OnInit {
  ratingForm!: FormGroup;
  userEmail: string | null = '';
  movieTitle: string | null = '';

  constructor(
    private fb: FormBuilder,
    private ratingService: RatingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email');
    this.movieTitle = this.route.snapshot.paramMap.get('title');
    
    this.initForm();
    this.loadRatingData();
  }

  initForm(): void {
    this.ratingForm = this.fb.group({
      title: ['', [Validators.required]],
      score: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      review: ['']
    });
  }

  loadRatingData(): void {
    if (this.userEmail && this.movieTitle) {
      this.ratingService.getRatingByEmailAndTitle(this.userEmail, this.movieTitle).subscribe(
        rating => {
          this.ratingForm.patchValue({
            title: rating.title,
            score: rating.value,
            review: rating.comment
          });
        },
        error => {
          console.error('Error loading rating data:', error);
        }
      );
    }
  }

  onSubmit(): void {
    if (this.ratingForm.valid) {
      const ratingData = this.ratingForm.value;
      this.ratingService.updateRatingByEmailAndTitle(this.userEmail,this.movieTitle,this.ratingForm.score,this.ratingForm.review).subscribe(
        () => {
          console.log('Rating updated successfully!');
          this.router.navigate(['/home']);
        },
        error => {
          console.error('Error updating rating:', error);
        }
      );
    }
  }
}
