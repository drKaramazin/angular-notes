import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import Konva from 'konva';
import { ActivatedRoute } from '@angular/router';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { Document } from '@app/model/document';
import Layer = Konva.Layer;
import Stage = Konva.Stage;
import { DestroyAbstractComponent } from '@app/abstract/destroy.abstract.component';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentComponent extends DestroyAbstractComponent implements OnDestroy {

  private documentElementInit$ = new Subject<void>();

  private _documentElementRef?: ElementRef;
  @ViewChild('document', { static: false }) set documentElementRef(documentElementRef: ElementRef | undefined) {
    this._documentElementRef = documentElementRef;
    this.documentElementInit$.next();
    this.subscribeToParams();
  }
  get documentElementRef(): ElementRef | undefined {
    return this._documentElementRef;
  }

  document?: Document;
  stage?: Stage;
  layer?: Layer;
  documentNotFound = false;

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

  subscribeToParams() {
    this.route.params.pipe(
      this.takeUntilDestroyed(),
      takeUntil(this.documentElementInit$),
      switchMap(params => this.apiDocumentsService.get(params['documentSlug'])),
    ).subscribe(document => {
      this.document = document;

      if (this.document) {
        this.documentNotFound = false;

        Konva.Image.fromURL(this.document!.url, (node) => {
          node.setAttrs({
            x: 0,
            y: 0,
            scaleX: 1.3,
            scaleY: 1.3,
          });

          this.initStage(node.attrs.image.width, node.attrs.image.height);
          this.layer!.add(node);
        });
      } else {
        this.documentNotFound = true;
      }
      this.cdr.detectChanges();
    });
  }

  override ngOnDestroy() {
    super.ngOnDestroy();
    this.documentElementInit$.complete();
  }

}
