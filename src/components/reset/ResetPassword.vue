<template>
  <div class="reset-password-wrapper wrapper">
    <div class="reset-password">
      <div class="reset-title">
        <h3>请选择登录密码找回方式</h3>
      </div>
      <Row>
        <Col span="12">
          <Card class="reset-card">
            <i class="reset-email"></i>
            <p>通过邮箱找回</p>
            <span>需要登录邮箱找回密码</span>
            <Button type="primary" class="btn-block" size="large">点击找回</Button>
          </Card>
        </Col>
        <Col span="12" class="reset-card">
          <Card>
            <i class="reset-phone"></i>
            <p>通过手机找回</p>
            <span>需要手机验证找回密码</span>
            <Button type="primary" class="btn-block" size="large">点击找回</Button>
          </Card>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped lang="scss">
  .reset-password-wrapper {
    padding: 30px 0 40px;
  }
  .reset-password {
    padding: 20px;
    background: #fff;
    .ivu-col {
      padding: 0 15px;
    }
  }
  .reset-title {
    h3 {
      font-weight: 400;
      text-align: center;
      height: 80px;
      line-height: 80px;
      border-bottom: 2px solid #3166D2;
      margin-bottom: 40px;
    }
  }
  .reset-card {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 40px;
    p {
      font-size: 20px;
    }
    span {
      display: block;
      height: 20px;
      line-height: 20px;
      margin: 20px 0;
      color: #666;
      font-size: 16px;
    }
  }
  .reset-phone,.reset-email {
    display: block;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    background: url(/static/img/resetpiclist.png) no-repeat;
  }
  .reset-email {
    background-position: 0 0;
  }
  .reset-phone {
    background-position: 0 -259px;
  }
</style>
