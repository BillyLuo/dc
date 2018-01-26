<template>
  <div class="footer bg-yellow">
    <div class="wrapper">
      <Row>
        <Col :md="24">
          <p>地址：北京市朝阳区时代凌宇大厦6层</p>
          <p>电话：18600980961</p>
          <p>邮箱：market@finchain360.com</p>
        </Col>
      </Row>
    </div>
    <div class="copy-right text-center">
      京ICP备56565515号 2017 北京泛融科技有限公司
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .footer {
    .wrapper {
      padding: 30px;
    }
    p {
      line-height: 2em;
    }
    .copy-right {
      background: #EAB33E;
      height: 40px;
      line-height: 40px;
    }
  }
  .qr-code {
    width: 100px;
    height: 100px;
    margin: 0 auto;
  }
</style>
