<template>
  <div>
    <div class="choose-us">
      <div class="wrapper">
        <div class="left">
          <p class="p1">全球超过</p>
          <p class="p2">2.046 +  选择我们</p>
          <div class="p3"></div>
          <p class="p4">
            超过10年金融风控经验团队全方位可定制的安全策略体系
            <br/>98%区块链资产存储多重签名冷钱包
          </p>
        </div>
        <div class="right">
          <div class="swiper-container swiper-container-right">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="data in swiperArray">
                <div class="s1">
                  <div class="title-img"></div>
                  <div class="text">
                    <h4>
                      <span>WILL</span>
                      <em>澳洲科银资本 CEO</em>
                    </h4>
                    <div class="line"></div>
                    <p>币赢网是一个开放的平台，时不时还会有福利发布
                      交易方便快捷</p>
                  </div>
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
      let swiperArray = [];
      for(let i=0 ; i<10; i++){
        swiperArray.push(i)
      }
      return{
        swiperArray:swiperArray
      }
    },
    mounted(){
      let mySwiper = new Swiper('.swiper-container-right', {
        autoplay: false,//可选选项，自动滑动\
        slidesPerView:2,
        spaceBetween:35,
      })
    }
  }
</script>
<style lang="scss">
  .choose-us{
    width: 100%;
    padding: 160px 0 120px 0;
    background: url("/static/img/bg-index-02.jpg");
    background-size: 100% 100%;
    .wrapper{
      width: 1200px;
      margin: 0 auto;
      height: 290px;
      .left{
        width: 42%;
        height: 290px;
        float: left;
        .p1{
          font-size: 20px;
          color: #999;
          line-height: 1em;
          margin-bottom: 10px;
        }
        .p2{
          color: #3166d2;
          line-height: 1em;
          margin-bottom: 10px;
          font-size: 20px;
        }
        .p3{
          width: 90%;
          height: 1px;
          background: rgba(255,255,255,.11);
          margin-bottom: 15px;
        }
        .p4{
          font-size: 14px;
          color: #999;
          line-height: 1.6em;
          padding: 3px;
        }
      }
      .right{
        width: 58%;
        height: 290px;
        float: right;
        overflow: hidden;
        padding-top: 35px;
        .swiper-container{
          overflow: visible;
        }
        .s1{
          position: relative;
          background-color: #fff;
          border-radius: 5px;
          box-shadow: 0 22px 65px 0 rgba(0,0,0,.16);
          padding: 50px 45px 35px 35px;
          position: relative;
          .title-img{
            width: 75px;
            height: 75px;
            border-radius: 100%;
            background: url(/static/img/portrait.jpg);
            background-size: 100% 100%;
            position: absolute;
            top: -30px;
            right: 15px;
            box-shadow: 0 0 15px #333;
          }
          .text{
            h4{
              margin-bottom: 15px;
              span{
                font-size: 16px;
                color: #333;
                margin-right: 15px;
                font-weight: 400;
              }
              em{
                font-size: 14px;
                color: #666;
                font-style: normal;
                font-weight: 400;
              }
            }
            .line{
              width: 35px;
              height: 3px;
              background: #3166d2;
              margin-bottom: 20px;
            }
            p{
              height: 4.2em;
              line-height: 1.4em;
              -webkit-line-clamp: 3;
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }
  }
</style>
