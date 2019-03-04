export default {
  list (cb) {
    window.getData({
      'obj': 'menu',
      'act': 'list'
    }, (d) => {
      cb(d)
    })
  },
  delete (id, cb) {
    window.getData({
      'obj': 'menu',
      'act': 'delete',
      'id': id
    }, (d) => {
      cb(d)
    })
  },
  add (obj, cb) {
    window.getData({
      'obj': 'menu',
      'act': 'add',
      'name': obj.name,
      'parentId': obj.parentId
    }, (d) => {
      cb(d)
    })
  },
  modify (obj, cb) {
    window.getData({
      'obj': 'menu',
      'act': 'modify',
      'id': obj.id,
      'name': obj.name,
      'parentId': obj.parentId
    }, (d) => {
      cb(d)
    })
  }
}
