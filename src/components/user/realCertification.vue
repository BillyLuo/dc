<template>
  <div class="real-certification">
    <div v-if="level == 1">
      <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-1"></i>
        </div>
        <div class="certification-text float-left">
          <h3>您的账号已通过实名认证</h3>
          <p>
            您实名认证以后，您的账户<span>每天最多可累计提现五万人民币。如您有大额资金操作，请完成C2级别认证，以获得更高级别的资金权限。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p>
        </div>
      </div>
      <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-2"></i>
        </div>
        <div class="certification-text float-left">
          <h3>您尚未进行<a>C2身份认证</a></h3>
          <p>
            您C2认证以后，您的账户<span>每天最多可累计提现五十万人民币。如您有大额资金操作，请完成C3级别认证，以获得更高级别的资金权限。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p>
        </div>
      </div>
      <div class="certification-item clear">
        <div class="certification-pic float-left">
          <i class="icon-card icon-3"></i>
        </div>
        <div class="certification-text float-left">
          <h3>如需更大权限，请添加<a>客服QQ</a></h3>
          <p>
            您C3认证以后，您的账户<span>每天最多可累计提现三百万人民币。</span>
            我们会严格保密您的身份信息，不会向任何第三方透露。
          </p>
        </div>
      </div>
    </div>
    <div v-if="level == 0">
      <nameCertification />
    </div>
  </div>
</template>

<script>
import nameCertification from './nameCertification';
export default {
  components:{
    nameCertification
  },
  data () {
    return {
      level:0
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
</style>
