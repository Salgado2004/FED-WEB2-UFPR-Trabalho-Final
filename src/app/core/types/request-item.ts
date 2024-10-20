import { RequestCategory } from "./request-category";

export interface RequestItem {
  id: number;
  title: string;
  description: string;
  status: RequestCategory;
  created_at: string;
  client: string;
  image: string;
}