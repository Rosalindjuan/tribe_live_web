<template>
  <div>
    <img src="../assets/images/error.jpg">
    <div class="title">
      <p>您的认证没有通过，请
        <router-link to="/apply_certify" class="alink">重新认证</router-link>
      </p>
      <br>
      <br>
      <p>{{reson}}</p>
    </div>
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {authStatus} from '@/api'
  export default {
    name: 'certifyFail',
    data() {
      return {
        reson: ''
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['REWRITE_USERINFO']),
    },
    created(){
      this.REWRITE_USERINFO(this.$route.query)
      let param = {sign: 'dev_sign', uid: this.$route.query.uid,token: this.$route.query.token}
      authStatus(param).then(res=> {
        if(!res.errcode && res.datas.is_auth == 2) {
          this.reson = res.datas.remark
        }
      })      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .title {
    color: #526165;
    font-size: 1.0em;
    text-align: center;
    margin-top: 2%;
  }

  img {
    width: 18%;
    margin: 30% 40% 9%;
  }

  .alink {
    color: #00D8C9;
    text-decoration: underline;
  }
</style>
