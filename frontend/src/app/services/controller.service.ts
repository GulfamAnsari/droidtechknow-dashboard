import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor(private backendService: BackendService) { }

  public deleteSelectedArticle(data, url): Observable<any> {
    return new Observable((observer)=>{
      console.log(data, url);
      this.backendService.post(url, data).subscribe((success)=>{
        observer.next(true);
        observer.complete();
      }, (err)=>{
        observer.error('Error while deleting the article');
      });
    });
  }
}
