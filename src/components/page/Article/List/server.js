export default {
  list (page, limit, cb) {
    window.getData({
      'obj': 'article',
      'act': 'list',
      'page': page,
      'limit': limit
    }, (d) => {
      cb(d)
    })
  },
  delete (id, cb) {
    window.getData({
      'obj': 'article',
      'act': 'delete',
      'articleId': id
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
  get (id, cb) {
    window.getData({
      'obj': 'get',
      'act': 'list',
      'articleId': id
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
  langList (cb) {
    window.getData({
      'obj': 'language',
      'act': 'list',
      'name': name
    }, (d) => {
      cb(d)
    })
  },
  edit (obj, cb) {
    window.getData({
      'obj': 'article',
      'act': 'modify',
      'title': obj.title,
      'content': obj.content,
      'categoryId': obj.categoryId,
      'categoryName': obj.categoryName,
      'languageId': obj.languageId,
      'articleId': obj.articleId,
      'languageName': obj.languageName
    }, (d) => {
      cb(d)
    })
  }
}
