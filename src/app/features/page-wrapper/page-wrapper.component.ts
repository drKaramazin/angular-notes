import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { PageModel } from '@app/model/pageModel';
import { environment } from '@env/environment.prod';
import { Store } from '@ngxs/store';
import { AddingNote } from '@app/store/adding-note.state';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent extends BaseAbstractComponent implements OnInit {

  document?: PageModel;
  zoom: number = environment.zoom.default;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
    private store: Store,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      this.takeUntilDestroyed(),
      switchMap(params => this.apiDocumentsService.page(params['pageSlug'])),
    ).subscribe(document => this.document = document);
  }

  addImageNote(event: any) {
    event.stopPropagation();
    this.store.dispatch(new AddingNote.Activate('image-note'));
  }

}
