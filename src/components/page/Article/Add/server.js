export default {
  addClassifies (name, cb) {
    window.getData({
      'obj': 'category',
      'act': 'add',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  classifiesList (cb) {
    window.getData({
      'obj': 'category',
      'act': 'list',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  addLang (name, cb) {
    window.getData({
      'obj': 'language',
      'act': 'add',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  langList (cb) {
    window.getData({
      'obj': 'language',
      'act': 'list',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  langDel (name, cb) {
    window.getData({
      'obj': 'language',
      'act': 'delete',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  addArticle (obj, cb) {
    window.getData({
      'obj': 'article',
      'act': 'add',
      'title': '',
      'content': '',
      'categoryId': '',
      'categoryName': '',
      'languageId': '',
      'languageName': ''
    }, (d) => {
      cb(d)
    })
  }
}
