import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  loading: boolean = false;
  // table data and setting
  data: Array<Object> = [];
  settings = {};
  
  constructor(private dataService: DataService) {
    this.settings = this.tableSetting();
   }

  ngOnInit() {
    this.setTableData();
  }

  public setTableData() {
    this.dataService.getArticleList().subscribe((res: any) => {
      console.log(res);
      this.loading = true;
      this.data = res;
    }, (err) => {
      console.log(err);
    });
  }

  public tableSetting() {
    return {
      columns: {
        post: {
          title: '#',
          width: '46px'
        },
        articleTitle: {
          title: 'Article Title'
        },
        articleDescription: {
          title: 'Description'
        },
        catagory: {
          title: 'Catagory',
          width: '80px'
        },
        subCatagory: {
          title: 'Sub catagory'
        },
        author: {
          title: 'Author'
        },
        views: {
          title: 'Views',
          width: '60px'
        },
        keywords: {
          title: 'Keywords'
        },
        articleLink: {
          title: 'Article Link'
        },
        imageLink: {
          title: 'Image Link'
        },
        imageLink2: {
          title: 'Image Link 2'
        },
        imageAlt: {
          title: 'Image ALT'
        }
      },
      attr: {
        class: 'table table-bordered table-hover table-striped'
      },
      hideHeader: false,
      hideSubHeader: false,
      actions: {
        position: "right"
      },
      edit: {
        confirmSave: true
      },
      add: {
        confirmCreate: true
      },
      delete: {
        confirmDelete: true
      }
    };
  }
  
}
