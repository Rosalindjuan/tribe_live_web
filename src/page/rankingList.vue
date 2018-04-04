<template>
  <div class="bg">
    <tab v-model="index01"
         default-color="#333"
         active-color="#ffc800"
         custom-bar-width="11px"
         prevent-default @on-before-index-change="switchTabItem">
      <tab-item selected>周榜</tab-item>
      <tab-item>总榜</tab-item>
    </tab>
    <div class="info">
      <div class="avatar">
        <img :src="currentList[0]['userinfo']['avatar_thumb']" :onerror="defaultImg">
      </div>
      <img src="../assets/images/no_one.png" class="top-level"/>
      <div class="name">
        {{currentList[0]['userinfo']['user_nicename']}}
        <img :src="currentList[0]['userinfo']['sex'] == 1 ? require('../assets/images/man.png') : require('../assets/images/woman.png')" alt="" class="sex">
        <img :src="require('../assets/images/level/' + currentList[0]['userinfo']['level'] + '.png') " alt="" class="level">
      </div>
      <div class="contribute">
        贡献<span class="contribute-nums">{{currentList[0]['total']}}</span>收入
      </div>
    </div>
    <ul class="user-list">
      <li class="user-item" v-for="(item, index) in currentList" :key="index" v-if="index != 0">
        <div class="nums">NO.{{index + 1}}</div>
        <div class="avatar">
          <img :src="avatar_url" :onerror="defaultImg">
        </div>
        <div class="name">
          <span>{{item.userinfo.user_nicename}}</span>
          <img :src="item.userinfo.sex == 1 ? require('../assets/images/man.png') : require('../assets/images/woman.png')" alt="" class="sex">
          <img :src="require('../assets/images/level/' + item.userinfo.level + '.png') " alt="" class="level">
        </div>
        <div class="contribute"><span class="contribute-nums">{{item.total}}</span></div>
      </li>

    </ul>
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'

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
        total: false,
        Week: false,
        defaultImg: 'this.src="' + require('../assets/images/headicon.png') + '"',
      }
    },
    methods: {
      switchTabItem(index) {
        // console.log('on-before-index-change', index)
        switch (index){
          case 0:{
            if(!this.total) {
              this.getDataTotal()
            }
            this.currentList = this.userListWeek
            break
          }
          case 1: {
            if(!this.total) {
              this.getDataTotal()
            }
            this.currentList = this.userListTotal
            break
          }
        }
        this.index01 = index
      },
      getDataTotal() {
        // console.log('getDataTotal')
        let data = [
          {
            userinfo: {
              sex: 1,
              avatar_thumb: '',
              user_nicename: 'rosalind',
              level: 19
            },
            total: 12345
          },
          {
            userinfo: {
              sex: 1,
              avatar_thumb: '',
              user_nicename: 'rosalind2',
              level: 23
            },
            total: 1233
          },
          {
            userinfo: {
              sex: 0,
              avatar_thumb: '',
              user_nicename: 'rosalind3',
              level: 45
            },
            total: 12
          },
        ]
        this.userListTotal = data
        this.total = true
      },
      getDataWeek() {
        let data = [
          {
            userinfo: {
              sex: 0,
              avatar_thumb: '',
              user_nicename: '萌萌',
              level: 12
            },
            total: 78945
          },
          {
            userinfo: {
              sex: 1,
              avatar_thumb: '',
              user_nicename: '萌萌2',
              level: 12
            },
            total: 12345
          },
          {
            userinfo: {
              sex: 0,
              avatar_thumb: '',
              user_nicename: '萌萌3',
              level: 89
            },
            total: 12
          },
        ]
        this.week = true
        this.userListWeek = data
      }
    },
    created() {
      this.getDataWeek()
      this.currentList = this.userListWeek
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bg {
    background: #f8f8f8;
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
