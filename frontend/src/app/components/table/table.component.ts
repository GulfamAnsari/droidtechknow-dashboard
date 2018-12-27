import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns: Array<string> = [];
  dataSource: any;
  loading: boolean = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.setTableData();
  }

  ngAfterViewInit() {
    
  }

  public setTableData() {
    this.dataService.getArticleList().subscribe((res: any) => {
      this.displayedColumns = Object.keys(res[0]);
      const dataSource = new MatTableDataSource(res);
      this.dataSource = dataSource;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.loading = true;
    }, (err) => {
      console.log(err);
    });
  }
  
}
