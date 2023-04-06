import { Page } from './page';

export interface DocumentResponse {
  list: Page[];
  limit: number;
  index: number;
  total: number;
}
