import { Input, OnInit, Component, Output, EventEmitter }       from '@angular/core';
import { MdTab, MdTabGroup }                                    from '@angular/material';
import { ReviewService }                                        from './review.service';
import { ReviewModel }                                          from './review.model';

@Component({
  moduleId: module.id,
  selector: 'review-component',
  templateUrl: 'review.html',
  providers: [ReviewService],
  inputs: ['url', 'userInfo']
})

export class ReviewComponent implements OnInit {
  @Output() statusChange = new EventEmitter();
  url: any;
  userInfo: any;
  reviews: any;
  groupedReviews: any;
  error: any;

  constructor(private _reviewService: ReviewService) {
    this.reviews = [];
    this.groupedReviews = {};
  }

  ngOnInit() {
    this._reviewService.getReview(this.url)
      .subscribe(
      (data: any) => this.setReviews(data),
      (error: any) => this.error = error
      );
  }

  setReviews(reviews: any) {
    this.reviews = reviews.map((review: any) => {
      return new ReviewModel(review);
    });
    this.groupedReviews["Open"] = this.groupReview("In Progress");
    this.groupedReviews["Submitted"] = this.groupReview("Submitted");
    this.groupedReviews["Declined"] = this.groupReview("Declined");
  }

  groupReview(reviewStatus: any) {
    return this.reviews.filter((review: any) => {
      return review.ReviewStatus == reviewStatus;
    });
  }

  onStatusChange(data: any) {
    this.statusChange.emit(data);
    this.updateReview(data);
  }

  updateReview(data: ReviewModel) {
    let index = this.reviews.findIndex((review: any) => {
      return review.ReviewId == data.ReviewId;
    })
    this.reviews[index] = data;
    this.setReviews(this.reviews);
  }
}
