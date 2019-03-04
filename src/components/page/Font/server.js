export default {
  list (cb) {
    window.getData({
      'obj': 'homeMenu',
      'act': 'list'
    }, (d) => {
      cb(d)
    })
  }
}
