import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { Observable, Subject } from 'rxjs';
import { HelperService } from './helper.service';
import { LocalDataSource } from 'ng2-smart-table';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  public selectedRowData: any;
  public updatedRowData: any;
  public dialogConfirmationText: string;
  public source: LocalDataSource;
  public allArticles: any;
  private dialogConfirmation = new Subject();

  constructor(private backendService: BackendService, private helper: HelperService) {
  }

  public getArticleList() {
    return new Observable((observer) => {
      console.log(this.helper.getUrl());
      this.backendService.get(this.helper.getUrl() + 'article-list')
        .subscribe((result) => {
          this.allArticles = result;
          observer.next(result);
          observer.complete();
        }, (error) => {
          console.error(error);
          observer.error(error);
        });
    });
  }

  public setConfirmationDialogBox(name) {
    this.dialogConfirmationText = name;
    this.dialogConfirmation.next(name);
  }

  public getConfirmationDialogBox() {
    return this.dialogConfirmation;
  }

}
