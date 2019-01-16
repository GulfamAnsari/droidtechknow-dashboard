import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ControllerService } from 'src/app/services/controller.service';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  dialogRef: any;
  constructor(public dialog: MatDialog, private controller: ControllerService) {
    
  }

  ngOnInit() {
  }

  public openDialog(): void {
    this.dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: "data"
    });

    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public deleteSelectedArticle() {
    this.controller.deleteSelectedArticle().subscribe(()=>{
      console.log('Sucessfully deleted');
      this.dialog.closeAll()
    }, (err)=>{
      console.log('there is error while deleting the current article');
    });
  }
}
