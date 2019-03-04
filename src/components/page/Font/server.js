export default {
  list (cb) {
    window.getData({
      'obj': 'homeMenu',
      'act': 'list'
    }, (d) => {
      cb(d)
    })
  },
  homeArticleList (page = 1, limit = 10, cb) {
    window.getData({
      'obj': 'homeArticle',
      'act': 'list',
      'page': page,
      'limit': limit
    }, (d) => {
      cb(d)
    })
  }
}
