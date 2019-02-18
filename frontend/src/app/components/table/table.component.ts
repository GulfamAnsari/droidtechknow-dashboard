import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TableConstants } from '../../constants';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { EditAddDialogBoxComponent } from '../edit-add-dialog-box/edit-add-dialog-box.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Input() source: Array<Object> = [];
  @ViewChild(DeleteDialogBoxComponent) deleteDialogBoxComponent: DeleteDialogBoxComponent;
  @ViewChild(EditAddDialogBoxComponent) editAddDialogBoxComponent: EditAddDialogBoxComponent;
  settings = {};

  constructor(private dataService: DataService) {
    this.settings = TableConstants.SETTING;
  }

  ngOnInit() {
  }

  public editRow($event) {
    this.dataService.selectedRowData = $event.data;
    this.editAddDialogBoxComponent.openEditAddDialog();
    console.log('edit');
    console.log($event.data);
  }

  public deleteRow($event) {
    this.dataService.selectedRowData = $event.data;
    this.deleteDialogBoxComponent.openDeleteDialog();
  }

}
