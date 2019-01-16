import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControllerService {

  constructor() { }

  public deleteSelectedArticle(): Observable<any> {
    return new Observable((observer)=>{
      observer.next(true);
      observer.complete();
    });
  }
}
