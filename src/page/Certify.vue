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
            <img :src="uploadPicList[0].cardImg" alt="">
            <input name="file" type="file" accept="image/png,image/jpeg" @change="uploadImg($event, 0)"/>
            <div class="uploading" v-if="uploadPicList[0].imgUp1">
              <p>正在上传</p>
              <x-progress :percent="uploadPicList[0].percent" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="uploadPicList[0].imgUp2">
              <img src="../assets/images/success.svg" alt="" class="icon">
              <p>上传成功</p>
            </div>
          </div>
          <div class="upload">
            <img :src="uploadPicList[1].cardImg" alt="">
            <input type="file" accept="image/*" @change="uploadImg($event, 1)">
            <div class="uploading" v-if="uploadPicList[1].imgUp1">
              <p>正在上传</p>
              <x-progress :percent="uploadPicList[1].percent" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="uploadPicList[1].imgUp2">
              <img src="../assets/images/success.svg" alt="" class="icon">
              <p>上传成功</p>
            </div>
          </div>
          <div class="upload">
            <img :src="uploadPicList[2].cardImg" alt="">
            <input type="file" accept="image/*" @change="uploadImg($event, 2)">
            <div class="uploading" v-if="uploadPicList[2].imgUp1">
              <p>正在上传</p>
              <x-progress :percent="uploadPicList[2].percent" :show-cancel="false"></x-progress>
            </div>
            <div class="uploaded" v-if="uploadPicList[2].imgUp2">
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
  import {mapMutations, mapState} from 'vuex'
  import {Group, CellBox, XInput, XAddress, ChinaAddressData, PopupPicker, Toast, XProgress} from 'vux'
  import {authApply,uploadImg} from '@/api'
import { setTimeout, setInterval } from 'timers';
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
        realName: '', // 真是姓名
        tel: '', // 手机号码
        bankCode: '', // 银行卡号
        toastShow: false,
        toastText: '',
        addressData: ChinaAddressData,
        addressValue: [], // 银行地址
        list: [['中国银行', '北京银行', '建设银行', '中国工商银行', '中国农业银行', '中信银行', '民生银行', '中国交通银行',
          '中国邮政储蓄银行', '招商银行', '中国光大银行', '兴业银行', '其他']],
        bank: [], // 银行
        subBranch: '', // 支行
        cardList: [['身份证', '港澳居民来往内地通行证', '香港、澳门身份证', '台胞证', '护照']],
        cardValue: [],  // 证件类型
        identityValue: '', // 证件号
        nextStep: false,  // 下一步
        stepUrl: require('../assets/images/authstep1.png'), // 步骤条切换
        uploadPicList:[
          {percent: 0,cardImg:require('../assets/images/auth_face.png'),imgUp1:false,imgUp2: false,image_url: '',timer: null},
          {percent: 0,cardImg:require('../assets/images/auth_back.png'),imgUp1:false,imgUp2: false,image_url: '',timer: null},
          {percent: 0,cardImg:require('../assets/images/auth_handle.png'),imgUp1:false,imgUp2: false,image_url: '',timer: null},
        ], // cardImg和cardImgList是关联一起的，数组下标一致
        cardImgList: [
          require('../assets/images/identity_face.jpg'),
          require('../assets/images/identity_back.jpg'),
          require('../assets/images/identity_handle.jpg')
        ]
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      // 姓名
      checkName() {
        var regRealName = /^(?=.*\d.*\b)/;
        if (this.realName && !regRealName.test(this.realName)) {
          return true
        } else {
          this.toastText = '请正确填写真实姓名'
          this.toastShow = true
          return false
        }

      },
      // 电话号码
      checkTel() {
        var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (this.tel && regPhone.test(this.tel)) {
          return true
        } else {
          this.toastText = '请正确输入手机号码'
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
      // 下一步
      onNextStep() {
        if (this.checkName() && this.checkTel() && this.checkBankCode() && this.checkOther()) {
        this.nextStep = true
        this.stepUrl = require('../assets/images/authstep2.png')
        }
      },
      // 证件类型 
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
      // 图片上传的进度条
      progressBar(type){
        this.uploadPicList[type].percent = 0
        clearInterval(this.uploadPicList[type].timer)
        this.uploadPicList[type].timer = setInterval(() => {
          this.uploadPicList[type].percent += 1
          if (this.uploadPicList[type].percent >= 100) {
            clearInterval(this.uploadPicList[type].timer)
          }
        },10)
      },
      // 图片上传
      uploadImg(e, type) {
        if (e.target.files.length > 0) {
          // 文件上传
          let file = e.target.files[0]
          let param = new FormData()  // 创建form对象
          param.append('file', file)  // 通过append向form对象添加数据
          param.append('sign', 'dev_sign') // 添加form表单中其他数据
          this.uploadPicList[type].imgUp1 = true
          this.uploadPicList[type].imgUp2 = false
          this.uploadPicList[type].cardImg = this.cardImgList[type]
          this.progressBar(type)
          uploadImg(param).then(res => {
            if(!res.errcode) {
              // console.log('da',res.datas.domain + res.datas.image)
              this.uploadPicList[type].percent = 0
              this.uploadPicList[type].imgUp1 = false
              this.uploadPicList[type].imgUp2 = true
              this.uploadPicList[type].image_url = res.datas.domain + res.datas.image
              clearInterval(this.uploadPicList[type].timer)
            }
          })
        }
      },
      onSubmit() {
        if (this.checkIdentity() && this.uploadPicList[0].imgUp2 && this.uploadPicList[1].imgUp2 && this.uploadPicList[2].imgUp2 ) {
          let param = {
            sign: 'dev_sign',
            uid: this.userInfo.uid,
            token: this.userInfo.token,
            true_name: this.realName,
            mobile: this.tel,
            credit_card: this.bankCode,
            bank_deposit: this.bank[0],
            account_opening: this.addressValue[0] + this.addressValue[1],
            bank_branch: this.subBranch,
            is_type: this.cardList[0].indexOf(this.cardValue[0]),
            id_number: this.identityValue,
            id_image: this.uploadPicList[0].image_url,
            id_rev_image: this.uploadPicList[1].image_url,
            id_full_image: this.uploadPicList[2].image_url
          }
          authApply(param).then(res => {
            if(!res.errcode) {
              this.$router.push('/certify_submit')
            }else {
              this.toastText = res.message
              this.toastShow = true
            }
          })
        }
      }
    },
    created() {
      // console.log(this.userInfo)
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
