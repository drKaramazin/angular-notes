import { DocumentResponse } from '../model/document-response';
import * as slug from 'slug';

enum Names {
  FirstPage = 'First page',
  SecondPage = 'Second page',
  ThirdPage = 'Third page',
  FourthPage = 'Fourth page',
  FifthPage = 'Fifth page',
}

export const DocumentMock: DocumentResponse = {
  list: [{
    slug: slug(Names.FirstPage),
    name: Names.FirstPage,
    url: 'assets/pages/1.png',
  }, {
    slug: slug(Names.SecondPage),
    name: Names.SecondPage,
    url: 'assets/pages/2.png',
  }, {
    slug: slug(Names.ThirdPage),
    name: Names.ThirdPage,
    url: 'assets/pages/3.png',
  }, {
    slug: slug(Names.FourthPage),
    name: Names.FourthPage,
    url: 'assets/pages/4.png',
  }, {
    slug: slug(Names.FifthPage),
    name: Names.FifthPage,
    url: 'assets/pages/5.png',
  }],
  index: 0,
  limit: 10,
  total: 10,
};
