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
  }
}
