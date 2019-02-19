import { Component, OnInit, OnChanges, DoCheck, ViewChild, Input, SimpleChanges,
  AfterContentChecked, AfterContentInit, AfterViewInit, AfterViewChecked, OnDestroy} from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TableConstants } from '../../constants';
import { DeleteDialogBoxComponent } from '../delete-dialog-box/delete-dialog-box.component';
import { EditAddDialogBoxComponent } from '../edit-add-dialog-box/edit-add-dialog-box.component';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges, DoCheck,
  AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() source: Array<Object> = [];
  @ViewChild(DeleteDialogBoxComponent) deleteDialogBoxComponent: DeleteDialogBoxComponent;
  @ViewChild(EditAddDialogBoxComponent) editAddDialogBoxComponent: EditAddDialogBoxComponent;
  settings = {};

  constructor(private dataService: DataService) {
    this.settings = TableConstants.SETTING;
  }

  public editRow($event) {
    this.dataService.selectedRowData = $event.data;
    this.editAddDialogBoxComponent.openEditAddDialog();
  }

  public deleteRow($event) {
    this.dataService.selectedRowData = $event.data;
    this.deleteDialogBoxComponent.openDeleteDialog();
  }

  public create($event) {
    this.editAddDialogBoxComponent.openEditAddDialog();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Called before any other lifecycle hook. Use it to inject dependencies,
    // but avoid any serious work here.
    // It is called whenever any input bound property changes
    // Add '${implements OnChanges}' to the class.
    // console.log('ng on change', changes);
  }

  ngOnInit(): void {
    // console.log('ng on init');
    // called when the component is first initilized
    // Add 'implements OnInit' to the class.

  }

  ngDoCheck(): void {
    // console.log('do check called');
    // Called every time that the input properties of a component or a directive are checked.
    // Use it to extend change detection by performing a custom check.
    // Add 'implements DoCheck' to the class.
  }

  ngAfterContentInit(): void {
    // console.log('ngAfterContentInit called');
    // Called after ngOnInit when the component's or directive's content has been initialized.
    // Add 'implements AfterContentInit' to the class.
  }

  ngAfterContentChecked(): void {
    // console.log('ngAfterContentChecked called');
    // Called after every check of the component's or directive's content.
    // Add 'implements AfterContentChecked' to the class.
  }

  ngAfterViewInit(): void {
    // console.log('ngAfterViewInit called');
    // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    // Add 'implements AfterViewInit' to the class.
  }

  ngAfterViewChecked(): void {
    // console.log('ngAfterViewChecked called');
    // Called after every check of the component's view. Applies to components only.
    // Add 'implements AfterViewChecked' to the class.
  }

  ngOnDestroy(): void {
    // console.log('ngOnDestroy called');
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
