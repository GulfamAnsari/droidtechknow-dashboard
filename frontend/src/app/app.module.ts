import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';
// Angular materials
import {MatDialogModule} from '@angular/material/dialog';

// ng2 smart table
import { Ng2SmartTableModule } from 'ng2-smart-table';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { TableComponent } from './components/table/table.component';
import { MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    HeaderComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DragDropModule,
    ScrollingModule,
    CdkTableModule,
    CdkTreeModule,
    Ng2SmartTableModule,
    MatDialogModule,
    FormsModule,
    MatInputModule
  ],
  providers: [],
  entryComponents: [DialogBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
