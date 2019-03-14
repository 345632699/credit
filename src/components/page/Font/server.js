import request from './request'
import { wsUrl } from '../../../config'
const ws = new WebSocket(wsUrl)
export default {
  list (cb) {
    let attr = {
      'obj': 'homeMenu',
      'act': 'list'
    }
    request.requestData(ws, attr, cb)
  },
  homeArticleList (page = 1, limit = '10', cb) {
    let attr = {
      'obj': 'homeArticle',
      'act': 'list',
      'page': page,
      'limit': limit
    }
    request.requestData(ws, attr, cb)
  },
  articleByMenuId (id, page = 1, limit = '10', cb) {
    let attr = {
      'obj': 'articleByMenuId',
      'act': 'list',
      'menuId': id,
      'page': page,
      'limit': limit
    }
    request.requestData(ws, attr, cb)
  },
  artucleSearch (keyword, page = 1, limit = '10', cb) {
    let attr = {
      'obj': 'articleSearch',
      'act': 'list',
      'searchWord': keyword,
      'page': page,
      'limit': limit
    }
    request.requestData(ws, attr, cb)
  },
  articleInfoByMenuId (id, cb) {
    let attr = {
      'obj': 'articleByMenuId',
      'act': 'info',
      'menuId': id,
      'pagersize': 2
    }
    request.requestData(ws, attr, cb)
  },
  articleByCategoryId (id, page = 1, limit = 0, cb) {
    let attr = {
      'obj': 'articleByCategoryId',
      'act': 'list',
      'categoryId': id,
      'page': page,
      'limit': limit
    }
    request.requestData(ws, attr, cb)
  },
  article (id, cb) {
    let attr = {
      'obj': 'article',
      'act': 'get',
      'articleId': id,
      'pagersize': 2
    }
    request.requestData(ws, attr, cb)
  },
  websocket (cb) {
    let attr = {
      'obj': 'homeMenu',
      'act': 'list'
    }
    request.requestData(ws, attr, cb)
  }
}
