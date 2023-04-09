import { NoteAbstract } from '@app/abstract/note.abstract';
import { PageModel } from '@app/model/pageModel';
import { Slug } from '@app/model/slug';

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

  cancelEdit() {
    this.notes.forEach(note => note.cancelEdit());
  }

  add(note: NoteAbstract) {
    this.notes.unshift(note);
  }

}
