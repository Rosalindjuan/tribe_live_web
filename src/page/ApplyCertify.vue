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
  export default {
    name: 'ApplyCertify',
    data() {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .apply {
    text-align: center;
    color: #777;
    h2 {
      margin-top: 20%;
      font-size: 44px;
      font-weight: bold;
    }
    span {
      font-weight: bold;
    }
    .desc {
      margin-top: 4%;
      font-size: 32px;
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
      font-size: 26px;
    }
    .tips {
      font-size: 28px;
      margin-top: 3%;
      font-weight: bold;
    }
    .btn {
      display: block;
      color: #fff;
      background-color: #f4a300;
      width: 74%;
      margin: 20% auto 0;
      height: 92px;
      line-height: 92px;
      font-size: 36px;
      text-align: center;
      border-radius: 92px;
      font-weight: bold;
    }
  }
</style>
