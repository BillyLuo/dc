<template>
  <div class="real-certification">
    <div v-if="level >= 1">
      <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-1"></i>
        </div>
        <div class="certification-text float-left">
          <h3>您的账号已通过实名认证</h3>
          <!-- <p>
            您实名认证以后，您的账户<span>每天最多可累计提现2BTC。如您想提升现有额度，请完成C2级别认证，以获得更高级别的资金权限。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p> -->
          <p style="padding:30px 0px;">您已经通过实名认证，我们会严格保密您的身份信息，不会向任何第三方透露。</p>
        </div>
      </div>
      <!-- <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-2"></i>
        </div>
        <div class="certification-text float-left">
          <h3 v-if="level<2">您尚未进行<a href="javascript:;" @click="vertifyID">C2身份认证</a></h3>
          <h3 v-else>您的账号已通过C2身份认证</h3>
          <p>
            您C2认证以后，您的账户<span>每天最多可累计提现50BTC。如您想提升现有额度，请完成C3级别认证，以获得更高级别的资金权限。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p>
        </div>
      </div>
      <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-3"></i>
        </div>
        <div class="certification-text float-left">
          <h3 v-if="level<3">如需更大权限，请添加<a @click="()=>{this.C3modal = true;}">客服QQ</a></h3>
          <h3 v-else>您的账号已通过C3身份认证</h3>
          <p>
            您C3认证以后，您的账户<span>每天最多可累计提现200BTC。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p>
        </div>
      </div> -->
    </div>
    <div v-if="level == 0">
      <nameCertification v-on:levelChange="levelChange"/>
    </div>
    <Modal 
      v-model="showIDModal"
      title="C2身份认证"
      width="900px"
    >
      <div class="modal-inner clear">
        <div class="float-left"></div>
        <div class="float-right">
          <div class="upload-wrapper">
            <p style="padding-bottom: 30px;">1. 身份证为jpg/png格式图片 2. 上传的图片每张不超过1M</p>
            <Row>
              <Col span="7">
                <Upload
                  multiple
                  :before-upload="beforeUpload.bind(this,1)"
                  type="drag"
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div>
                      <div style="padding: 20px 0">
                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                        <p>身份证正面</p>
                      </div>
                      <div :class="{'photo-wrapper':true,active:photos.photo1.length>0?true:false}">
                        <img :src="photos.photo1" alt="">
                      </div>
                  </div>
                </Upload>
              </Col>
              <Col span="1"> </Col>
              <Col span="7">
                <Upload
                  multiple
                  type="drag"
                  :before-upload="beforeUpload.bind(this,2)"
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div>
                      <div style="padding: 20px 0;">
                          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                          <p>身份证反面</p>
                      </div>
                      <div :class="{'photo-wrapper':true,active:photos.photo2.length>0?true:false}">
                        <img :src="photos.photo2" alt="">
                      </div>
                  </div>
                </Upload>
              </Col>
              <Col span="1"> </Col>
              <Col span="7">
                <Upload
                  multiple
                  type="drag"
                  :before-upload="beforeUpload.bind(this,3)"
                  action="//jsonplaceholder.typicode.com/posts/">
                  <div>
                    <div style="padding: 20px 0">
                      <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                      <p>手持身份证</p>
                    </div>
                    <div :class="{'photo-wrapper':true,active:photos.photo3.length>0?true:false}">
                        <img :src="photos.photo3" alt="">
                      </div>
                  </div>
                </Upload>
              </Col>
            </Row>
            <div style="padding: 30px;">
              <Radio v-model="confirmInfo">我保证提交的信息实属本人所有，非盗用他人证件</Radio>
              <Button type="primary" size="large" style="width: 150px;" @click="submitPhoto">确认提交</Button>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        
      </div>
    </Modal>
    <Modal
      title="C3身份认证"
      v-model="C3modal"
    >
      <div class="customer-service">
        客服QQ：<span style="color: #3166D2;">787010288</span>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import nameCertification from './nameCertification';
