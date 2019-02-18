import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';
import { LocalDataSource } from 'ng2-smart-table';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedRowData: any;
  public source: LocalDataSource;

  constructor(private backendService: BackendService, private helper: HelperService) {
  }

  public getArticleList() {
    return new Observable((observer) => {
      console.log(this.helper.getUrl());
      this.backendService.get(this.helper.getUrl() + 'article-list')
        .subscribe((result) => {
          observer.next(result);
          observer.complete();
        }, (error) => {
          console.error(error);
          observer.error(error);
        });
    });
  }

}
