import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild
} from '@angular/core';
import Konva from 'konva';
import { ActivatedRoute } from '@angular/router';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { Document } from '@app/model/document';
import Layer = Konva.Layer;
import Stage = Konva.Stage;
import { BaseAbstractComponent } from '@app/abstract/base.abstract.component';
import { environment } from '@env/environment.prod';
import Image = Konva.Image;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent extends BaseAbstractComponent implements OnDestroy {

  @ViewChild('document', { static: false }) documentElementRef?: ElementRef;

  private _document?: Document;
  @Input() set document(document: Document | undefined) {
    this._document = document;
    this.prepareDocument();
  }
  get document(): Document | undefined {
    return this._document;
  }

  private _zoom: number = environment.zoom.default;
  @Input() set zoom(zoom: number) {
    this._zoom = zoom;
    if (this.node) {
      this.node.setAttrs(this.nodeAttrs());
      this.stage?.size({
        width: this.nodeWidth(),
        height: this.nodeHeight(),
      });
    }
  }
  get zoom(): number {
    return this._zoom;
  }

  stage?: Stage;
  layer?: Layer;
  documentNotFound = false;
  node?: Image;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
    private cdr: ChangeDetectorRef,
  ) {
    super();
  }

  initStage(width: number, height: number) {
    if (this.layer) {
      this.layer.destroy();
    }
    if (this.stage) {
      this.stage?.destroy();
    }

    this.stage = new Konva.Stage({
      container: 'document',
      width: width,
      height: height,
    });

    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
  }

  percentToIndex(percent: number): number {
    return percent / 100;
  }

  nodeAttrs(): any {
    return {
      x: 0,
      y: 0,
      scaleX: this.percentToIndex(this.zoom),
      scaleY: this.percentToIndex(this.zoom),
    };
  }

  nodeWidth(): number {
    return this.node ? this.node.attrs.image.width * this.percentToIndex(this.zoom): 0;
  }

  nodeHeight(): number {
    return this.node ? this.node.attrs.image.height * this.percentToIndex(this.zoom): 0;
  }

  prepareDocument() {
    if (this.document) {
      this.documentNotFound = false;

      Konva.Image.fromURL(this.document!.url, (node) => {
        this.node = node.setAttrs(this.nodeAttrs());

        this.initStage(this.nodeWidth(), this.nodeHeight());
        this.layer!.add(node);
      });
    } else {
      this.documentNotFound = true;
    }

    this.cdr.detectChanges();
  }

}
