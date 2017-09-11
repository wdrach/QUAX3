// angular imports
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// primeng imports
import { DropdownModule } from 'primeng/primeng';

// local component imports
import { AppComponent } from './app.component';
import { CandlestickComponent } from './charts/candlestick/candlestick.component';

@NgModule({
  declarations: [
    AppComponent,
    CandlestickComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
