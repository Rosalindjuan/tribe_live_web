<template>
  <div class="bg">
    <div class="img-step-box">
      <img :src="stepUrl" alt="" class="box-top">
    </div>
    <div class="content1" v-if="!nextStep">
      <group>
        <x-input title="真实姓名" placeholder="请填写您的真实姓名" v-model="realName"></x-input>
        <x-input title="手机号码" placeholder="请填写您的手机号" v-model="tel"></x-input>
        <x-input title="银行卡号" placeholder="请填写您的银行卡号" v-model="bankCode"></x-input>
        <popup-picker title="开户银行" placeholder="请填写开户银行"
                      :data="list" v-model="bank">
        </popup-picker>
        <x-address title="开户地" placeholder="请选择地址"
                   hide-district v-model="addressValue"
                   raw-value :list="addressData"></x-address>
        <x-input title="支行名称" placeholder="请填写您的支行名称" v-model="subBranch"></x-input>
      </group>
      <div class="btn" @click="onNextStep">下一步</div>
    </div>
    <div class="content2" v-if="nextStep">
      <div class="bg-white">
        <group>
          <cell-box class="warning">以下信息均为必填项，为保证您的利益，请如实填写</cell-box>
          <popup-picker class="card" title="证件类型"
                        :data="cardList" v-model="cardValue"></popup-picker>
          <x-input title="证件号码" placeholder="请填写您的证件号码" v-model="identityValue"></x-input>
        </group>
        <div class="resident clearfix">
          <div class="upload">
            <img :src="cardImg1" alt="">
            <input type="file" accept="image/*" @change="uploadImg($event, 'cardImg1')">
            <div class="uploading" v-if="imgUp1">
              <p>正在上传</p>
              <x-progress :percent="percent1" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="imgUp11">
              <img src="../assets/images/success.svg" alt="" class="icon">
              <p>上传成功</p>
            </div>
          </div>
          <div class="upload">
            <img :src="cardImg2" alt="">
            <input type="file" accept="image/*" @change="uploadImg($event, 'cardImg2')">
            <div class="uploading" v-if="imgUp2">
              <p>正在上传</p>
              <x-progress :percent="percent2" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="imgUp22">
              <img src="../assets/images/success.svg" alt="" class="icon">
              <p>上传成功</p>
            </div>
          </div>
          <div class="upload">
            <img :src="cardImg3" alt="">
            <input type="file" accept="image/*" @change="uploadImg($event, 'cardImg3')">
            <div class="uploading" v-if="imgUp3">
              <p>正在上传</p>
              <x-progress :percent="percent3" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="imgUp33">
              <img src="../assets/images/success.svg" alt="" class="icon">
              <p>上传成功</p>
            </div>
          </div>
        </div>
        <div class="example">
          <p>手持身份证实例:</p>
          <img src="../assets/images/id_handle.png" id="example">
        </div>
      </div>
      <div class="btn submit" @click="onSubmit">提交认证</div>
    </div>
    <toast v-model="toastShow" width="auto" type="text">{{toastText}}</toast>
  </div>
</template>

