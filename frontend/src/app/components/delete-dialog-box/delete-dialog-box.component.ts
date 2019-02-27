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
    data['article'] = { "post": 161, "articleTitle": "Find My Device - Find, Lock, Erase an Android Device", "articleDescription": "Using find my device, you can remotely locate, lock and erase all data on your phone. Find my Device Automatically turn on. You can use your Gmail account t", "keywords": "Lock, Erase, Android, FIND MY DEVICE, FIND MY PHONE, HOW TO FIND LOCATION OF PHONE, HOW TO USE FIND MY DEVICE, LOCK PHONE", "catagory": "how-to", "subCatagory": "", "imageLink": "http://droidtechknow.com/how-to/find-my-device/images/find-my-device-300x169.jpg", "imageLink2": "http://droidtechknow.com/how-to/find-my-device/images/find-my-device-178x100.jpg", "imageAlt": "find my device", "articleLink": "http://droidtechknow.com/how-to/find-my-device/", "articleDate": "Nov 21, 2017", "author": "Simran", "views": 3839, "likes": 5, "dislikes": 1, "comment": 1 };
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
    data['article'] = { "post": 161, "articleTitle": "Find My Device - Find, Lock, Erase an Android Device", "articleDescription": "Using find my device, you can remotely locate, lock and erase all data on your phone. Find my Device Automatically turn on. You can use your Gmail account t", "keywords": "Lock, Erase, Android, FIND MY DEVICE, FIND MY PHONE, HOW TO FIND LOCATION OF PHONE, HOW TO USE FIND MY DEVICE, LOCK PHONE", "catagory": "how-to", "subCatagory": "", "imageLink": "http://droidtechknow.com/how-to/find-my-device/images/find-my-device-300x169.jpg", "imageLink2": "http://droidtechknow.com/how-to/find-my-device/images/find-my-device-178x100.jpg", "imageAlt": "find my device", "articleLink": "http://droidtechknow.com/how-to/find-my-device/", "articleDate": "Nov 21, 2017", "author": "Simran", "views": 3839, "likes": 5, "dislikes": 1, "comment": 1 };
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
