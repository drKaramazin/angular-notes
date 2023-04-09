import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { environment } from '@env/environment.prod';
import { Select, Store } from '@ngxs/store';
import { AddingNote, AddingNoteState, AddingNoteStateModel } from '@app/store/adding-note.state';
import { Page } from '@app/widgets/page';

@Component({
  selector: 'app-page-wrapper',
  templateUrl: './page-wrapper.component.html',
  styleUrls: ['./page-wrapper.component.scss']
})
export class PageWrapperComponent extends BaseAbstractComponent {

  @Input() page!: Page;
  zoom: number = environment.zoom.default;

  @Output() save = new EventEmitter();

  @Select(AddingNoteState) addingNote$!: Observable<AddingNoteStateModel>;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
    private store: Store,
  ) {
    super();
  }

  addImageNote(event: any) {
    event.stopPropagation();
    this.store.dispatch(new AddingNote.Activate('image-note'));
  }

  addTextNote(event: any) {
    event.stopPropagation();
    this.store.dispatch(new AddingNote.Activate('text-note'));
  }

  onSave() {
    this.save.emit();
  }

}
