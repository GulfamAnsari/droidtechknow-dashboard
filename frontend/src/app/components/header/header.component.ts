import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  @ViewChild('themeChange') theme: ElementRef;

  ngOnInit() {
  }

  public changeTheme(color, nightMode) {
    const elements: any = document.getElementsByClassName('theme-change');
    for (const ele of elements) {
      ele.style.background = color;
    }
    // this.changeThemeForTable(color);
    if (nightMode) {
      // @todo
    }
  }

  public changeThemeForTable(color) {
    const smartAction: any = document.getElementsByClassName('ng2-smart-action');
    const table: any = document.getElementsByClassName('ng2-smart-th');
    const pageLink: any = document.getElementsByClassName('page-link');
    for (const ele of table) {
      ele.style.background = color;
    }
    for (const ele of smartAction) {
      ele.style.background = color;
    }
    pageLink[0].style.background = color;
  }
}
