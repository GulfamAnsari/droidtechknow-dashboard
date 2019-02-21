import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatTableModule,
  MatTabsModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { NgModule } from '@angular/core';
import { ObserversModule } from '@angular/cdk/observers';
import { PlatformModule } from '@angular/cdk/platform';

/**
 * NgModule that includes all Material modules that are required to serve the demo-app.
 */
@NgModule({
  exports: [
    MatButtonModule,
    ObserversModule,
    PlatformModule,
    MatMenuModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatCardModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTreeModule,
    MatTableModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatProgressBarModule,
    MatTabsModule,
    MatTooltipModule,
    MatButtonToggleModule,
  ]
})
export class MaterialModule { }
