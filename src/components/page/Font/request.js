window.apiCallback = []
let requestData = (ws, attr, cb) => {
  init(ws)
  window.console.info('send:', JSON.stringify(attr))
  // 发送信息
  window.apiCallback[attr.obj + '_' + attr.act] = function (data) {
    if (data.ustr) {
      alert(data.ustr)
    } else if (cb) {
      cb(data)
    }
  }
  if (ws.readyState === 1) {
    let sendStr = JSON.stringify(attr) + '\n'
    ws.send(sendStr)
  }
  ws.addEventListener('open', function () {
    let sendStr = JSON.stringify(attr) + '\n'
    ws.send(sendStr)
  })
}
function init (ws) {
  ws.onmessage = evt => {
    console.log('数据已接收...')
    let parseData = evt.data.replace(/[\s\r\n]+$/, '').split('\n')
    parseData.splice(0, 1)
    parseData = JSON.parse('[' + parseData.join(',') + ']')
    let key = parseData[0].obj + '_' + parseData[0].act
    if (window.apiCallback[key]) {
      window.apiCallback[key](parseData[0])
    }
  }
  ws.onclose = function () {
    // 关闭 websocket
    console.log('连接已关闭...')
  }
}

let close = (ws) => {
  ws.close()
}

export default {
  requestData,
  close
}
