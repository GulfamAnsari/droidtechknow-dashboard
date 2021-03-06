export class TableConstants {
  static SETTING = {
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
      articleDate: {
        title: 'Date',
        width: '60px'
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
      position: 'right'
    },
    // edit: {
    //   confirmSave: true
    // },
    // add: {
    //   confirmCreate: true
    // },
    // delete: {
    //   confirmDelete: true
    // },
    mode: 'external'
  };

  static COLUMN_HEADERS = ['post', 'articleTitle', 'articleDescription', 'articleDate',
    'catagory', 'subCatagory', 'author', 'views', 'keywords', 'articleLink', 'imageLink',
    'imageLink2', 'imageAlt', 'comment', 'likes', 'dislikes'];
}
