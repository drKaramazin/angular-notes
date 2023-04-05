import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DocumentsListResponse } from '../model/documents-list-response';
import { DocumentsMock } from '../mock/documents.mock';

@Injectable({
  providedIn: 'root'
})
export class ApiDocumentsService {

  constructor() { }

  list(): Observable<DocumentsListResponse> {
    return of(DocumentsMock);
  }


}
