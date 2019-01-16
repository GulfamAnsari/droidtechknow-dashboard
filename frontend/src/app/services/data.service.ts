import { Injectable } from '@angular/core';
import { BackendService } from './backend.service'
import { Observable } from 'rxjs';
import { HelperService } from './helper.service';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  private articles: any = [];
  constructor(private backendService: BackendService, private helper: HelperService) {
   }

  public getArticleList() {
    return new Observable((observer)=>{
      console.log(this.helper.getUrl())
      this.backendService.get( this.helper.getUrl() + 'article-list')
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
