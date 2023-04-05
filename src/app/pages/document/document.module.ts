import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { EmptyDocumentComponent } from '../empty-document/empty-document.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: EmptyDocumentComponent,
}, {
  path: ':documentSlug',
  component: DocumentComponent,
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    DocumentComponent,
    EmptyDocumentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DocumentModule { }
