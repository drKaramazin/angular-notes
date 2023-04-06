import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: '',
  redirectTo: 'document',
  pathMatch: 'full',
}, {
  path: 'document',
  loadChildren: () => import('./features/document/document.module').then(m => m.DocumentModule),
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
