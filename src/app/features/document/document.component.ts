import { Component, OnInit } from '@angular/core';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { Document } from '@app/widgets/document';
import { filter, map, switchMap, tap } from 'rxjs';
import { Page } from '@app/widgets/page';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent extends BaseAbstractComponent implements OnInit {

  document?: Document;
  currentPage?: Page;

  constructor(
    private apiDocumentsService: ApiDocumentsService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  getPages() {
    this.apiDocumentsService.list().pipe(
      this.takeUntilDestroyed(),
      tap(resp => this.document = new Document(resp)),
      switchMap(() => this.route.params),
      map(params => params['pageSlug']),
      tap(pageSlug => !pageSlug && this.router.navigate(['document', this.document!.pages[0].slug])),
      filter(pageSlug => !!pageSlug),
    ).subscribe(pageSlug => {
      const page = this.document?.pages.find(page => page.slug === pageSlug);
      if (page) {
        this.currentPage = page;
      }
    });
  }

  ngOnInit(): void {
    this.getPages();
  }

  save() {
    console.log(JSON.stringify(this.document));
  }

}
