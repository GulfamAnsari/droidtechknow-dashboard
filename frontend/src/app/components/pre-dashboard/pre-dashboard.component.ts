import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-pre-dashboard',
  templateUrl: './pre-dashboard.component.html',
  styleUrls: ['./pre-dashboard.component.scss']
})
export class PreDashboardComponent implements OnInit {

  public articles = [];
  public showPreDashboard = false;
  constructor(private dataService: DataService) { }


  ngOnInit() {

    this.getArticles();
  }

  public getArticles() {
    this.dataService.getArticleList().subscribe((data: any) => {
      this.articles = data;
      this.showPreDashboard = true;
    }, (error) => {
      console.log(error);
    });
  }

}
