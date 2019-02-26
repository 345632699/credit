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
      'title': obj.title,
      'content': obj.content,
      'categoryId': obj.categoryId,
      'categoryName': obj.categoryName,
      'languageId': obj.languageId,
      'tag': obj.tag ? obj.tag : 'ddd',
      'languageName': obj.languageName
    }, (d) => {
      cb(d)
    })
  }
}
