import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef, HostBinding,
  Input,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import Konva from 'konva';
import { ActivatedRoute } from '@angular/router';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { PageModel } from '@app/model/pageModel';
import Layer = Konva.Layer;
import Stage = Konva.Stage;
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { environment } from '@env/environment.prod';
import Image = Konva.Image;
import Transformer = Konva.Transformer;
import { Store } from '@ngxs/store';
import { AddingNote } from '@app/store/adding-note.state';
import { StoreModel } from '@app/store/store';
import { NoteFactory } from '@app/factory/note.factory';
import { NoteAbstract } from '@app/abstract/note.abstract';
import { SelectingNote } from '@app/store/selecting-note.state';
import { UnitHelper } from '@app/helpes/unit.helper';
import KonvaEventObject = Konva.KonvaEventObject;
import { TransformingNote } from '@app/store/transforming-note.state';
import Shape = Konva.Shape;
import { PageService } from '@app/services/page.service';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends BaseAbstractComponent implements OnDestroy, OnInit {

  @ViewChild('document', { static: false }) documentElementRef?: ElementRef;

  @HostBinding('class') classes: string | undefined;

  private _document?: PageModel;
  @Input() set document(document: PageModel | undefined) {
    this._document = document;
    this.store.dispatch(new SelectingNote.Cancel());
    this.prepareDocument();
  }
  get document(): PageModel | undefined {
    return this._document;
  }

  private _zoom: number = environment.zoom.default;
  @Input() set zoom(zoom: number) {
    this._zoom = zoom;
    if (this.page) {
      this.page.setAttrs(this.nodeAttrs());
      this.stage?.size({
        width: this.nodeWidth(),
        height: this.nodeHeight(),
      });
    }
  }
  get zoom(): number {
    return this._zoom;
  }

  documentNotFound = false;
  stage?: Stage;
  layer?: Layer;
  page?: Image;
  transformer?: Transformer;
  notes: NoteAbstract[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
    private cdr: ChangeDetectorRef,
    private store: Store,
    private pageService: PageService,
  ) {
    super();
  }

  subscribeToSelectingState() {
    this.store.select((state: StoreModel) => state.selectingNote).pipe(
      this.takeUntilDestroyed(),
    ).subscribe(id => {
      if (id) {
        const note = this.notes.find(note => note.id() === id);
        if (note) {
          note.edit(this.stage!, this.layer!);
        }
      } else {
        this.notes.forEach(note => note.cancelEdit());
      }
    });
  }

  subscribeToDeleting() {
    this.pageService.deleting().pipe(
      this.takeUntilDestroyed(),
    ).subscribe(() => this.deleteNote());
  }

  ngOnInit() {
    this.subscribeToDeleting();
    this.subscribeToSelectingState();
  }

  checkRightCursor() {
    if (this.stage) {
      this.stage.container().style.cursor = this.store.snapshot()['addingNote'] ? 'copy' : 'default';
    }
  }

  returnDefaultCursor() {
    if (this.stage) {
      this.stage.container().style.cursor = 'default';
    }
  }

  selectNodeByEvent(event: KonvaEventObject<any>) {
    const node = this.notes.find(node => node.selector(event.target.id()));
    if (node) {
      this.store.dispatch(new SelectingNote.Select(node, this.stage!, this.layer!));
    }
  }

  addingNote() {
    const note = NoteFactory.create(
      this.store.snapshot()['addingNote'],
      this.stage!.getPointerPosition()!.x,
      this.stage!.getPointerPosition()!.y,
    );
    this.notes.push(note);
    note.addToLayer(this.layer!);
    this.store.dispatch(new AddingNote.Deactivate());
    this.checkRightCursor();
  }

  transformingNote(target: Shape | Stage) {
    // if click on empty area - remove all selections
    if (target === this.stage || target.hasName('page')) {
      this.store.dispatch(new TransformingNote.Cancel(this.transformer!));
      return;
    }

    const node = this.notes.find(node => node.selector(target.id()));
    if (node) {
      this.store.dispatch(new TransformingNote.Select(node, this.transformer!));
    }
  }

  deleteNote() {
    if (this.store.snapshot()['transformingNote']) {
      const node = this.notes.find(node => node.selector(this.store.snapshot()['transformingNote']));
      if (node) {
        this.store.dispatch(new TransformingNote.Cancel(this.transformer!));
        node.delete();
      }
    }
  }

  addListeners() {
    if (this.stage) {
      this.stage.on('mouseenter', () => this.checkRightCursor());

      this.stage.on('mouseleave', () => this.returnDefaultCursor());

      this.stage.on('click tap', (event) => {
        this.store.dispatch(new SelectingNote.Cancel());

        if (this.store.snapshot()['addingNote']) {
          this.addingNote();
        } else {
          this.transformingNote(event.target);
        }
      });

      this.stage.on('dblclick dbltap', (event) => {
        this.store.dispatch(new TransformingNote.Cancel(this.transformer!));
        this.selectNodeByEvent(event);
      });
    }
  }

  initStage(width: number, height: number) {
    this.destroyStage();

    this.stage = new Konva.Stage({
      container: 'document',
      width,
      height,
    });

    this.stage.container().focus();

    this.addListeners();

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);

    this.transformer = new Konva.Transformer({
      rotateEnabled: false,
    });
    this.layer.add(this.transformer);
  }

  nodeAttrs(): any {
    return {
      x: 0,
      y: 0,
      scaleX: UnitHelper.percentToIndex(this.zoom),
      scaleY: UnitHelper.percentToIndex(this.zoom),
    };
  }

  nodeWidth(): number {
    return this.page ? this.page.attrs.image.width * UnitHelper.percentToIndex(this.zoom): 0;
  }

  nodeHeight(): number {
    return this.page ? this.page.attrs.image.height * UnitHelper.percentToIndex(this.zoom): 0;
  }

  prepareDocument() {
    if (this.document) {
      this.documentNotFound = false;

      Konva.Image.fromURL(this.document!.url, (node) => {
        this.page = node.setAttrs(this.nodeAttrs());
        this.page.setAttrs({
          name: 'page',
        });

        this.initStage(this.nodeWidth(), this.nodeHeight());
        this.layer!.add(node);
        this.page.moveToBottom();
      });
    } else {
      this.documentNotFound = true;
    }

    this.cdr.detectChanges();
  }

  destroyStage() {
    if (this.transformer) {
      this.store.dispatch(new TransformingNote.Cancel(this.transformer));
      this.transformer.destroy();
    }
    if (this.layer) {
      this.layer.destroy();
    }
    if (this.stage) {
      this.stage?.destroy();
    }
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(new SelectingNote.Cancel());
    this.destroyStage();
  }

}
