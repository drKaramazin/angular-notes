import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { Document } from '@app/model/document';
import { environment } from '@env/environment.prod';

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: ['./document-page.component.scss']
})
export class DocumentPageComponent extends BaseAbstractComponent implements OnInit {

  document?: Document;
  zoom: number = environment.zoom.default;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      this.takeUntilDestroyed(),
      switchMap(params => this.apiDocumentsService.get(params['documentSlug'])),
    ).subscribe(document => this.document = document);
  }

}
