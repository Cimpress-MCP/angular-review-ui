import { Component, EventEmitter, Input, OnInit, Output }       from '@angular/core';
import { ReviewService }                                        from '../../review.service';

@Component({
  moduleId: module.id,
  selector: 'comments',
  templateUrl: 'comment.component.html',
  styleUrls: ['comment.css'],
  providers: [ReviewService],
  inputs: ['selectedReview', 'userInfo', 'url'],
  outputs: ['updateSelectedReview']
})
export class CommentComponent {
  selectedReview: any;
  userInfo: string;
  url: string;
  selectedComment: any;
  newComment: string;
  editedComment: any;
  isEditClicked: any;
  error: any;
  updateSelectedReview = new EventEmitter();
  private _reviewService: any;

  constructor(_reviewService: ReviewService) {
    this.isEditClicked = false;
    this._reviewService = _reviewService;
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
        "Comment": this.editedComment,
        "DateTime": this.selectedComment.value.DateTime
      },
      "path": "/Comments/" + this.selectedComment.key,
      "op": "replace"
    }];
    this._reviewService.patchReview(this.url, this.selectedReview.ReviewId, patchCommentBody)
      .subscribe(
      (data: any) => this.updateSelectedReview.emit(data),
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
      (data: any) => this.updateSelectedReview.emit(data),
      (error: any) => this.error = error
      )
    this.newComment = "";
  }
}
