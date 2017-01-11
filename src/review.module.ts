import { NgModule }                                 from "@angular/core";
import { BrowserModule }                            from "@angular/platform-browser";
import {
  HttpModule,
  JsonpModule,
  XHRBackend
}                                                   from "@angular/http";
import { FormsModule }                              from "@angular/forms";
import { CommonModule }   from '@angular/common';
import { MaterialModule } from '@angular/material';
import { ReviewService }  from './review.service';
import {
  ReviewComponent
}                         from './review.component';
import { KeysPipe }       from './keys-pipe.component';

@NgModule({
  imports: [CommonModule, BrowserModule, MaterialModule.forRoot(), FormsModule, HttpModule],
  declarations: [ReviewComponent, KeysPipe],
  providers: [ReviewService],
  exports: [ReviewComponent]
})
export class ReviewModule { }
