import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public getUrl() {
    return 'https://droidtechknow.com/';
    // if(window.location.hostname == "localhost") {
    //   return "http://localhost:5000/droid/"
    // } else {
    //   return '/droid/';
    // }
  }
}
