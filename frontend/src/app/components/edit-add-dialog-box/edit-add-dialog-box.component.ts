import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import { TableConstants } from 'src/app/constants';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-edit-add-dialog-box',
  templateUrl: './edit-add-dialog-box.component.html',
  styleUrls: ['./edit-add-dialog-box.component.scss']
})
export class EditAddDialogBoxComponent implements OnInit {

  public headerColumns = TableConstants.COLUMN_HEADERS;
  public textAraeColumns = ['articleDescription', 'keywords', 'articleLink', 'imageLink', 'imageLink2'];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditAddDialogBoxComponent>
  ) { }

  ngOnInit() {
  }

  public openEditAddDialog() {
    const dialogRef = this.dialog.open(EditAddDialogBoxComponent, {
      width: '',
      data: this.dataService.selectedRowData
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public updateSelectedArticle() {

  }

  closeDialog() {
    this.dialogRef.close('bye!');
  }
}
