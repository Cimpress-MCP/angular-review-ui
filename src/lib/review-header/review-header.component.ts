import { Component, OnInit }                            from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'review-header',
  templateUrl: 'review-header.html',
  styleUrls: ['review-header.css']
})

export class ReviewHeaderComponent {
  static createdOrder = true;
  static orderBy = 'CreatedDateTime';
  static updatedOrder = false;

  static getOrder() {
    if (ReviewHeaderComponent.orderBy == 'CreatedDateTime') {
      return ReviewHeaderComponent.createdOrder;
    }
    else if (ReviewHeaderComponent.orderBy == 'UpdatedDateTime') {
      return ReviewHeaderComponent.updatedOrder;
    }
  }

  static getOrderBy() {
    return ReviewHeaderComponent.orderBy;
  }

  onChangeOrder(orderBy: any) {
    ReviewHeaderComponent.orderBy = orderBy
    if (orderBy == 'CreatedDateTime') {
      ReviewHeaderComponent.createdOrder = !ReviewHeaderComponent.createdOrder;
    }
    else if (orderBy == 'UpdatedDateTime') {
      ReviewHeaderComponent.updatedOrder = !ReviewHeaderComponent.updatedOrder;
    }
  }
}
