import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { DropDownListComponent } from './components/drop-down-list/drop-down-list.component';

@NgModule({
  declarations: [
    AppComponent,
    DropDownListComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
