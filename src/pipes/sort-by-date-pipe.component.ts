import { Pipe, PipeTransform } from '@angular/core';
import { ReviewHeaderComponent }     from '../lib/review-header/review-header.component';

@Pipe({
  name: "sortByDate",
  pure: false
})
export class SortByDatePipe implements PipeTransform {
  transform(value: any, args: any): any {
    let dateTimeType = ReviewHeaderComponent.getOrderBy();
    let desc = ReviewHeaderComponent.getOrder();
    if (args === undefined || !args[0]) {
      return value;
    }
    if (value) {
      if (args.toLowerCase() == "review") {
        value.sort((a: any, b: any) => +new Date(b[dateTimeType]) - +new Date(a[dateTimeType]));
      }
      else if (args.toLowerCase() == "comment") {
        value.sort((a: any, b: any) => +new Date(a.value.DateTime) - +new Date(b.value.DateTime));
      }
      if (!desc && args.toLowerCase() == "review") {
        return value.reverse();
      }
      return value;
    }
  }
}
