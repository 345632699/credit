var APIConnection = function () {
  this.DEBUG = !0
  this.ADVANCED_DEBUG = !1
  this.wsUri = ''
  this.state_changed_handler = this.response_received_handler = null
  this.login_passwd = this.login_name = ''
  this.registration = this.credential_data = null
  this.version = function () {
    return '125'
  }
  this.is_logged_in = function () {
    return this.conn_state == 'IN_SESSION'
  }
  this.clog = function (a) {
    // this.DEBUG && console.log((new Date()).toLocaleTimeString() + ': ' + a)
  }
  this.pretty = function (a) {
    return JSON.stringify(JSON.parse(a), null, 2)
  }
  var d = function (a, b) {
    return function () {
      return a.apply(b,
        arguments)
    }
  }
  this.getUnixTime = function () {
    return Math.round((new Date()).getTime() / 1E3)
  }
  this.not_empty = function (a, b) {
    return typeof a[b] === 'undefined' || void 0 === a[b] || a[b] === '' || a[b] === null ? !1 : !0
  }
  this.sess = ''
  this.user_info = {}
  this.server_info = {}
  this.user_data = {}
  this.client_info = {}
  this.user_pref = {}
  this.user_pref.single_request_only = 'false'
  this.user_pref.http_like_request_enabled = 'true'
  this.this_req = this.last_req = this.response = null
  this.MAX_RESPONSE_TIME = 15
  this.MINDER_TIME = 5
  this.credential = function (a,
                              b) {
    this.login_name = a
    this.login_passwd = b
    this.registration = this.user_info = this.credential_data = null
  }
  this.credentialx = function (a) {
    this.login_passwd = this.login_name = ''
    this.credential_data = a
    this.registration = this.user_info = null
  }
  this.send_str = function (a) {
    a = JSON.parse(a)
    return this.send_obj(a)
  }
  this.send_obj = function (a) {
    if (a.obj == 'person' && (a.act == 'login' || a.act == 'logout' || a.act == 'register')) return this.clog('send_obj: not authorized to call login/logout/register direct, request ignored'), !1
    if (this.last_req !=
      null && this.user_pref.single_request_only == 'true') {
      return this.clog('send: last_req not null, new request is ignored'), !1
    }
    if (this.websocket == null) {
      if (this.user_pref.http_like_request_enabled == 'true') {
        if (this.conn_state == 'CONNECTING_3' || this.conn_state == 'CONNECTING_1' || this.conn_state == 'CONNECTING_2' || this.conn_state == 'CONNECTING_3' || this.conn_state == 'CONNECTING_4') return this.clog('send: websocket is connecting, request is ignored'), !1
        if (this.this_req != null) return this.clog('send: request pending, new request is ignored'), !1
        this.this_req = a
        this.connect()
        return !0
      }
      this.clog('send: websocket is null, request is ignored')
      return !1
    }
    return this.send_obj_now(a)
  }
  this.send_obj_now = function (a) {
    this.not_empty(a, 'sess') || (a.sess = this.sess)
    this.not_empty(a, 'io') || (a.io = 'i')
    !this.not_empty(a, 'client_info') && (this.client_info != null && Object.keys(this.client_info).length > 0) && (a.client_info = this.client_info)
    a.obj != 'person' || a.act != 'login' && a.act != 'logout' && a.act != 'register' || (this.sess = '')
    var b = JSON.stringify(a) + '\n'
    this.clog(b)
    this.last_ping = this.getUnixTime()
    this.websocket.send(b)
    this.last_req = a
    return !0
  }
  this.set_state = function (a, b) {
    this.from_state = this.conn_state
    this.conn_state = a
    this.ADVANCED_DEBUG && this.clog('set_state: ' + this.from_state + ' \x3d\x3e ' + this.conn_state)
    b && this.state_changed_handler()
  }
  this.local_response = function () {
    this.last_req != null && (this.clog('local_response: response constructed locally'), this.response = this.last_req, this.last_req = null, this.response.io = 'o', this.response.uerr = 'ERR_CONNECTION_EXCEPTION',
      this.response.ustr = 'connection exception', this.response_received_handler(this.response))
  }
  this.onConnectionOpen = function (a) {
    this.local_response()
    this.this_req != null ? (this.send_obj(this.this_req), this.this_req = null) : this.conn_state == 'CONNECTING_1' ? this.server_info() : this.conn_state == 'CONNECTING_2' ? this.login(!0) : this.conn_state == 'CONNECTING_3' ? this.login(!1) : this.conn_state == 'CONNECTING_4' && this.send_registration()
  }
  this.onConnectionClose = function (a) {
    this.clog(a.data)
    this.websocket != null && (this.websocket.onclose =
      null, this.websocket.onerror = null, this.websocket.onmessage = null)
    this.websocket = null
    this.local_response()
    this.this_req != null && (this.last_req = this.this_req, this.this_req = null)
    window.setTimeout(d(this.connect, this), 2)
  }
  this.onConnectionMessage = function (a) {
    this.last_resp = this.getUnixTime()
    this.last_req = null
    a = a.data.replace(/[\s\r\n]+$/, '').split('\n')
    a.splice(0, 1)
    this.clog(this.pretty('[' + a.join(',') + ']'))
    a = JSON.parse('[' + a.join(',') + ']')
    for (var b = 0, d = a.length; b < d; b++) {
      var c = a[b]
      this.not_empty(c,
        'sess') && (this.sess = c.sess)
      this.not_empty(c, 'sessreset') && c.sessreset == this.sess && this.conn_state == 'IN_SESSION' && this.login(!1)
      if (c.obj != 'server' || c.act != 'ping' && c.act != 'pinw') {
        c.obj == 'server' && c.act == 'info' && (this.server_info = c.server_info, this.conn_state == 'SERVERINFO_REQ' && c.server_info && this.set_state('LOGIN_SCREEN_ENABLED', !0))
        if (c.obj == 'person' && c.act == 'login' || c.obj == 'person' && c.act == 'register') {
          c.user_info && (this.user_info = c.user_info), c.server_info && (this.server_info = c.server_info), this.sess !=
          '' ? (this.conn_state == 'REGISTRATION' && (this.login_name = this.registration.login_name, this.login_passwd = this.registration.login_passwd, this.credential_data = this.registration.credential_data, this.registration = null), this.conn_state == 'INITIAL_LOGIN' || this.conn_state == 'REGISTRATION' ? this.set_state('IN_SESSION', !0) : this.set_state('IN_SESSION', !1)) : (this.registration = this.user_info = null, this.conn_state == 'REGISTRATION' ? this.set_state('LOGIN_SCREEN_ENABLED', !1) : this.set_state('LOGIN_SCREEN_ENABLED', !0))
        }
        c.obj == 'person' && c.act == 'logout' && (this.user_info = null, this.login_passwd = this.login_name = this.sess = '', this.credential_data = null, this.websocket != null && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.onmessage = null, this.websocket.close()), this.websocket = null, this.set_state('LOGIN_SCREEN_ENABLED', !0))
        c.obj == 'sdk' && c.act == 'logreq' && this.sdk_logsend(c.from_pid)
        this.response = c
        this.response_received_handler(c)
      }
    }
  }
  this.onConnectionError = function (a) {
    this.clog(a.data)
    this.websocket != null &&
    (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.onmessage = null)
    this.websocket = null
    this.local_response()
    this.this_req != null ? (this.last_req = this.this_req, this.this_req = null) : this.conn_state != 'CONNECTING_1' && this.conn_state != 'CONNECTING_2' && this.conn_state != 'CONNECTING_3' && this.conn_state != 'CONNECTING_4' || this.set_state(this.from_state, !1)
    window.setTimeout(d(this.connect, this), 2)
  }
  this.connect = function () {
    if (this.conn_state == 'CONNECTING_1' || this.conn_state == 'CONNECTING_2' ||
      this.conn_state == 'CONNECTING_3' || this.conn_state == 'CONNECTING_4' || this.conn_state == 'CONNECTING_5') {
      this.clog('connect: already connecting, connect request is ignored')
    } else {
      if (this.this_req == null) {
        if (this.registration == null && this.login_name == '' && this.credential_data == null && this.conn_state != 'LOGIN_SCREEN_SHOWN') {
          this.sess == '' || this.conn_state == 'SERVERINFO_REQ' || this.conn_state == 'INITIAL_LOGIN' || this.conn_state == 'REGISTRATION' || this.conn_state == 'SESSION_LOGIN' || this.conn_state == 'LOGIN_SCREEN_ENABLED'
            ? this.clog('connect: not yet logged in, log out request is ignored') : this.logout()
          return
        }
        this.clog('connect called, current state:' + this.conn_state)
        this.conn_state == 'LOGIN_SCREEN_SHOWN' || this.conn_state == 'SERVERINFO_REQ' ? this.set_state('CONNECTING_1', !1) : this.conn_state == 'INITIAL_LOGIN' ? this.set_state('CONNECTING_2', !1) : this.conn_state == 'REGISTRATION' ? this.set_state('CONNECTING_4', !1) : this.conn_state != 'IN_SESSION' && this.conn_state != 'SESSION_LOGIN' || this.set_state('CONNECTING_3', !1)
        this.conn_state ==
        'LOGIN_SCREEN_ENABLED' && this.registration == null ? this.set_state('CONNECTING_2', !1) : this.conn_state == 'LOGIN_SCREEN_ENABLED' && this.registration != null && this.set_state('CONNECTING_4', !1)
      }
      this.websocket = new WebSocket(this.wsUri)
      this.websocket.onopen = d(this.onConnectionOpen, this)
      this.websocket.onclose = d(this.onConnectionClose, this)
      this.websocket.onerror = d(this.onConnectionError, this)
      this.websocket.onmessage = d(this.onConnectionMessage, this)
    }
  }
  this.login = function (a) {
    if (this.credential_data != null || this.login_name != '') {
      if (this.credential_data !=
        null || this.login_passwd != '') {
        var b = {
          obj: 'person',
          act: 'login'
        }
        a && (b.sdk_version_webapp = this.version())
        this.credential_data == null ? (b.login_name = this.login_name, b.login_passwd = this.login_passwd) : b.credential_data = this.credential_data
        a && (b.verbose = 1)
        a ? this.set_state('INITIAL_LOGIN', !0) : this.set_state('SESSION_LOGIN', !1)
        this.send_obj_now(b)
      }
    }
  }
  this.logout = function () {
    this.sess != '' && (this.set_state('LOGIN_SCREEN_ENABLED'), this.send_obj_now({
      obj: 'person',
      act: 'logout'
    }))
  }
  this.send_registration =
    function () {
      this.registration != null && (this.login_passwd = this.login_name = this.sess = '', this.credential_data = null, this.registration.obj = 'person', this.registration.act = 'register', this.set_state('REGISTRATION', !0), this.send_obj_now(this.registration))
    }
  this.ping = function () {
    this.send_str('{"obj":"server","act":"pinw"}')
  }
  this.server_info = function () {
    this.set_state('SERVERINFO_REQ', !0)
    this.send_str('{"obj":"server","act":"info"}')
  }
  this.log_strings = []
  this.log_total_len = 0
  this.log_add = function (a) {
    this.log_strings.push(a)
    for (this.log_total_len += a.length; this.log_total_len > 10240;) a = this.log_strings.shift(), this.log_total_len -= a.length
  }
  this.log_extra = function () {
    return ''
  }
  this.sdk_logsend = function (a) {
    this.send_obj({
      obj: 'sdk',
      act: 'logsend',
      to_pid: a,
      version: this.version(),
      data: this.log_strings.join('\n'),
      extra: this.log_extra()
    })
  }
  this.last_ping = 0
  this.websocket = null
  this.from_state = this.conn_state = 'LOGIN_SCREEN_SHOWN'
  this.minder = function () {
    if (this.conn_state == 'IN_SESSION') {
      var a = this.getUnixTime(),
        b = 180
      this.server_info != null &&
      (this.server_info.web_app_ping != null && this.server_info.web_app_ping > 0) && (b = this.server_info.web_app_ping)
      this.last_resp < this.last_ping && a - this.last_ping > this.MAX_RESPONSE_TIME ? (this.local_response(), this.websocket != null && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.onmessage = null, this.websocket.close()), this.websocket = null, window.setTimeout(d(this.connect, this), 2E3)) : a - this.last_ping >= b && (this.clog('connection_minder ping initiated'), this.ping())
    } else {
      this.conn_state ==
      'LOGIN_SCREEN_ENABLED' && (a = this.getUnixTime(), this.last_resp < this.last_ping && (a - this.last_ping > this.MAX_RESPONSE_TIME && this.user_pref.http_like_request_enabled == 'true' && this.last_req != null) && (a = this.last_req, this.last_req = null, this.websocket != null && (this.websocket.onclose = null, this.websocket.onerror = null, this.websocket.onmessage = null, this.websocket.close()), this.websocket = null, this.send_obj(a)))
    }
    window.setTimeout(d(this.minder, this), 1E3 * this.MINDER_TIME)
  }
  window.setTimeout(d(this.minder, this), 1E3 * this.MINDER_TIME)
}
export default APIConnection
