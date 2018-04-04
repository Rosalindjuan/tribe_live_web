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
  export default {
    name: 'certifyFail',
    data() {
      return {
        reson: '这是失败的原因'
      }
    },
    created(){

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
