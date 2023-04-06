import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmptyDocumentComponent } from '@app/pages/empty-document/empty-document.component';
import { DocumentComponent } from '@app/pages/document/document.component';
import { DocumentPageComponent } from '@app/pages/document-page/document-page.component';
import { SharedModule } from '@app/shared/shared.module';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: EmptyDocumentComponent,
}, {
  path: ':documentSlug',
  component: DocumentPageComponent,
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    DocumentPageComponent,
    EmptyDocumentComponent,
    DocumentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class DocumentPageModule { }
