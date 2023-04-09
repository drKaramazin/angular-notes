import Konva from 'konva';
import { NoteName } from '@app/model/note-name';
import { v4 as uuidv4 } from 'uuid';
import Stage = Konva.Stage;
import Transformer = Konva.Transformer;
import Group = Konva.Group;
import Shape = Konva.Shape;
import Vector2d = Konva.Vector2d;

export abstract class NoteAbstract {

  protected abstract name(): NoteName;
  protected abstract create(x: number, y: number): Shape;
  protected abstract prepareForEdit(stage: Stage): void;
  abstract cancelEdit(stage: Stage): void;
  abstract selector(id: string): boolean;

  protected node: Shape;
  private group: Konva.Group;

  constructor(x: number, y: number) {
    this.node = this.create(x, y);
    this.node.setAttrs({
      id: uuidv4(),
      name: this.name(),
    });

    this.group = new Group({
      draggable: true,
    });

    this.group!.add(this.node);
  }

  id(): string {
    return this.node.id();
  }

  addToLayer(layer: Konva.Layer) {
    layer.add(this.group);
  }

  addToGroup(node: Shape) {
    this.group.add(node);
  }

  edit(stage: Stage) {
    this.prepareForEdit(stage);
  }

  selectForTransformation(tr: Transformer) {
    tr.nodes([this.group]);
    this.moveToTop();
  }

  nodePosition(): Vector2d {
    return this.node.position();
  }

  nodeAbsolutePosition(): Vector2d {
    return this.node.getAbsolutePosition();
  }

  width(): number {
    return this.node.width();
  }

  height(): number {
    return this.node.height();
  }

  scaleX(): number {
    return this.group.scaleX();
  }

  scaleY(): number {
    return this.group.scaleY();
  }

  moveToTop() {
    this.group.moveToTop();
  }

  delete() {
    this.group.destroy();
  }

  zoom(scaleX: number, scaleY: number) {
    this.group.scaleX(scaleX);
    this.group.scaleY(scaleY);
  }

}
