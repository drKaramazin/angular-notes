import { Component, OnInit } from '@angular/core';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { DocumentResponse } from '@app/model/document-response';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { Slug } from '@app/model/slug';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends BaseAbstractComponent implements OnInit {

  list?: DocumentResponse;
  activeSlug?: Slug;

  constructor(
    private apiDocumentsService: ApiDocumentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  getPages() {
    this.apiDocumentsService.list().subscribe(resp => {
      this.list = resp;
      if (this.list.list.length) {
        this.router.navigate(['document', this.list.list[0].slug]);
      }
    });
  }

  subscribeToPageSlug() {
    this.route.firstChild?.params.pipe(
      this.takeUntilDestroyed(),
    ).subscribe(params => this.activeSlug = params['pageSlug']);
  }

  ngOnInit(): void {
    this.getPages();
    this.subscribeToPageSlug();
  }

}
