import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TableConstants } from '../../constants';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() source: Array<Object> = [];
  @ViewChild(DeleteDialogBoxComponent) dialogBox: DeleteDialogBoxComponent;
  settings = {};

  constructor(private dataService: DataService) {
    this.settings = TableConstants.SETTING;
   }

  ngOnInit() {
  }

  public editRow($event) {
    console.log('edit');
    console.log($event);
  }

  public deleteRow($event) {
    this.dataService.selectedRowData = $event.data;
    this.dialogBox.openDialog();
  }

}
