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
  public updateEdit: string;
  public articleData;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dataService: DataService,
    private dialogRef: MatDialogRef<EditAddDialogBoxComponent>
  ) {
    if (Object.keys(data).length === 0) {
      this.updateEdit = 'Add';
    } else {
      this.updateEdit = 'Update';
    }
  }

  ngOnInit() {
  }

  /**
   * Opens the dialog for edit and add the new or existing articles
   */
  public openEditAddDialog() {
    const dialogRef = this.dialog.open(EditAddDialogBoxComponent, {
      width: '',
      data: this.dataService.selectedRowData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.selectedRowData = {};
    });
  }

  public updateAddArticle() {
    this.dataService.setConfirmationDialogBox(this.updateEdit);
  }

  closeDialog() {
    this.dialogRef.close('bye!');
  }
}
