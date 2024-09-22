import { RequestCategory } from "./request-category";
import { Request } from "./request";

export interface RequestStatus {
  requestStatusId: String;
  dateTime: Date;
  category: RequestCategory
  request: Request;
}
