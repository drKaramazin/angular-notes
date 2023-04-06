import { Component, OnInit } from '@angular/core';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { DocumentResponse } from '@app/model/document-response';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  list?: DocumentResponse;

  constructor(
    private apiDocumentsService: ApiDocumentsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.apiDocumentsService.list().subscribe(resp => {
      this.list = resp;
      this.router.navigate(['document', this.list.list[0].slug]);
    });
  }

}
