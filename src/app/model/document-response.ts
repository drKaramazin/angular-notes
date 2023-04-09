import { PageModel } from './pageModel';

export interface DocumentResponse {
  list: PageModel[];
  limit: number;
  index: number;
  total: number;
}
