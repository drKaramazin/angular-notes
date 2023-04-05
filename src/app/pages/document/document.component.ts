import { Component, OnInit } from '@angular/core';
import Konva from 'konva';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ApiDocumentsService } from '@app/services/api-documents.service';
import { Document } from '@app/model/document';
import Layer = Konva.Layer;

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {

  document?: Document;
  layer?: Layer;

  constructor(
    private route: ActivatedRoute,
    private apiDocumentsService: ApiDocumentsService,
  ) { }

  initStage() {
    const stage = new Konva.Stage({
      container: 'document',
      width: 400,
      height: 400,
    });

    this.layer = new Konva.Layer();
    stage.add(this.layer);
  }

  subscribeToParams() {
    this.route.params.pipe(
      switchMap(params => this.apiDocumentsService.get(params['documentSlug'])),
    ).subscribe(document => {
      this.document = document;

      if (this.document) {
        Konva.Image.fromURL(this.document!.url, (node) => {
          node.setAttrs({
            x: 200,
            y: 50,
            scaleX: 0.5,
            scaleY: 0.5,
            cornerRadius: 20,
          });

          this.layer!.add(node);
        });
      }
    });
  }

  ngOnInit(): void {
    this.initStage();
    this.subscribeToParams();
  }

}
