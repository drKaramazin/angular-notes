import { NoteAbstract } from '@app/abstract/note.abstract';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import Konva from 'konva';
import { tap } from 'rxjs';

export namespace SelectingNote {

  import Stage = Konva.Stage;
  import Layer = Konva.Layer;

  export class Select {
    static readonly type = '[SelectingNote] Select';
    constructor(public note: NoteAbstract, public stage: Stage, public layer: Layer) {}
  }

  export class Cancel {
    static readonly type = '[SelectingNote] Cancel';
  }

}

export type SelectingNoteStateModel = string | null;

@State<SelectingNoteStateModel>({
  name: 'selectingNote',
  defaults: null,
})
@Injectable()
export class SelectingNoteState {

  @Action(SelectingNote.Select)
  select(ctx: StateContext<SelectingNoteStateModel>, action: SelectingNote.Select) {
    return ctx.dispatch(new SelectingNote.Cancel()).pipe(
      tap(() => ctx.setState(action.note.id())),
    );
  }

  @Action(SelectingNote.Cancel)
  cancel(ctx: StateContext<SelectingNoteStateModel>) {
    ctx.setState(null);
  }

}
