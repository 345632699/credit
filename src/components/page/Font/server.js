export default {
  addClassifies (name, cb) {
    window.getData({
      'obj': 'category',
      'act': 'add',
      'name': name
    }, (d) => {
      cb(d)
    })
  }
}
