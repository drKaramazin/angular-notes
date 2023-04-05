import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsListComponent } from './documents-list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  component: DocumentsListComponent,
  loadChildren: () => import('../document/document.module').then(m => m.DocumentModule),
}];

@NgModule({
  declarations: [
    DocumentsListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DocumentsListModule { }
