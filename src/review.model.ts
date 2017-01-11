export class ReviewModel {
  public ReviewId: string;
  public Summary: string;
  public CreatorInfo: string;
  public CreatedDateTime: string;
  public SubmittedDateTime: string;
  public PreviewLink: string;
  public Type: string;
  public Method: string;
  public Approvals: string[];
  public ReviewStatus: string;
  public Comments: Object;
  constructor(review: any) {
    this.ReviewId = review.ReviewId;
    this.Summary = review.Summary;
    this.CreatorInfo = review.CreatorInfo;
    this.CreatedDateTime = review.CreatedDateTime;
    this.SubmittedDateTime = review.SubmittedDateTime;
    this.PreviewLink = review.PreviewLink;
    this.Type = review.Type;
    this.Method = review.Method;
    this.Approvals = review.Approvals;
    this.ReviewStatus = review.ReviewStatus;
    this.Comments = review.Comments;
  }
}
