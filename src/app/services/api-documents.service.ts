import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentResponse } from '../model/document-response';
import { DocumentMock } from '../mock/document.mock';
import { Slug } from '../model/slug';
import { Page } from '../model/page';

@Injectable({
  providedIn: 'root'
})
export class ApiDocumentsService {

  constructor() { }

  list(): Observable<DocumentResponse> {
    return of(DocumentMock);
  }

  page(slug: Slug): Observable<Page | undefined> {
    return of(DocumentMock.list.find(item => item.slug === slug));
  }


}
