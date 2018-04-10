import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import action from './action'


Vue.use(Vuex)

// 状态
const state = {
  userInfo: null,
}

export default new Vuex.Store({
  state,
  action,
  mutations
})