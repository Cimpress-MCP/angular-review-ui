import { Injectable }     from '@angular/core';
import { Http }           from '@angular/http';
import 'rxjs/Rx';
import { Observable }     from 'rxjs/Observable';
import { ReviewConfig }   from './review.config';

@Injectable()
export class ReviewService {
  http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  getReview(url: string) {
    return this.http.get(url).map((res: any) => res.json());
  }

  /*All Changes to the Review Object will be patch calls
   with attribute 'path':
   '/approval' for approvals,
   '/comments' for adding comments,
   '/comments/{id}' for editting comments,
   '/status' for submit or declined*/

  patchReview(url: string, reviewId: number, body: any) {
    let requestURL = url + reviewId;
    return this.http.patch(requestURL, body).map((res: any) => res.json());
  }
}
