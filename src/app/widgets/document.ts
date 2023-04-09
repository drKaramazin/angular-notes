import { Page } from '@app/widgets/page';
import { DocumentResponse } from '@app/model/document-response';

export class Document {

  pages: Page[] = [];

  constructor(
    resp: DocumentResponse
  ) {
    this.pages = resp.list.map(item => new Page(item.url, item.name, item.slug));
  }

}
