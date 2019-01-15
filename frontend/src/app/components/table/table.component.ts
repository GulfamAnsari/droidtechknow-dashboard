import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { TableConstants } from '../../constants';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  loading: boolean = false;
  // table data and setting
  data: Array<Object> = [];
  settings = {};
  
  constructor(private dataService: DataService) {
    this.settings = TableConstants.SETTING;
   }

  ngOnInit() {
    this.setTableData();
  }

  public setTableData() {
    this.dataService.getArticleList().subscribe((res: any) => {
      console.log(res);
      this.loading = true;
      this.data = res;
    }, (err) => {
      console.log(err);
    });
  }

  public editRow($event) {
    console.log('edit')
    console.log($event);
  }

  public deleteRow($event) {
    console.log('delete');
    console.log($event);
  }
    
}
