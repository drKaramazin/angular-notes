import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { Page } from '@app/model/page';
import { environment } from '@env/environment.prod';
import { NoteService } from '@app/services/note.service';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent extends BaseAbstractComponent implements OnInit {

  document?: Page;
  zoom: number = environment.zoom.default;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
    private noteService: NoteService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      this.takeUntilDestroyed(),
      switchMap(params => this.apiDocumentsService.page(params['pageSlug'])),
    ).subscribe(document => this.document = document);
  }

  addNote() {
    this.noteService.needsToAddNote();
  }

}
