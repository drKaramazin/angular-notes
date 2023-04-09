import { AddingNoteStateModel } from '@app/store/adding-note.state';
import { SelectingNoteStateModel } from '@app/store/selecting-note.state';
import { TransformingNoteStateModel } from '@app/store/transforming-note.state';

export interface StoreModel {
  addingNote: AddingNoteStateModel,
  selectingNote: SelectingNoteStateModel,
  transformingNote: TransformingNoteStateModel,
}
