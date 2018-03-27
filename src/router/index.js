import Vue from 'vue'
import Router from 'vue-router'
import Protocal from '@/page/Protocal'
import ApplyCertify from '@/page/ApplyCertify'
import Certify from '@/page/Certify'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/protocal',
      name: 'Protocal',
      component: Protocal,
      meta: {pageTitle: '直播协议'}
    },
    {
      path: '/',
      name: 'ApplyCertify',
      component: ApplyCertify,
      meta: {pageTitle: '身份认证'}
    },
    {
      path: '/certify',
      name: 'Certify',
      component: Certify,
      meta: {pageTitle: '申请认证'}
    }
  ]
})
