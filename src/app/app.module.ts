import { APP_BOOTSTRAP_LISTENER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxsModule, Store } from '@ngxs/store';
import { environment } from '@env/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { AddingNoteState } from '@app/store/adding-note.state';
import { appBootstrapListener } from '@app/app-bootstrap-listener';
import { SelectingNoteState } from '@app/store/selecting-note.state';
import { TransformingNoteState } from '@app/store/transforming-note.state';
import { PageService } from '@app/services/page.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([
      AddingNoteState,
      SelectingNoteState,
      TransformingNoteState,
    ], {
      developmentMode: !environment.production,
      selectorOptions: {
        suppressErrors: false,
        injectContainerState: false,
      }
    }),
    NgxsReduxDevtoolsPluginModule.forRoot({
      name: environment.appName,
      disabled: environment.production,
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: environment.production,
    }),
  ],
  providers: [
    {
      provide: APP_BOOTSTRAP_LISTENER,
      useFactory: appBootstrapListener,
      deps: [ Store, PageService ],
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
