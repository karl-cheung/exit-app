# back

> 以下点击返回调用JSBridge接口时，微信客户端或支付宝客户端已注入相应JSAPI

## 微信或支付宝点击返回时关闭页面

```javascript
var u = window.navigator.userAgent
var isWechat = u.indexOf('MicroMessenger') !== -1 // 微信
var isAlipaly = u.indexOf('AlipayClient') !== -1 // 支付宝

window.history.pushState({}, 'title', '#')
window.addEventListener('popstate', function() { // 若使用 on 绑定事件在某些机型不触发事件函数
  if (sessionStorage.getItem('back')) {
    if (isWechat) {
      WeixinJSBridge.call('closeWindow')
    } else if (isAlipaly) {
      AlipayJSBridge.call('exitApp')
    }
  } else {
    sessionStorage.setItem('back', true)
  }
})

window.onpageshow = function () {
  setTimeout(function () { // 修复 ios 平台跳转后再返回触发 popstate 事件时已经设置 sessionStorage 存储,导致直接关闭页面
    sessionStorage.setItem('back', true)
  })
}

window.onpagehide = function () {
  sessionStorage.removeItem('back')
}
```

## 微信ios客户端WKWebview内核点击返回时刷新页面

```javascript
window.onpageshow = function (ev) {
  if (ev.persisted && WeixinJSBridge) {
    window.location.reload()
  }
}
```

> 抑或直接关闭微信页面

```javascript
window.onpageshow = function (ev) {
  if (ev.persisted && WeixinJSBridge) {
    WeixinJSBridge.call('closeWindow')
  }
}
```