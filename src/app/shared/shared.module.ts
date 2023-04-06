import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolboxComponent } from './toolbox/toolbox.component';
import { ZoomComponent } from './zoom/zoom.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [
  ToolboxComponent,
  ZoomComponent,
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    ...components,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class SharedModule { }
