<template>
  <div>
    <!--<img src="../assets/images/authstep1.png" alt="" class="box-top">-->
    <div class="cells">
      <div class="cell">
        <div class="cell-hd">真实姓名</div>
        <div class="cell-bd">
          <input type="text" placeholder="请填写您的真实姓名">
        </div>
        <div class="cell-ft"></div>
      </div>
      <div class="cell">
        <div class="cell-hd">真实姓名</div>
        <div class="cell-bd">
          <input type="text" placeholder="请填写您的真实姓名">
        </div>
        <div class="cell-ft"></div>
      </div>
      <div class="cell">
        <div class="cell-hd">真实姓名</div>
        <div class="cell-bd">
          <input type="text" placeholder="请填写您的真实姓名">
        </div>
        <div class="cell-ft"></div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'Certify',
    data () {
      return {

      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .box-top {
    width: 100%;
  }
  .cells {
    margin-top: 0.26666666rem;
    padding-left: 0.213333333rem;
    background-color: #ffffff;
    .cell {
      display: flex;
      /*justify-content: space-between;*/
      align-items: center;
      padding: 0 12px;
      height: 100px;
      font-size: 32px;
      border-top: 1px solid #e0e0e0;
      .cell-bd {

        /*display: flex;*/
        /*align-items: center;*/
      }
      /*.cell-ft {*/
        /*display: flex;*/
        /*align-items: center;*/
        /*img {*/
          /*width: 0.586666666rem;*/
          /*height: 0.586666666rem;*/
        /*}*/
        /*span {*/
          /*color: #000;*/
          /*margin-left: 0.266666666rem;*/
          /*font-size: 26px;*/
        /*}*/
      /*}*/
      /*.cell-right {*/
        /*width: 0.213333333rem;*/
        /*height: 0.373333333rem;*/
        /*margin-right: 0.213333333rem;*/
        /*!*background: url("../../../static/images/arrow.png") no-repeat right center;*!*/
        /*background-size: 0.213333333rem 0.373333333rem;*/
      /*}*/
      &:first-child {
        border-top: none;
      }
    }
  }
</style>
