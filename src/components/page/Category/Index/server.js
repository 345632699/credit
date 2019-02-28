export default {
  list (cb) {
    window.getData({
      'obj': 'menu',
      'act': 'list'
    }, (d) => {
      cb(d)
    })
  }
}
