import {
  Input,
  OnInit,
  Component
}                             from '@angular/core';
import {
  MdCard,
  MdCardTitle,
  MdCardActions,
  MdCardContent
}                             from '@angular/material';
import { ReviewService }      from './review.service';
import { KeysPipe }           from './keys-pipe.component';
import { ReviewModel }        from './review.model';

@Component({
  moduleId: module.id,
  selector: 'review-component',
  templateUrl: "review.html",
  providers: [ReviewService],
  styleUrls: ["review.css"],
  inputs: ["url", "userInfo"]
})
export class ReviewComponent implements OnInit {
  url: any;
  userInfo: any;
  reviews: ReviewModel[];
  selectedReview: any;
  selectedComment: any;
  newComment: string;
  editedComment: any;
  isEditClicked: any;
  error: any;
  approveDisabled: boolean;
  isApproved: boolean;
  private _reviewService: any;

  constructor(_reviewService: ReviewService) {
    this._reviewService = _reviewService;
    this.isEditClicked = false;
    this.isApproved = false;
    this.approveDisabled = false;
    this.selectedReview = {
      "Comments": {
      }
    };
    this.reviews = [];
  }

  ngOnInit() {
    this._reviewService.getReview(this.url)
      .subscribe(
      (data: any) => this.setReview(data),
      (error: any) => this.error = error
      );
  }

  setReview(reviews: any) {
    for (let i = 0; i < reviews.length; i++)
      this.reviews[i] = new ReviewModel(reviews[i]);
  }

  onSelectReview(review: ReviewModel) {
    if (this.selectedReview.ReviewId != review.ReviewId) {
      this.updateReview(this.selectedReview);
      this.selectedReview = review;
      let index = this.selectedReview.Approvals.indexOf(this.userInfo);
      if (index != -1) {
        this.approveDisabled = true;
        this.isApproved = true;
      } else if (this.selectedReview.ReviewStatus != "In Progress") {
        this.approveDisabled = true;
        this.isApproved = false;
      } else {
        this.approveDisabled = false;
        this.isApproved = false;
      }
    }
  }

  onEdit(comment: any) {
    this.isEditClicked = true;
    this.selectedComment = comment;
    this.editedComment = comment.value.Comment;
  }

  onSave() {
    let patchCommentBody = [{
      "value": {
        "UserInfo": this.selectedComment.value.UserInfo,
        "Comment": this.editedComment
      },
      "path": "/Comments/" + this.selectedComment.key,
      "op": "replace"
    }];
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchCommentBody)
      .subscribe(
      (data: any) => this.updateSelectedReview(data),
      (error: any) => this.error = error
      )
    this.isEditClicked = false;
  }

  onCancel() {
    this.newComment = "";
    this.isEditClicked = false;
  }

  onComment() {
    let postCommentBody = [{
      "value": {
        "UserInfo": this.userInfo,
        "Comment": this.newComment
      },
      "path": "/Comments",
      "op": "add"
    }]
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, postCommentBody)
      .subscribe(
      (data: any) => this.updateSelectedReview(data),
      (error: any) => this.error = error
      )
    this.newComment = "";
  }

  updateSelectedReview(data: ReviewModel) {
    this.selectedReview = data;
  }

  onChangeReviewStatus(reviewStatus: string) {
    let ReviewStatus = reviewStatus;
    let patchReviewBody = [{
      "value": ReviewStatus,
      "path": "/ReviewStatus",
      "op": "replace"
    }]
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchReviewBody)
      .subscribe(
      (data: any) => this.updateReview(data),
      (error: any) => this.error = error
      )
  }

  onApproval(event: any) {
    if (event.target.checked) {
      let patchReviewBody = [{
        "value": this.userInfo,
        "path": "/Approvals",
        "op": "add"
      }];
      this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchReviewBody)
        .subscribe(
        (data: any) => this.updateSelectedReview(data),
        (error: any) => this.error = error
        )
      this.isApproved = true;
      this.approveDisabled = true;
    }
  }
  updateReview(data: ReviewModel) {
    for (let i = 0; i < this.reviews.length; i++) {
      if (this.reviews[i].ReviewId == this.selectedReview.ReviewId) {
        this.reviews[i] = data;
        this.selectedReview = data;
      }
    }
  }
  getStyle(status: string) {
    if (status == "In Progress")
      return "#f76d55";
    else if (status == "Submitted")
      return "#0a920a";
    else return "#c70000";
  }
}
