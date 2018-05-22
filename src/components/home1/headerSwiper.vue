<template>
  <div class="header-swiper-box">
    <div class="swiper-container header-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="hander-swiper-img hander-swiper-1">
          </div>
        </div>
        <!-- <div class="swiper-slide">
          <div class="hander-swiper-img hander-swiper-2">
            <div class="wrapper">
              <h4>数字资产量化交易平台</h4>
              <h3>Professional Cryptocurrency
                Exchange Platform</h3>
              <div class="line"></div>
              <div class="understanding">了解详情</div>
            </div>
          </div>
        </div>
        <div class="swiper-slide">
          <div class="hander-swiper-img hander-swiper-3">
          </div>
        </div> -->
      </div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{}
    },
    methods:{
    },
    mounted(){
      let mySwiper = new Swiper('.header-swiper-container', {
        speed:1000,
        loop: true,
        autoplay : {
          delay:3000,
          disableOnInteraction:false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
      })
    }
  }
</script>
<style lang="scss">
.header-swiper-box{
  .hander-swiper-img{
    width: 100%;
    height: 480px;
    background-size: 100% 100%;
  }
  .hander-swiper-1{
    background-image: url("/static/img/banner.jpeg");
  }
  .hander-swiper-2{
    background-image: url("/static/img/banner1.png");
      .wrapper{
        width: 1200px;
        margin: 0 auto;
        padding-top: 160px;
        color: #fff;
        text-align: center;
        font-family: AvertaStdBold,"Microsoft Yahei",arial,Helvetica;
        h4{
          font-size: 32px;
          margin-bottom: 5px;
        }
        h3{
          font-size: 20px;
          margin-bottom: 20px;
        }
        .line{
          width: 50px;
          height: 6px;
          background: #fff;
          margin: 0 auto 25px auto;
        }
        .understanding{
          height: 35px;
          padding: 0 25px;
          line-height: 32px;
          font-size: 14px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.61);
          border-radius: 50px;
          width: 120px;
          margin: 0 auto;
          cursor: pointer;
          &:hover{
            background: #fff;
            color: #007aff;
          }
        }
      }
    }
  }
  .hander-swiper-3{
    background-image: url("/static/img/banner2.jpg");
}
</style>