import cookies from 'cookies-js';
import { Upload } from 'iview';
export default {
  components:{
    nameCertification,
    Upload
  },
  data () {
    return {
      level:0,
      photos:{
        photo1:'',
        photo2:'',
        photo3:''
      },
      showIDModal:false,//上传照片modal
      C3modal: false,
      confirmInfo:false  //是否确定协议
    }
  },
  mounted(){
    if (cookies.get('name')) {
      this.getUserinfo();
    }
  },
  updated() {

  },
  methods:{
    getUserinfo(){
      this.$Spin.show();
      this.$ajax.post("/trade/tps/pblbi.do",{
        reqresource:1
      })
      .then(res => {
        this.$Spin.hide();
        if (res.data && res.data.emailset != undefined) {
          if (res.data.identityset == '1') {
            this.level = 1;
          }
        } else {
          console.log('没有获取到相应的用户信息');
        }
      })
      .catch(err => {
        this.$Spin.hide();
        console.log("获取用户认证信息出错", err);
      });
    },
    levelChange(value) {
      console.log('-----level---change',value);
      if (value.level.toFixed) {
        this.level = value.level;
      }
    },
    vertifyID () {
      this.showIDModal = true;
    },
    submitPhoto() {
      this.showIDModal = false;
      this.level = 2;
    },
    beforeUpload(index,photo) {
      console.log('before',index,'file---',photo);
      var file = photo;
      var that = this;
      if (typeof (FileReader) === 'undefined') {
        console.log(this);
        this.$Notice.warning({
          title:'温馨提示',
          desc:'您的浏览器有点旧，建议现代浏览器。'
        })
      } 
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
      var base64Code=this.result;
        //把得到的base64赋值到img标签显示
        that.photos['photo'+index] = base64Code;
     }
    }
  }
}
</script>

<style lang="scss" scoped>
  .real-certification {
    padding: 20px;
  }
  .certification-item {
    margin-bottom: 40px;
  }
  .icon-card {
    display: block;
    width: 90px;
    height: 90px;
    position: relative;
    border-radius: 50%;
    &.icon-1::after {
      background-position: 0 0;
      background-color: #66B2CC;
      box-shadow: 0 7px 29px rgba(102,178,204,.3);
    }
    &.icon-2::after{
      background-position: 0 -90px;
      background-color: #098EAF;
      box-shadow: 0 7px 29px rgba(9,142,175,.3);
    }
    &.icon-3::after {
      background-position: 0 -180px;
      background-color: #A5CB37;
      box-shadow: 0 7px 29px rgba(165,203,55,.3);
    }
  }
  .icon-card::after {
    content:'';
    position: absolute;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-image: url(/static/img/icons/icon-card.png);
    background-size: 100% auto;
    border-radius: 50%;
  }
  .certification-text {
    width: 90%;
    padding-left: 30px;
    h3 {
      font-size: 18px;
      font-weight: 400;
      color: #333;
      margin-bottom: 10px;
      a {
        color: #3166D2;
      }
    }
    p {
      color: #999;
      font-size: 12px;
      line-height: 1.5em;
      span {
        color: #f00;
      }
    }
  }
  .modal-inner .float-left {
    width: 200px;
    height: 200px;
    margin: 60px 10px 0 30px;
    background-image: url(/static/img/upload-img.png);
    background-size: 100%;
  }
  .modal-inner .float-right {
    width: 600px;
  }
  .upload-wrapper {
    margin: 40px 0;
    padding: 0 30px;
    .ivu-col-span-1 {
      height: 100px;
    }
  }
  .photo-wrapper {
    position: absolute;
    top:0;
    left:0;
    right: 0;
    bottom: 0;
    margin: auto;
    &.active {
      background: #fff;
    }
    img {
      width: 100%;
      display: inline-block;
      vertical-align: middle;
    }
  }
  .customer-service {
    font-size: 16px;
    text-align: center;
    padding: 10px 0;
    color: #666;
    span {
      cursor: default;
    }
  }
</style>
