<template>
  <div id="certify-success">
    <group>
        <cell title="真实姓名" :value="value1" value-align="left"></cell>
        <cell title="手机号码" value="value" value-align="left"></cell>
        <cell title="银行卡号" value="value" value-align="left"></cell>
        <cell title="开户银行" value="value" value-align="left"></cell>
        <cell title="开户地" value="value" value-align="left"></cell>
        <cell title="支行名称" value="value" value-align="left"></cell>
        <cell title="证件类型" value="value" value-align="left"></cell>
        <cell title="证件号" value="value" value-align="left"></cell>
      </group>
      <div class="resident clearfix">
        <img :src="front_view" alt="">
        <img :src="back_view" alt="">
        <img :src="handset_view" alt="">
      </div>  
  </div>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import {Group, Cell} from 'vux'
// import {authStatus} from '@/api'
  export default {
    name: 'CertifySuccess',
    components: {
      Group,
      Cell
    },
    data() {
      return {
        value1: '渣电脑房',
        front_view: 'http://p06blazdg.bkt.clouddn.com/20180409170919_a7fca6ecd0a4e455fabe795c1f500c8c',
        back_view:'http://p06blazdg.bkt.clouddn.com/20180409170919_a7fca6ecd0a4e455fabe795c1f500c8c',
        handset_view: 'http://p06blazdg.bkt.clouddn.com/20180409170919_a7fca6ecd0a4e455fabe795c1f500c8c'
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
      // authStatus(param).then(res=> {
      //   if(!res.errcode && res.datas.is_auth == 2) {
      //     this.reson = res.datas.remark
      //   }
      // })      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.resident{
  margin-top: 24px;
  img{width: 30%;margin-left: 2.5%;float: left;}
} 
</style>
