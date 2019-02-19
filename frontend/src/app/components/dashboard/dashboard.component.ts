import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { LocalDataSource } from 'ng2-smart-table';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public loading = false;
  public source: LocalDataSource;

  constructor(private dataService: DataService) {
    this.setTableData();
  }

  ngOnInit(): void { }

  public setTableData() {
    this.dataService.getArticleList().subscribe((res: any) => {
      console.log(res);
      this.loading = true;
      this.dataService.source = new LocalDataSource(res);
      this.source = this.dataService.source;
    }, (err) => {
      console.log(err);
    });
  }

}
