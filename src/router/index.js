import Vue from 'vue'
import Router from 'vue-router'
import Protocal from '@/page/Protocal'
import ApplyCertify from '@/page/ApplyCertify'
import Certify from '@/page/Certify'
import CertifySubmit from '@/page/certifySubmit'
import CertifyFail from '@/page/certifyFail'
import RankingList from '@/page/rankingList'
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
      path: '/apply_certify',
      name: 'ApplyCertify',
      component: ApplyCertify,
      meta: {pageTitle: '身份认证'}
    },
    {
      path: '/certify',
      name: 'Certify',
      component: Certify,
      meta: {pageTitle: '申请认证'}
    },
    {
      path: '/certify_submit',
      name: 'CertifySubmit',
      component: CertifySubmit,
      meta: {pageTitle: '提交成功'}
    },
    {
      path: '/certify_fail',
      name: 'CertifyFail',
      component: CertifyFail,
      meta: {pageTitle: '认证失败'}
    },
    {
      path: '/ranking_list',
      name: 'RankingList',
      component: RankingList,
      meta: {pageTitle: '排行榜'}
    }

  ]
})
