<template>
  <div class="bg">
    <tab v-model="index01" class=""
         default-color="#333"
         active-color="#ffc800"
         custom-bar-width="11px"
         prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>周榜</tab-item>
      <tab-item>总榜</tab-item>
    </tab>
    <div class="info">
      <div class="avatar">
        <img :src="currentList[0]['avatar']" :onerror="defaultImg">
      </div>
      <img src="../assets/images/no_one.png" class="top-level"/>
      <div class="name">
        {{currentList[0]['nickname']}}
        <img :src="currentList[0]['sex'] == 1 ? require('../assets/images/man.png') : require('../assets/images/woman.png')" alt="" class="sex">
        <img :src="currentList[0]['level_icon']" alt="" class="level">
      </div>
      <div class="contribute">
        贡献<span class="contribute-nums">{{currentList[0]['glamour']}}</span>收入
      </div>
    </div>
    <ul class="user-list">
      <li class="user-item" v-for="(item, index) in currentList" :key="index" v-if="index != 0">
        <div class="nums">NO.{{index + 1}}</div>
        <div class="avatar">
          <img :src="item.avatar" :onerror="defaultImg">
        </div>
        <div class="name">
          <span>{{item.nickname}}</span>
          <img :src="item.sex == 1 ? require('../assets/images/man.png') : require('../assets/images/woman.png')" alt="" class="sex">
          <img :src="item['level_icon']" alt="" class="level">
        </div>
        <div class="contribute"><span class="contribute-nums">{{item.glamour}}</span></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapMutations, mapState} from 'vuex'
  import {Tab, TabItem} from 'vux'
  import {getRankingList} from '@/api'
  import {getSign} from '@/utils/getSign'


  export default {
    components: {
      Tab,
      TabItem
    },
    name: '',
    data() {
      return {
        index01: 0,
        currentList: [],
        avatar_url: '',
        userListWeek:[],
        userListTotal:[],
        defaultImg: 'this.src="' + require('../assets/images/headicon.png') + '"',
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      ...mapMutations(['REWRITE_USERINFO']),
      switchTabItem(index) {
        switch (index){
          case 0:{
            this.currentList = this.userListWeek
            break
          }
          case 1: {
            this.currentList = this.userListTotal
            break
          }
        }
        this.index01 = index
      },
      getData() {
        let param = {
          uid: this.userInfo.uid,
          token: this.userInfo.token
        }
        let sign = getSign(param)
        getRankingList({sign: sign,...param}).then(res => {
          if(!res.errcode){
            this.userListWeek = res.datas.week_ranking
            this.userListTotal = res.datas.ranking
            this.currentList = this.userListWeek
          }
        })
      }
    },
    created() {
      this.REWRITE_USERINFO(this.$route.query)
      this.getData()
    }
  }
</script>

<style lang="less" scoped>
  .bg {
    background: #f8f8f8;
  }
  /*固定*/
  .fixed {
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
    background: #fff;
    z-index: 999;
  }
  .vux-tab-bar-inner {
    border-radius: 3px;
  }

  .vux-tab .vux-tab-item {
    background: transparent;

  }

  .vux-tab-item {
    font-size: 15px;
  }

  .info {
    background: url("../assets/images/top-bg.png") no-repeat;
    background-position: center top;
    background-size: 500px;
    width: 100%;
    text-align: center;
    margin-top: 10px;
    padding-bottom: 20px;
    .avatar {
      height: 210px;
      margin: 0 auto;
      padding-top: 130px;
      padding-left: 13px;
      img {
        margin: 0 auto;
        width: 98px;
        height: 98px;
        border-radius: 50%;
      }
    }
    .top-level {
      width: 140px;
      margin: 0 auto;
      padding-left: 13px;
    }
    .contribute .contribute-nums {
      margin-left: 5px;
      &:before {
        display: none;
      }
    }

  }

  .name {
    font-size: 18px;
    line-height: 25px;
    margin-top: 15px;
    color: #333539;
    img {
      display: inline;
      position: relative;
      top: -2px;
      vertical-align: middle;
      &.sex {
        height: 18px;
      }
      &.level {
        height: 16px;
      }
    }
    span {
      display: block;
      font-size: 14px;
      color: #333539;
    }
  }

  .contribute {
    font-size: 15px;
    background: none;
    padding-right: 0;
    margin-right: 0;
    line-height: 25px;
    color: #333539;

    .contribute-nums {
      color: #f6c636;
      font-size: 16px;
      margin-left: 25px;
      margin-right: 5px;
      position: relative;
      &:before {
        position: absolute;
        content: '';
        display: block;
        height: 25px;
        width: 20px;
        background: url("../assets/images/huandou.png") no-repeat center center;
        background-size: 100%;
      }
    }
  }

  .user-list {
    background: #fff;
    margin-top: 10px;
    padding: 0 20px;
    .user-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      position: relative;
      border-bottom: 1px solid #eee;
      &:last-child {
        border-bottom: 0;
      }
      .nums {
        width: 20%;
      }
      .avatar {
        margin-right: 5px;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      .name {
        margin: 0;
        width: 44%;
      }
      .contribute {
        position: absolute;
        right: 0;
      }
    }
  }

</style>
