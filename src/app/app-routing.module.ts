import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'document',
  pathMatch: 'full',
}, {
  path: 'document',
  loadChildren: () => import('./pages/documents-list/documents-list.module').then(m => m.DocumentsListModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
