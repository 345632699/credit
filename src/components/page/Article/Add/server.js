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
  menuList (cb) {
    window.getData({
      'obj': 'bindMenu',
      'act': 'list'
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
      'tag': obj.tag,
      'coverFid': obj.coverFid,
      'languageName': obj.languageName,
      'ownershipMenuId': obj.ownershipMenuId
    }, (d) => {
      cb(d)
    })
  }
}
