import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import Konva from 'konva';
import { ActivatedRoute } from '@angular/router';
import { ApiDocumentsService } from '@app/services/api-documents.service';
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
import { SelectingNote } from '@app/store/selecting-note.state';
import { UnitHelper } from '@app/helpes/unit.helper';
import KonvaEventObject = Konva.KonvaEventObject;
import { TransformingNote } from '@app/store/transforming-note.state';
import Shape = Konva.Shape;
import { PageService } from '@app/services/page.service';
import { Page } from '@app/widgets/page';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageComponent extends BaseAbstractComponent implements OnDestroy, OnInit {

  @ViewChild('document', { static: false }) documentElementRef?: ElementRef;

  @HostBinding('class') classes: string | undefined;

  private _page?: Page;
  @Input() set page(document: Page | undefined) {
    this._page = document;
    this.store.dispatch(new SelectingNote.Cancel());
    this.prepareDocument();
  }
  get page(): Page | undefined {
    return this._page;
  }

  private _zoom: number = environment.zoom.default;
  @Input() set zoom(zoom: number) {
    this._zoom = zoom;
    if (this.image) {
      this.image.setAttrs(this.nodeAttrs());
      this.page?.zoom(UnitHelper.percentToIndex(zoom), UnitHelper.percentToIndex(zoom));
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
  image?: Image;
  transformer?: Transformer;

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
        const note = this.page?.find(id);
        if (note) {
          note.edit(this.stage!);
        }
      } else {
        this.page?.cancelEdit(this.stage!);
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
    const node = this.page?.findBySelector(event.target.id());
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
    this.page?.add(note)
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

    const node = this.page?.findBySelector(target.id());
    if (node) {
      this.store.dispatch(new TransformingNote.Select(node, this.transformer!));
    }
  }

  deleteNote() {
    if (this.store.snapshot()['transformingNote']) {
      const node = this.page?.findBySelector(this.store.snapshot()['transformingNote']);
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
    return this.image ? this.image.attrs.image.width * UnitHelper.percentToIndex(this.zoom): 0;
  }

  nodeHeight(): number {
    return this.image ? this.image.attrs.image.height * UnitHelper.percentToIndex(this.zoom): 0;
  }

  prepareDocument() {
    if (this.page) {
      this.documentNotFound = false;

      Konva.Image.fromURL(this.page!.url, (node) => {
        this.image = node.setAttrs(this.nodeAttrs());
        this.image.setAttrs({
          name: 'page',
        });

        this.initStage(this.nodeWidth(), this.nodeHeight());
        this.layer!.add(node);
        this.image.moveToBottom();
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
