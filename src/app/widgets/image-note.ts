import { NoteAbstract } from '@app/abstract/note.abstract';
import Konva from 'konva';
import { NoteName } from '@app/model/note-name';
import { v4 as uuidv4 } from 'uuid';
import Stage = Konva.Stage;

export class ImageNote extends NoteAbstract {

  protected input?: HTMLInputElement;
  protected noteImage?: Konva.Image;

  protected name(): NoteName {
    return 'image-note';
  }

  protected create(x: number, y: number): Konva.Rect {
    return new Konva.Rect({
      x,
      y,
      width: 100,
      height: 50,
      fill: '#A7D62D',
    });
  }

  protected prepareForEdit(stage: Stage): void {
    this.input = document.createElement('input');
    this.input.type = 'file';
    this.input.accept = '.png,.jpg,.jpeg,.svg';
    this.input.style.position = 'absolute';
    this.input.style.left = this.nodeAbsolutePosition().x + 'px';
    this.input.style.top = this.nodeAbsolutePosition().y + 'px';
    this.input.className = 'note-image-input';
    this.input.textContent = 'Choose note';
    this.input.style.width = `${this.width() * this.scaleX()}px`;
    this.input.style.height = `${this.height() * this.scaleY()}px`;

    this.input.onchange = (event) => {
      this.cancelEdit(stage);
      const URL = window.webkitURL || window.URL;
      const url = URL.createObjectURL((event.target! as any).files[0]);

      if (this.noteImage) {
        this.noteImage?.destroy();
        this.noteImage = undefined;
      }

      Konva.Image.fromURL(url, (node) => {
        this.noteImage = node.setAttrs({
          width: this.width(),
          height: this.height(),
          x: this.nodePosition().x,
          y: this.nodePosition().y,
          id: uuidv4(),
        });
        this.addToGroup(this.noteImage);
      });
    };

    stage?.container().appendChild(this.input);
  }

  override cancelEdit(stage: Stage) {
    if (this.input) {
      stage.container().removeChild(this.input);
      this.input = undefined;
    }
  }

  selector(id: string): boolean {
    return this.id() === id || this.noteImage?.id() === id;
  }

}
