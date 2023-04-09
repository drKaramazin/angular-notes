import { NoteAbstract } from '@app/abstract/note.abstract';
import { NoteName } from '@app/model/note-name';
import Konva from 'konva';

export class TextNote extends NoteAbstract {

  protected input?: HTMLTextAreaElement;

  protected name(): NoteName {
    return 'text-note';
  }

  protected create(x: number, y: number): Konva.Text {
    return new Konva.Text({
      text: 'Note',
      fontSize: 20,
      x,
      y,
    });
  }

  protected prepareForEdit(stage: Konva.Stage): void {
    this.input = document.createElement('textarea');
    this.input.style.position = 'absolute';
    this.input.style.left = this.nodeAbsolutePosition().x + 'px';
    this.input.style.top = this.nodeAbsolutePosition().y + 'px';
    this.input.className = 'note-text-input';
    this.input.textContent = (this.node as Konva.Text).text();
    this.input.style.width = `${this.width() * this.scaleX()}px`;
    this.input.style.height = `${this.height() * this.scaleY()}px`;

    this.input.focus();

    this.input.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        (this.node as Konva.Text).text(this.input!.value);
        this.cancelEdit(stage);
      }
    });

    stage?.container().appendChild(this.input);
  }

  cancelEdit(stage: Konva.Stage): void {
    if (this.input) {
      stage.container().removeChild(this.input);
      this.input = undefined;
    }
  }

  selector(id: string): boolean {
    return this.id() === id;
  }

}
