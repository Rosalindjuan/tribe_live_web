export default {
  REWRITE_USERINFO(state,info){
      // console.log('REWRITE_USERINFO',info)
      if(Object.keys(info).length != 0) {
        state.userInfo = info
      }

  },
  REMOVE_USERINFO(state) {
    state.userInfo = null
  }
}
