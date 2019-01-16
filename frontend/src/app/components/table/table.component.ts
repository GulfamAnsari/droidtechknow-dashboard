import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TableConstants } from '../../constants';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() data: Array<Object> = [];
  @ViewChild(DialogBoxComponent) dialogBox: DialogBoxComponent;
  settings = {};
  
  constructor(private dataService: DataService) {
    this.settings = TableConstants.SETTING;
   }

  ngOnInit() {
  }


  public editRow($event) {
    console.log('edit')
    console.log($event);
  }

  public deleteRow($event) {
    console.log('delete');
    console.log($event);
    this.dialogBox.openDialog();
  }

}
