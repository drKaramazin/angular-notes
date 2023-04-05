import { Slug } from './slug';

export interface Document {
  slug: Slug;
  name: string;
  url: string;
}
