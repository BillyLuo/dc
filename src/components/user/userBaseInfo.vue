<template>
  <div class="wrapper">
    <div class="account">
      <Row>
        <Col span="1"></Col>
        <Col span="11" :style="{borderRight:'1px solid #414448'}">
        <div class="user-info clear">
          <div class="user-portrait">

          </div>
          <div class="user-info-right float-left">
            <div class="user-name">
              <span>{{userinfo.mobile ? userinfo.mobile.slice(0,3)+'****'+userinfo.mobile.slice(-4) : userinfo.email }}</span>
              <span v-if="userinfo.identityset == '1'" class="user-verification">个人认证</span>
            </div>
            <div class="user-contact">
              <span :style="{fontSize:'14px'}" class="user-id">UID:{{userinfo.uid}}</span>
              <!-- <span class="user-tel">{{formatTel}}</span> -->
            </div>
          </div>
        </div>
        </Col>
        <Col span="11">
        <div class="total-assets text-center">
          <div>
            <p :style="{color:'#cdcdcd','font-size':'14px','line-height':'1.5em'}">预估总资产</p>
            <div class="color-white"  :style="{fontSize:'20px'}">
              <span>{{estimateassets}}</span><span class="asset-count"> / USDT</span>
            </div>
          </div>
        </div>
        </Col>
        <Col span="1"></Col>
        <!-- <Col span="8">
        <div class="safe-settings">
          <div>您已设置<a href="javascript:;">{{userinfo.validationAmount}}</a>个保护项，还有<a href="javascript:;">{{6 - userinfo.validationAmount}}</a>个可以设置</div>
          <div class="set-safe">
            <Button class="primary-border primary-color" type="ghost" @click="protect">保护项设置</Button>
          </div>
        </div>
        </Col> -->
      </Row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import bus from '../../bus/bus';
export default {
  data() {
    return {
      estimateassets:""
    };
  },
  computed: {
    formatTel() {
      console.log(this.userinfo, "computed---userinfo");
      if (this.userinfo && this.userinfo.mobile) {
        return (
          this.userinfo.mobile.slice(0, 4) +
          "****" +
          this.userinfo.mobile.slice(-4)
        );
      }
    },
    ...mapState({
      userinfo: state => {
        var amount = 0;
        if (state.userinfo.emailset ==1) {
          amount += 1;
        }
        if (state.userinfo.identityset ==1) {
          amount += 1;
        }
        if (state.userinfo.mobileset==1) {
          amount += 1;
        }
        if (state.userinfo.googlecodeset ==1 ) {
          amount += 1;
        }
        if (state.userinfo.loginpasswordset == 1) {
          amount += 1;
        }
        if (state.userinfo.tradepasswordset == 1) {
          amount += 1;
        }
        console.log('sjfldjf',{
          username: state.userinfo.username,
          uid: state.userinfo.uid,
          mobile: state.userinfo.mobile,
          estimatedfund: state.userinfo.estimatedfund,
          validationAmount: amount,
          identityset:state.userinfo.identityset
        });
        var username = state.userinfo.username;
        if (!username || username == 'null') {
          username = state.userinfo.email ? state.userinfo.email : '';
        }
        return {
          username,
          uid: state.userinfo.uid,
          mobile: state.userinfo.mobile,
          estimatedfund: state.userinfo.estimatedfund,
          validationAmount: amount,
          identityset:state.userinfo.identityset
        };
      }
    })
  },
  mounted() {
    let that =this;
    this.$ajax({
      method:"post",
      url:"/trade/tps/pbesa.do",
      data:{
        reqresource:1
      }
    }).then((res)=>{
      console.log('000000',res)
      if(res.data && res.data.sumAmount){
        that.estimateassets = res.data.sumAmount
      }else{
        that.$Notice.warning({
          title:'提示',
          desc:'预估总资产查询出错，请稍后重试'
        })
      }
    }).catch((err)=>{
      that.$Notice.warning({
        title:'提示',
        desc:'预估总资产查询出错，请稍后重试'
      })
    })
    // bus.$on('certify',(value) => {
    //   console.log('******************',value);
    //   if (value) {
    //     this.isCertified = true;
    //   }
    // })
  },
  methods: {
    protect() {
      if (this.userinfo.identityset != '1') {
        this.$Notice.warning({
          title:'提示',
          desc:'请先完成实名认证'
        })
        return false;
      }
      bus.$emit('changeSettingMenu','safesettings');
      this.$router.push({
        path: "/user/safesettings"
      });
    },
    
  }
};
</script>

<style lang="scss">
.account {
  padding: 20px 20px;
  margin-bottom: 20px;
  background: #222222;
  .ivu-row {
    .ivu-col:not(:last-of-type) {
      height: 80px;
      padding: 0 20px;
    }
  }
  .user-name {
    font-size: 20px;
  }
  .user-portrait {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-image: url('/static/img/portrait.png');
    background-repeat: no-repeat;
    background-size: 60px;
    background-position: center;
    float: left;
    margin-right: 20px;
    background-color:#545454;
    border:1px solid #787878;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
  }
}
.user-verification {
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 12px;
  background: #4CB2F9;
  margin-left: 10px;
}
.user-info-right {
  padding: 10px 0;
  width: 260px;
  color:#fff;
  & > div {
    height: 30px;
    line-height: 30px;
  }
  .user-id {
    // color: #3166d2;
    margin-right: 20px;
  }
}

.total-assets {
  width: 90%;
  margin: 0 auto;
  padding: 20px 0;
}

.safe-settings {
  text-align: center;
  background: #353535;
  .set-safe {
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
