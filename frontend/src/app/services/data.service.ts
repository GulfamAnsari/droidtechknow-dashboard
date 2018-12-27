import { Injectable } from '@angular/core';
import { BackendService } from './backend.service'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private articles: any = [];
  constructor(private backendService: BackendService) {
   }

  public getArticleList() {
    return new Observable((observer)=>{
      this.backendService.get('http://localhost:5000/article-list')
      .subscribe((result) => {
        observer.next(result);
        observer.complete();
      }, (error) => {
        console.error(error);
        observer.error(error);
      })
    });
  }
}
