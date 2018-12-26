import { Injectable } from '@angular/core';
import { BackendService } from './backend.service'
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private articles: any = [];
  constructor(private backendService: BackendService) {
   }

  public getArticleList() {
    this.backendService.get('/article-list')
      .subscribe((result) => {
        this.articles = result;
        console.log(result)
      }, (error) => {
        console.error(error);
      })
  }
}
