import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: ':documentSlug',
  component: DocumentComponent,
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    DocumentComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class DocumentModule { }
