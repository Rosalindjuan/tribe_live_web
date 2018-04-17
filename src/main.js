// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {setWechatTitle} from './utils/setWechatTitle'
import store from './store'
import {authStatus} from '@/api'
import {getSign} from '@/utils/getSign'


Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

router.beforeEach((to, from, next) => {
  // 设置标题
  typeof to.meta.pageTitle !== undefined && setWechatTitle(to.meta.pageTitle)

  if(to.path === '/apply_certify' && to.query.uid) {
    let param = {uid: to.query.uid, token: to.query.token}
    store.commit('REWRITE_USERINFO',to.query)
    let sign = getSign(param)
    authStatus({sign: sign, ...param}).then(res => {
      if (!res.errcode) {
        switch (res.datas.is_auth){
          case '-1': case '1': {
            next()
            break
          }
          case '0': {
            next('/certify_submit')
            break
          }
          case '2': {
            next('/certify_fail')
            break
          }
        }
      } else {
        next()
      }
    })
  }
  else {
    next()
  }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
