import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dataService: DataService) { 
    this.setTableData();
  }
  loading: boolean = false;
  data: any;
  ngOnInit() {
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

}
