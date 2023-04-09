import { Slug } from './slug';

export interface PageModel {
  slug: Slug;
  name: string;
  url: string;
}
