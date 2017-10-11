import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Ng4JsonEditorModule } from 'angular4-jsoneditor'
import { AppComponent } from './app.component';
import { JsonEditorViewComponent } from './json-editor-view/json-editor-view.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonEditorViewComponent
  ],
  imports: [
    BrowserModule,
    Ng4JsonEditorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
