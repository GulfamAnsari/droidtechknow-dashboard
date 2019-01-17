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
      this.backendService.post(url, data, {responseType: 'text'}).subscribe((success)=>{
        observer.next(success);
        observer.complete();
      }, (err)=>{
        observer.error(err);
      });
    });
  }
}
