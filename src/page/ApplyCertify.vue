<template>
  <div class="apply">
    <h2>亲爱的用户</h2>
    <div class="margin-top28 desc">收到付费礼物可领取劳务费</div>
    <div class="desc">为保证<span class="color-red">资金安全</span></div>
    <div class="desc">开播前请通过<span class="color-red">身份认证</span>绑定账户</div>
    <div class="desc">通过认证可以获得更好的体验</div>
    <router-link to="/certify" class="btn">身份认证</router-link>
    <div class="tips">认证即同意 <router-link to="/protocal" class="protocal">主播协议</router-link></div>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  export default {
    name: 'ApplyCertify',
    data() {
      return {}
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['REWRITE_USERINFO']),
    },
    created(){
      this.REWRITE_USERINFO(this.$route.query)
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .apply {
    text-align: center;
    color: #777;
    /*position: absolute;*/
    /*width: 100%;*/
    /*height: 100%;*/
    background: #fff;

    h2 {
      padding-top: 20%;
      font-size: 22px;
      font-weight: bold;
    }
    span {
      font-weight: bold;
    }
    .desc {
      margin-top: 4%;
      font-size: 16px;
      font-weight: bold;
    }
    .margin-top28 {
      margin-top: 28%;
    }
    .color-red {
      color: #f00;
    }
    .protocal {
      color: #ffd350;
      font-size: 13px;
    }
    .tips {
      font-size: 14px;
      margin-top: 3%;
      font-weight: bold;
    }
    .btn {
      display: block;
      color: #fff;
      background-color: #f4a300;
      width: 74%;
      margin: 20% auto 0;
      height: 46px;
      line-height: 46px;
      font-size: 18px;
      text-align: center;
      border-radius: 46px;
      font-weight: bold;
    }
  }
</style>
