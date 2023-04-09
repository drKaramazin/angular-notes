import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentComponent } from './document.component';
import { RouterModule, Routes } from '@angular/router';
import { EmptyDocumentComponent } from '@app/features/empty-document/empty-document.component';
import { PageWrapperComponent } from '@app/features/page-wrapper/page-wrapper.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageComponent } from '@app/features/page/page.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: DocumentComponent,
}, {
  path: ':pageSlug',
  component: DocumentComponent,
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
    DocumentComponent,
    PageWrapperComponent,
    EmptyDocumentComponent,
    PageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
  ]
})
export class DocumentModule { }
