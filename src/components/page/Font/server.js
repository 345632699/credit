export default {
  list (cb) {
    window.getData({
      'obj': 'homeMenu',
      'act': 'list'
    }, (d) => {
      cb(d)
    })
  },
  homeArticleList (page = 1, limit = '10', cb) {
    window.getData({
      'obj': 'homeArticle',
      'act': 'list',
      'page': page,
      'limit': limit
    }, (d) => {
      cb(d)
    })
  },
  articleByMenuId (id, page = 1, limit = '10', cb) {
    window.getData({
      'obj': 'articleByMenuId',
      'act': 'list',
      'menuId': id
    }, (d) => {
      cb(d)
    })
  },
  articleInfoByMenuId (id, cb) {
    window.getData({
      'obj': 'articleByMenuId',
      'act': 'info',
      'menuId': id
    }, (d) => {
      cb(d)
    })
  },
  article (id, cb) {
    window.getData({
      'obj': 'article',
      'act': 'get',
      'articleId': id
    }, (d) => {
      cb(d)
    })
  }
}
