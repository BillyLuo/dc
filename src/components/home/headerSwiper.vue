<template>
  <div class="header-swiper-box">
    <div class="swiper-container header-swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="hander-swiper-img slide-1">
          </div>
        </div>
        <div class="swiper-slide">
          <div class="hander-swiper-img slide-2">
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
    height: 600px;
    background-size: 100% 600px;
  }
  .slide-1{
    background-image: url("/static/img/banner/cepl.png");
  }
  .slide-2{
    background-image: url("/static/img/banner/sutu.png");
  }
}
</style>
