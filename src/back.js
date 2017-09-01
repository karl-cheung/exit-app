var u = window.navigator.userAgent
var isWechat = u.indexOf('MicroMessenger') !== -1
var isAlipaly = u.indexOf('AlipayClient') !== -1

window.history.pushState({}, 'title', '#')
window.addEventListener('popstate', function() {
  if (sessionStorage.getItem('back')) {
    if (isWechat) {
      WeixinJSBridge.call('closeWindow')
    } else if (isAlipaly) {
      AlipayJSBridge.call('exitApp')
    }
  } else {
    sessionStorage.setItem('back', true)
  }
}, false)

window.onpageshow = function () {
  setTimeout(function () {
    sessionStorage.setItem('back', true)
  })
}

window.onpagehide = function () {
  sessionStorage.removeItem('back')
}