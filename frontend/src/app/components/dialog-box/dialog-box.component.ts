import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ControllerService } from 'src/app/services/controller.service';
import { HelperService } from 'src/app/services/helper.service';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  dialogRef: any;
  username: any;
  password: any;
  constructor(public dialog: MatDialog, private controller: ControllerService, 
    private helper: HelperService) {
    
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
    const data = {
      username: this.username,
      password: this.password
    }
    const url = this.helper.getUrl() + 'article-delete';
    this.controller.deleteSelectedArticle(data, url).subscribe(()=>{
      console.log('Sucessfully deleted');
      this.dialog.closeAll()
    }, (err)=>{
      console.log(err);
    });
  }
}
