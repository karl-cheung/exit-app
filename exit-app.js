/*
 * exit-app v1.0.0
 * (c) 2017 Zhang Yu
 * @license MIT
 */

(function exitApp(window, document) {

  var u = window.navigator.userAgent
  var wx = u.indexOf('MicroMessenger') !== -1
  var ap = u.indexOf('AlipayClient') !== -1

  function ready(callback) {
    if (wx) {
      if (window.WeixinJSBridge) {
        callback && callback()
      } else {
        document.addEventListener('WeixinJSBridgeReady', callback, false)
      }
    } else if (ap) {
      if (window.AlipayJSBridge) {
        callback && callback()
      } else {
        document.addEventListener('AlipayJSBridgeReady', callback, false)
      }
    }
  }

  window.history.pushState({}, 'title', '')
  window.addEventListener('popstate', function() {
    if (window.sessionStorage.getItem('$exitApp')) {
      ready(function() {
        if (wx) {
          WeixinJSBridge.call('closeWindow')
        } else if (ap) {
          AlipayJSBridge.call('exitApp')
        }
      })
    } else {
      window.sessionStorage.setItem('$exitApp', true)
    }
  })

  window.addEventListener('pageshow', function() {
    window.setTimeout(function() {
      window.sessionStorage.setItem('$exitApp', true)
    })
  })

  window.addEventListener('onpagehide', function() {
    window.sessionStorage.removeItem('$exitApp')
  })

}(window, document))
