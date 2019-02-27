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
    private dataService: DataService,
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
    this.formData.value['article'] = this.dataService.selectedRowData;
    if (operationType === 'Add') {
      const url = this.helper.getUrl() + 'article-add';
      this.addArticle(this.formData.value, url);
    } else if (operationType === 'Update') {
      const url = this.helper.getUrl() + 'article-edit';
      this.updateArticle(this.formData.value, url);
    } else if (operationType === 'Delete') {
      const url = this.helper.getUrl() + 'article-delete';
      this.deleteArticle(this.formData.value, url);
    }
  }

  public deleteArticle(data, url) {
    this.controller.doPost(data, url).subscribe((success) => {
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
    this.controller.doPost(data, url).subscribe((success) => {
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
    this.controller.doPatch(data, url).subscribe((success) => {
      this.dataService.source.update(this.dataService.selectedRowData, data['article']).then(() => {
        this.dialog.closeAll();
        console.log(success);
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
