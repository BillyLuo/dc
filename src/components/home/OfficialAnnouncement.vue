<template>
  <div>
    <div class="Official-Announcement">
      <div class="wrapper">
        <div class="wrapper-title">
          <h3>币赢官方公告</h3>
          <div class="line"></div>
        </div>
      </div>
      <div class="Official-swiper">
        <div class="swiper-container swiper-container-Official">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <div class="s-box">
                <div class="left">

                </div>
                <div class="right">

                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="s-box">
                <div class="left">

                </div>
                <div class="right">

                </div>
              </div>
            </div>
            <div class="swiper-slide">
              <div class="s-box">
                <div class="left">

                </div>
                <div class="right">

                </div>
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
      return{}
    },
    mounted(){
      let mySwiper = new Swiper('.swiper-container-Official', {
        autoplay: true,//可选选项，自动滑动\
        slidesPerView:3,
        spaceBetween:35,
        pagination: {
          el: '.swiper-pagination',
          clickable :true,
        },
      })
    }
  }
</script>
<style lang="scss">
  .Official-Announcement{
    width: 100%;
    padding: 70px 0;
    .wrapper{
      width: 1200px;
      margin: 0 auto;
      .wrapper-title{
        width: 100%;
        margin-bottom: 50px;
        text-align: center;
        font-size: 14px;
        h3{
          font-size: 20px;
          color: #333;
          font-weight: 400;
          margin-bottom: 10px;
        }
        .line{
          width: 30px;
          height: 3px;
          background: #3166D2;
          margin: 0 auto;
        }
      }
    }
    .Official-swiper{
      .s-box{
        width: 746px;
        .left{
          float: left;
          width: 556px;
          height: 250px;
          padding: 50px 35px 35px;
          background: red;
          box-sizing: border-box;
        }
        .right{
          float: right;
          width: 187px;
          height: 250px;
          background: url("/static/img/pic-01.jpg");
        }
      }
    }
  }
</style>
