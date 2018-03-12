<template>
  <div class="wrapper">
    <div class="account bg-white">
      <Row>
        <Col span="8">
        <div class="user-info clear">
          <img class="user-portrait" src="/static/img/portrait.jpg" alt="portrait">
          <div class="user-info-right float-left">
            <div class="user-name">
              <span>{{userinfo.username}}</span>
              <span class="user-vip">VIP</span>
            </div>
            <div class="user-contact">
              <span class="user-id">UID:{{userinfo.uid}}</span>
              <span class="user-tel">{{formatTel}}</span>
            </div>
          </div>
        </div>
        </Col>
        <Col span="8">
        <div class="total-assets text-center">
          <span>预估总资产 <span class="primary-color">{{userinfo.estimatedfund}}</span><span class="primary-color"> / CNYT</span></span>
        </div>
        </Col>
        <Col span="8">
        <div class="safe-settings">
          <div>您已设置<a href="javascript:;">{{userinfo.validationAmount}}</a>个保护项，还有<a href="javascript:;">{{6 - userinfo.validationAmount}}</a>个可以设置</div>
          <div class="set-safe">
            <Button class="primary-border primary-color" type="ghost" @click="protect">保护项设置</Button>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
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
        console.log(amount);
        return {
          username: state.userinfo.username,
          uid: state.userinfo.uid,
          mobile: state.userinfo.mobile,
          estimatedfund: state.userinfo.estimatedfund,
          validationAmount: amount
        };
      }
    })
  },
  mounted() {
    
  },
  methods: {
    protect() {
      this.$store.commit('change');
      this.$router.push({
        path: "/user"
      });
    },
    
  }
};
</script>

<style lang="scss">
.account {
  padding: 20px;
  margin-bottom: 20px;
  .ivu-row {
    .ivu-col:not(:last-of-type) {
      height: 80px;
      border-right: 1px solid #eee;
    }
  }
}

.user-info {
  img.user-portrait {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    float: left;
    margin-right: 20px;
  }
}

.user-info-right {
  padding: 10px 0;
  & > div {
    height: 30px;
    line-height: 30px;
  }
  .user-id {
    color: #3166d2;
    margin-right: 20px;
  }
}

.total-assets {
  width: 60%;
  margin: 0 auto;
  padding: 20px 0;
}

.safe-settings {
  text-align: center;
  padding: 10px 0;
  .set-safe {
    margin: 0 auto;
    margin-top: 10px;
  }
}
</style>
