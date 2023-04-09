import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import Konva from 'konva';
import { NoteAbstract } from '@app/abstract/note.abstract';

export namespace TransformingNote {

  import Transformer = Konva.Transformer;

  export class Select {
    static readonly type = '[TransformingNote] Select';
    constructor(public node: NoteAbstract, public transformer: Transformer) {}
  }

  export class Cancel {
    static readonly type = '[TransformingNote] Cancel';
    constructor(public transformer: Transformer) {}
  }

}

export type TransformingNoteStateModel = string | null;

@State<TransformingNoteStateModel>({
  name: 'transformingNote',
  defaults: null,
})
@Injectable()
export class TransformingNoteState {

  @Action(TransformingNote.Select)
  select(ctx: StateContext<TransformingNoteStateModel>, action: TransformingNote.Select) {
    action.node.selectForTransformation(action.transformer);
    action.transformer.moveToTop();
    ctx.setState(action.node.id());
  }

  @Action(TransformingNote.Cancel)
  cancel(ctx: StateContext<TransformingNoteStateModel>, action: TransformingNote.Cancel) {
    action.transformer.nodes([]);
    ctx.setState(null);
  }

}
