import { NoteAbstract } from '@app/abstract/note.abstract';
import { PageModel } from '@app/model/pageModel';
import { Slug } from '@app/model/slug';
import Konva from 'konva';
import Stage = Konva.Stage;

export class Page implements PageModel {

  private notes: NoteAbstract[] = [];

  constructor(
    public url: string,
    public name: string,
    public slug: Slug,
  ) {}

  find(id: string): NoteAbstract | undefined {
    return this.notes.find(note => note.id() === id);
  }

  findBySelector(id: string): NoteAbstract | undefined {
    return this.notes.find(node => node.selector(id));
  }

  cancelEdit(stage: Stage) {
    this.notes.forEach(note => note.cancelEdit(stage));
  }

  add(note: NoteAbstract) {
    this.notes.unshift(note);
  }

  zoom(scaleX: number, scaleY: number) {
    this.notes.forEach(note => note.zoom(scaleX, scaleY));
  }

}
