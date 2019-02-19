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
import { MatDialogModule, MatFormFieldModule, MatCardModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

// ng2 smart table
import { Ng2SmartTableModule } from 'ng2-smart-table';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DeleteDialogBoxComponent } from './components/delete-dialog-box/delete-dialog-box.component';
import { TableComponent } from './components/table/table.component';
import { MatInputModule } from '@angular/material';
import { EditAddDialogBoxComponent } from './components/edit-add-dialog-box/edit-add-dialog-box.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TableComponent,
    HeaderComponent,
    DeleteDialogBoxComponent,
    EditAddDialogBoxComponent
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
    MatInputModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
  entryComponents: [DeleteDialogBoxComponent, EditAddDialogBoxComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
