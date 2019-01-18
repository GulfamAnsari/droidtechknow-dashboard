import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ControllerService } from 'src/app/services/controller.service';
import { HelperService } from 'src/app/services/helper.service';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent implements OnInit {

  username: string = '';
  password: string = '';
  constructor(public dialog: MatDialog, private controller: ControllerService, 
    private helper: HelperService, private dataService: DataService) {
    
  }

  ngOnInit() {
  }

  public openDialog() {
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '340px',
      data: this.dataService.selectedRowData
    });
    
    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public deleteSelectedArticle() {
    const data = {
      id: this.dataService.selectedRowData.post,
      username: this.username,
      password: this.password
    }
    const url = this.helper.getUrl() + 'article-delete';
    this.controller.deleteSelectedArticle(data, url).subscribe((success)=>{
      this.dataService.source.remove(this.dataService.selectedRowData).then(()=>{
        this.dialog.closeAll();
        console.log(success);
      });
    }, (err)=>{
      console.log(err.error);
      this.dialog.closeAll();
    });
  }
}
