<template>
  <div class="reset-password-wrapper wrapper">
    <div class="reset-password">
      <Title text="请选择登录密码找回方式"/>
    </div>
    <div class="choose-reset-wrapper bg-2a2a2a">
      <Row>
        <Col span="2">
          <span :class="{'choose-item':true,active:(active == 'ResetByPhone')}" @click="changeActive('ResetByPhone','ResetByPhone')">手机找回</span>
        </Col>
        <Col span="2">
          <span :class="{'choose-item':true,active:(active == 'ResetByEmail')}" @click="changeActive('ResetByEmail','ResetByEmail')">邮箱找回</span>
        </Col>
      </Row>
      <div class="reset-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '../common/Title';
console.log('----title-----',Title);
export default {
  components:{
    Title
  },
  mounted(){
    var name = this.$route.name;
    if (name && name.length > 5) {
      this.active = name;
    }
  },
  data () {
    return {
      active:'ResetByPhone'
    }
  },
  methods:{
    changeActive(value,name) {
      this.active = value;
      this.$router.push({
        name
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .reset-password-wrapper {
    padding: 30px 0 40px;
    .choose-reset-wrapper {
      padding: 0 10px;
      height: 60px;
      line-height: 60px;
      box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
    }
    .choose-item {
      cursor: pointer;
      color:#586c86;
      font-size: 16px;
      display: block;
      line-height: 60px;
      &.active {
        color: #fff;
      }
    }
  }
  .reset-password {
    padding: 20px 0px;
    // background: #fff;
    .ivu-row {
      padding: 0 10px;
    }
  }
  .reset-content {
    background: #222;
  }
</style>
