import { NoteName } from '@app/model/note-name';
import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';

export namespace AddingNote {

  export class Activate {
    static readonly type = '[AddingNote] Activate';
    constructor(public name: NoteName) {}
  }

  export class Deactivate {
    static readonly type = '[AddingNote] Deactivate';
  }

}

export type AddingNoteStateModel = NoteName | null;

@State<AddingNoteStateModel>({
  name: 'addingNote',
  defaults: null,
})
@Injectable()
export class AddingNoteState {

  @Action(AddingNote.Activate)
  activate(ctx: StateContext<AddingNoteStateModel>, action: AddingNote.Activate) {
    ctx.setState(action.name);
  }

  @Action(AddingNote.Deactivate)
  deactivate(ctx: StateContext<AddingNoteStateModel>) {
    ctx.setState(null);
  }

}
