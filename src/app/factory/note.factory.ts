import { NoteAbstract } from '@app/abstract/note.abstract';
import { NoteName } from '@app/model/note-name';
import { ImageNote } from '@app/widgets/image-note';

export class NoteFactory {

  static create(name: NoteName, x: number, y: number): NoteAbstract {
    switch (name) {
      case 'image-note':
        return new ImageNote(x, y);
    }
  }

}
