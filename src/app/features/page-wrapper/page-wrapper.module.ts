import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmptyDocumentComponent } from '@app/features/empty-document/empty-document.component';
import { PageComponent } from '@app/features/page/page.component';
import { SharedModule } from '@app/shared/shared.module';
import { PageWrapperComponent } from '@app/features/page-wrapper/page-wrapper.component';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: EmptyDocumentComponent,
}, {
  path: ':pageSlug',
  component: PageWrapperComponent,
  pathMatch: 'full',
}];

@NgModule({
  declarations: [
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
export class PageWrapperModule { }
