import { Document } from './document';

export interface DocumentsListResponse {
  list: Document[];
  limit: number;
  index: number;
  total: number;
}
