import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  public get(url: string, config?:any) {
    return this.http.get(url, config);
  }

  public post(url: string, data: any, config?:any) {
    return this.http.post(url, data, config);
  }

  public put(url: string, data: any, config?:any) {
    return this.http.put(url, data, config);
  }

  public patch(url: string, data: any, config?:any) {
    return this.http.patch(url, data, config);
  }
}
