<template>
  <div class="announcement">
    <div class="center">
      <div class="left">
        <img src="/static/img/icon-notice.png" alt="">
        <span>公告</span>
      </div>
      <div class="right">
        <div class="swiper-container announcement-swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(data,index) in swiperData">
              <div class="announcement-text">
                <a href="javascript:;">{{index+1}}-Coinw即将开通BeeChat (CHAT)充值及上线公告</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      let swiperData = [];
      for(let i = 0; i< 100;i++){
        swiperData.push(i)
      }
      return{
        swiperData:swiperData
      }
    },

    methods:{

    },
    mounted(){
      let mySwiper = new Swiper('.announcement-swiper-container', {
        autoplay: true,//可选选项，自动滑动
        direction : 'vertical',
      })
    }
  }
</script>
<style lang="scss">
  .announcement{
    width: 100%;
    height: 36px;
    background-color: rgba(242,244,249,.75);
    // position: absolute;
    z-index: 2;
    .center{
      width: 1200px;
      margin: 0 auto;
      position: relative;
      .left{
        width: 80px;
        height: 36px;
        line-height: 36px;
        position: absolute;
        top:0;
        left: 0;
        img{
          vertical-align: middle;
        }
        span{
          color:#75829d;
          font-size: 14px;
          margin-left: 7px;
          vertical-align: middle;
        }
      }
      .right{
        width: 100%;
        height: 36px;
        box-sizing: border-box;
        padding-left: 80px;
        .swiper-wrapper{
          height: 36px;
        }
        .announcement-text{
          width: 100%;
          height: 36px;
          line-height: 42px;
          a{
            color: #75829d;
          }
        }
      }
    }
  }
</style>
