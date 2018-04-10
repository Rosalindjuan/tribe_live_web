// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {setWechatTitle} from './utils/setWechatTitle'
import store from './store'


Vue.config.productionTip = false

const FastClick = require('fastclick')
FastClick.attach(document.body)

router.beforeEach((to, from, next) => {
  // 设置标题
  typeof to.meta.pageTitle !== undefined && setWechatTitle(to.meta.pageTitle)
  next()
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
