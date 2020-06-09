import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ControllerService } from 'src/app/services/controller.service';
import { HelperService } from 'src/app/services/helper.service';
import { DataService } from 'src/app/services/data.service';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-delete-dialog-box',
  templateUrl: './delete-dialog-box.component.html',
  styleUrls: ['./delete-dialog-box.component.scss']
})
export class DeleteDialogBoxComponent implements OnInit {

  @ViewChild('form') formData: NgForm;

  constructor(public dialog: MatDialog,
    private controller: ControllerService,
    private helper: HelperService,
    public dataService: DataService,
    private dialogRef: MatDialogRef<DeleteDialogBoxComponent>
  ) { }

  ngOnInit() {
  }

  public openConfirmationDialog() {
    const dialogRef = this.dialog.open(DeleteDialogBoxComponent, {
      width: '340px',
      data: this.dataService.selectedRowData
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dataService.selectedRowData = {};
    });
  }

  public ngSubmit(operationType) {
    this.formData.value['article'] = JSON.parse(JSON.stringify(this.dataService.updatedRowData));
    const urlAppend = {
      'Add': 'admin/api/addArticle.php',
      'Update': 'admin/api/editArticle.php',
      'Delete': 'admin/api/deleteArticle.php'
    };
    const url = this.helper.getUrl() + urlAppend[operationType];
    switch (operationType) {
      case 'Add':
        this.addArticle(this.formData.value, url);
        break;
      case 'Update':
        this.updateArticle(this.formData.value, url);
        break;
      case 'Delete':
        this.deleteArticle(this.formData.value, url);
        break;
      default:
        console.log('wrong button selected');
        break;
    }
  }

  public deleteArticle(data, url) {
    this.controller.doPost({data: JSON.stringify(data)}, url).subscribe((success) => {
      this.dataService.source.remove(this.dataService.selectedRowData).then(() => {
        this.dialog.closeAll();
        console.log(success);
      });
    }, (err) => {
      console.log(err.error);
      this.dialog.closeAll();
    });
  }

  public addArticle(data, url) {
    this.controller.doPost({data: JSON.stringify(data)}, url).subscribe((success) => {
      this.dataService.source.prepend(data['article']).then(() => {
        this.dialog.closeAll();
        console.log(success);
      });
    }, (err) => {
      console.log(err.error);
      this.dialog.closeAll();
    });
  }

  public updateArticle(data, url) {
    this.controller.doPatch({data: JSON.stringify(data)}, url).subscribe((success) => {
      this.dataService.source.update(this.dataService.selectedRowData, this.dataService.updatedRowData).then(() => {
        console.log(success);
        this.dialog.closeAll();
      }, (err) => {
        console.log(err);
        this.dialog.closeAll();
      });
    }, (err) => {
      console.log(err.error);
      this.dialog.closeAll();
    });
  }

  closeDialog() {
    this.dialogRef.close('bye!');
  }
}
