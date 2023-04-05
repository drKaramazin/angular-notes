import { DocumentsListResponse } from '../model/documents-list-response';
import * as slug from 'slug';

enum Names {
  FirstDocument = 'First document',
  SecondDocument = 'Second document',
  ThirdDocument = 'Third document',
  FourthDocument = 'Fourth document',
  FifthDocument = 'Fifth document',
}

export const DocumentsMock: DocumentsListResponse = {
  list: [{
    slug: slug(Names.FirstDocument),
    name: Names.FirstDocument,
    url: 'assets/pages/1.png',
  }, {
    slug: slug(Names.SecondDocument),
    name: Names.SecondDocument,
    url: 'assets/pages/2.png',
  }, {
    slug: slug(Names.ThirdDocument),
    name: Names.ThirdDocument,
    url: 'assets/pages/3.png',
  }, {
    slug: slug(Names.FourthDocument),
    name: Names.FourthDocument,
    url: 'assets/pages/4.png',
  }, {
    slug: slug(Names.FifthDocument),
    name: Names.FifthDocument,
    url: 'assets/pages/5.png',
  }],
  index: 0,
  limit: 10,
  total: 10,
};
