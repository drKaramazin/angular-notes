import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentsListResponse } from '../model/documents-list-response';
import { DocumentsMock } from '../mock/documents.mock';
import { Slug } from '../model/slug';
import { Document } from '../model/document';

@Injectable({
  providedIn: 'root'
})
export class ApiDocumentsService {

  constructor() { }

  list(): Observable<DocumentsListResponse> {
    return of(DocumentsMock);
  }

  get(slug: Slug): Observable<Document | undefined> {
    return of(DocumentsMock.list.find(item => item.slug === slug));
  }


}