<script>
  import {Group, CellBox, XInput, XAddress, ChinaAddressData, PopupPicker, Toast, XProgress} from 'vux'

  export default {
    name: 'Certify',
    components: {
      Group,
      CellBox,
      XInput,
      XAddress,
      PopupPicker,
      Toast,
      XProgress
    },
    data() {
      return {
        realName: '',
        tel: '',
        bankCode: '',
        toastShow: false,
        toastText: '',
        addressData: ChinaAddressData,
        addressValue: [],
        list: [['中国银行', '北京银行', '建设银行', '中国工商银行', '中国农业银行', '中信银行', '民生银行', '中国交通银行',
          '中国邮政储蓄银行', '招商银行', '中国光大银行', '兴业银行', '其他']],
        bank: [],
        subBranch: '',


        cardList: [['身份证', '港澳居民来往内地通行证', '香港、澳门身份证', '台胞证', '护照']],
        cardValue: [],
        identityValue: '',
        nextStep: true,
        stepUrl: require('../assets/images/authstep1.png'),

        percent1: 0,
        percent2: 0,
        percent3: 0,
        cardImg1: require('../assets/images/auth_face.png'),
        imgUp1: false,
        imgUp11: false,
        imgUp2: false,
        imgUp22: false,
        imgUp3: false,
        imgUp33: false,
        cardImg2: require('../assets/images/auth_back.png'),
        cardImg3: require('../assets/images/auth_handle.png'),
      }
    },
    methods: {
      // 姓名
      checkName() {
        var regRealName = /^(?=.*\d.*\b)/;
        if (this.realName && !regRealName.test(this.realName)) {
          console.log('yes')
          return true
        } else {
          this.toastText = '请正确填写真实姓名'
          this.toastShow = true
          console.log('no')
          return false
        }

      },
      // 电话号码
      checkTel() {
        var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        console.log('tel')
        if (this.tel && regPhone.test(this.tel)) {
          return true
        } else {
          this.toastText = '请正确输入手机号码'
          console.log(this.toastText)
          this.toastShow = true
          return false
        }
      },
      // 银行卡号
      checkBankCode() {
        var regBankCode = /^(\d{15}|\d{16}|\d{17}|\d{18}|\d{19}|\d{20}|\d{21})$/;
        if (this.bankCode && regBankCode.test(this.bankCode)) {
          return true
        } else {
          this.toastText = '请正确输入银行卡号'
          this.toastShow = true
          return false
        }
      },
      // 其他 第一步
      checkOther() {
        if (this.bank.length <= 0) {
          this.toastText = '请选择开户银行'
          this.toastShow = true
          return false
        } else if (this.addressValue.length < 2) {
          this.toastText = '请选择开户地'
          this.toastShow = true
          return false
        } else if (!this.subBranch) {
          this.toastText = '请输入支行名称'
          this.toastShow = true
          return false
        }
        return true
      },
      onNextStep() {
        // if (this.checkName() && this.checkTel() && this.checkBankCode() && this.checkOther()) {
        this.nextStep = true
        this.stepUrl = require('../assets/images/authstep2.png')
        console.log('res')
        // }
        console.log('ads', this.toastText)
      },
      checkIdentity() {
        var reg_identity = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
        if (this.cardValue.length < 1) {
          this.toastText = '请选择您的证件类型'
          this.toastShow = true
          return false
        }
        if (this.cardValue[0] == '身份证') {
          if (!this.identityValue || !reg_identity.test(this.identityValue)) {
            this.toastText = '请正确填写身份证号'
            this.toastShow = true
            return false
          }
          return true
        } else {
          if (!this.identityValue || this.identityValue.length < 6) {
            this.toastText = '请正确填写证件号'
            this.toastShow = true
            return false
          }
          return true
        }
      },
      setProgressBar(type) {
        switch (type) {
          case 'cardImg1': {
            var timer = setInterval(() => {
              this.percent1 += 1
              if (this.percent1 >= 100) {
                clearInterval(timer)
                this.percent1 = 0;
                this.imgUp11 = true
                this.imgUp1 = false
              }
            }, 10)
            break
          }
          case 'cardImg2': {
            var timer = setInterval(() => {
              this.percent2 += 1
              if (this.percent2 >= 100) {
                clearInterval(timer)
                this.percent2 = 0;
                this.imgUp22 = true
                this.imgUp2 = false
              }
            }, 10)
            break
          }
          case 'cardImg3': {
            var timer = setInterval(() => {
              this.percent3 += 1
              if (this.percent3 >= 100) {
                clearInterval(timer)
                this.percent3 = 0;
                this.imgUp33 = true
                this.imgUp3 = false
              }
            }, 10)
            break
          }
        }

      },
      uploadImg(e, type) {
        if (e.target.files.length > 0) {
          console.log('upload',)
          switch (type) {
            case 'cardImg1': {
              this.cardImg1 = require('../assets/images/identity_face.jpg')
              this.imgUp1 = true
              this.imgUp11 = false

              break
            }
            case 'cardImg2': {
              this.cardImg2 = require('../assets/images/identity_back.jpg')
              this.imgUp2 = true
              this.imgUp22 = false
              break
            }
            case 'cardImg3': {
              this.cardImg3 = require('../assets/images/identity_handle.jpg')
              this.imgUp3 = true
              this.imgUp33 = false
              break
            }
          }
          this.setProgressBar(type)
        }

      },
      onSubmit() {
        if (this.checkIdentity() && this.imgUp11 && this.imgUp22 && this.imgUp33 ) {
          this.$router.push('/certify_submit')
        }
      }
    },
    created() {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .img-step-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
  }

  .box-top {
    width: 94%;
  }

  .btn {
    background-color: #ffd350;
    line-height: 50px;
    width: 96%;
    margin: 12% auto 0;
    color: #fff;
    font-size: 18px;
    border-radius: 5px;
    text-align: center;
  }

  .content2 {
    .bg-white {
      background: #fff;
      .card {
        width: 100%;
        overflow: hidden;
      }
      .resident {
        padding: 24px 12px;
        .upload {
          width: 30%;
          float: left;
          margin-left: 2.5%;
          position: relative;
          input {
            width: 100%;
            height: 100%;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            opacity: 0;
            z-index: 10;
          }
        }
        img {
          width: 100%;
        }
      }
      #example {
        width: 70%;
        margin: 6% 5% 0 20%;
      }
      .example {
        padding: 0 12px 32px;
      }
      .example p {
        font-size: 16px;
        color: #333536;

      }
    }
    .warning {
      padding: 0 12px;
      line-height: 30px;
      font-size: 12px;
      color: #7c7c7c;
    }

    .uploading, .uploaded {
      position: absolute;
      top: 0;
      left: 5%;
      width: 90%;
      text-align: center;

    }
    .uploading {
      /*display: none;*/
      p {
        margin: 10px 0;
      }
    }
    .uploaded {
      color: #6bd794;
      /*display: none;*/
      .icon {
        width: 28px;
        height: 28px;
        margin-top: 10px;
      }
    }
  }
</style>
