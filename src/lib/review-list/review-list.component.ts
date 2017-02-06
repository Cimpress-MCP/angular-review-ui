import { Input, Component, Output, EventEmitter }               from '@angular/core';
import { MdCard, MdCardTitle, MdCardActions, MdCardContent }    from '@angular/material';
import { ReviewService }                                        from '../../review.service';
import { ReviewModel }                                          from '../../review.model';

@Component({
  moduleId: module.id,
  selector: 'review-list',
  templateUrl: 'review-list.html',
  providers: [ReviewService],
  styleUrls: ['review-list.css'],
  inputs: ['url', 'userInfo', 'reviews']
})

export class ReviewList {
  @Output() statusChange = new EventEmitter();
  url: any;
  userInfo: any;
  reviews: any;
  selectedReview: any;
  error: any;
  isApproved: boolean;
  private _reviewService: any;

  constructor(_reviewService: ReviewService) {
    this._reviewService = _reviewService;
    this.isApproved = false;
    this.selectedReview = {
      "Comments": {
      }
    };
  }

  onSelectReview(review: ReviewModel) {
    if (this.selectedReview.ReviewId != review.ReviewId) {
      this.updateReview(this.selectedReview);
      this.selectedReview = review;
      let index = this.selectedReview.Approvals.indexOf(this.userInfo.toLowerCase());
      if (index != -1) {
        this.isApproved = true;
      } else if (this.selectedReview.ReviewStatus != "In Progress") {
        this.isApproved = true;
      } else {
        this.isApproved = false;
      }
    }
  }

  updateSelectedReview(data: ReviewModel) {
    this.selectedReview = data;
    this.isApproved = true;
  }

  onChangeReviewStatus(reviewStatus: string) {
    let ReviewStatus = reviewStatus;
    let patchReviewBody = [
      {
        "value": ReviewStatus,
        "path": "/ReviewStatus",
        "op": "replace"
      },
      {
        "value": this.userInfo,
        "path": "/UpdatedBy",
        "op": "replace"

      }
    ];
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchReviewBody)
      .subscribe(
      (data: any) => {
        this.statusChange.emit(data);
        this.updateReview(data);
      },
      (error: any) => this.error = error)
  }

  onApproval() {
    let patchReviewBody = [{
      "value": this.userInfo.toLowerCase(),
      "path": "/Approvals",
      "op": "add"
    }];
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchReviewBody)
      .subscribe(
      (data: any) => this.updateSelectedReview(data),
      (error: any) => this.error = error
      )
  }

  updateReview(data: ReviewModel) {
    let index = this.reviews.findIndex((review: any) => {
      return review.ReviewId == this.selectedReview.ReviewId
    });
    this.reviews[index] = data;
    this.selectedReview = data;
    this.statusChange.emit(data);
  }
}
