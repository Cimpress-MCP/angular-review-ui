import { NgModule }                                 from "@angular/core";
import { BrowserModule }                            from "@angular/platform-browser";
import {
  HttpModule,
  JsonpModule,
  XHRBackend
}                                                   from "@angular/http";
import { FormsModule }                              from "@angular/forms";
import { CommonModule }                             from '@angular/common';
import { MaterialModule }                           from '@angular/material';
import { ReviewService }                            from './review.service';
import { CommentComponent }                         from './lib/comment/comment.component';
import { ReviewList }                               from './lib/review-list/review-list.component';
import { ReviewComponent }                          from './review.component';
import { KeysPipe }                                 from './pipes/keys-pipe.component';
import { SortByDatePipe }                           from './pipes/sort-by-date-pipe.component';
import { ReviewHeaderComponent }                    from './lib/review-header/review-header.component';

@NgModule({
  imports: [CommonModule, BrowserModule, MaterialModule.forRoot(), FormsModule, HttpModule],
  declarations: [ReviewComponent, KeysPipe, CommentComponent, SortByDatePipe, ReviewList, ReviewHeaderComponent],
  providers: [ReviewService],
  exports: [ReviewComponent]
})
export class ReviewModule { }
