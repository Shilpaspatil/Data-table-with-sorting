import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GridModule, PDFModule, ExcelModule } from '@progress/kendo-angular-grid';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { InputsModule } from '@progress/kendo-angular-inputs';
import {GridServiceService} from './grid-service.service'
import 'hammerjs';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    GridModule,
    BrowserAnimationsModule,
    HttpClientModule,
    PDFModule,
    ExcelModule,
    InputsModule
  ],
  providers: [GridServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
