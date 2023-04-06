import { Slug } from './slug';

export interface Page {
  slug: Slug;
  name: string;
  url: string;
}
