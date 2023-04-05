import { Component, OnInit } from '@angular/core';
import { ApiDocumentsService } from '../../services/api-documents.service';
import { DocumentsListResponse } from '../../model/documents-list-response';

@Component({
  selector: 'app-documents-list',
  templateUrl: './documents-list.component.html',
  styleUrls: ['./documents-list.component.scss']
})
export class DocumentsListComponent implements OnInit {

  list?: DocumentsListResponse;

  constructor(
    private apiDocumentsService: ApiDocumentsService,
  ) { }

  ngOnInit(): void {
    this.apiDocumentsService.list().subscribe(resp => this.list = resp);
  }

}
