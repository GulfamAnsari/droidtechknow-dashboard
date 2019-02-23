import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dataService:  DataService) { }

  public themeColor: string;
  public themecolors = ['rgb(63, 81, 181)', 'rgb(103, 58, 183)', 'rgb(233, 30, 99)', 'rgb(156, 39, 176)'];

  ngOnInit() {
    this.changeTheme(this.themecolors[0], true);
  }

  public changeTheme(color, nightMode) {
    this.themeColor = color;
    this.dataService.setThemecolor(color);
    if (nightMode) {
      // @todo
    }
  }

}
