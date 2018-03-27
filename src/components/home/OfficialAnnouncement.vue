<template>
  <div>
    <div class="Official-Announcement">
      <div class="wrapper">
        <div class="wrapper-title">
          <h3>币赢官方公告</h3>
          <div class="line"></div>
        </div>
      </div>
      <div class="Official-swiper-box">
        <div class="Official-swiper">
          <div class="swiper-container swiper-container-Official">
            <div class="swiper-wrapper">
              <div class="swiper-slide"  :v-for="(data,index) in swiperArry">
                <div class="s-box" :style="index == activeIndex ? data[1] : data[0]">
                  <div class="left">
                      <h4>
                        <a href="javascript:;"> Coinw即将开通BeeChat (CHAT)充值及上线公告</a>
                      </h4>
                    <p class="time">
                      2018-01-27 15:01
                    </p>
                    <div class="line"></div>
                    <p class="text">BeeChat是基于区块链的手机通讯应用。以独有的去中心化分布式技术，高度安全的加密服务确保免费环球畅聊。它还基于量子链区块链技术，支持BTC,ETH,Qtum的移动钱包，发红包转账和聊天一样简单快捷。ChatCoin，简称CHAT，用于聊天工具中发放红包、打赏、付费进入小BEE圈等服务内容。CHAT官网：http://beechat.io/ CHAT将于2018年1月27日下午17：00点开放充值，2018年1月28日15:00开放交易，请用户...</p>
                    <div class="button">
                      <Button type="ghost" shape="circle" size="small">查看详情</Button>
                    </div>
                  </div>
                  <div class="right">

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="pagination-Announcement">
            <div class="swiper-pagination" id="Official-Announcement"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      let swiperArry = [];
      for (let i = 0; i<10;i++){
        swiperArry.push([{opacity:0.5},{opacity:1}])
      }
      return{
        swiperArry:swiperArry,
        activeIndex:0
      }
    },
    methods:{
      changOptation(activeIndex){
        this.activeIndex = activeIndex
      }
    },
    mounted(){
      let $this = this;
      let mySwiper = new Swiper('.swiper-container-Official', {
        autoplay: false,//可选选项，自动滑动\
        initialSlide:1,
        slidesPerView:1,
        spaceBetween:35,
        runCallbacksOnInit : true,//初始化时触发slideChange
        on:{
          slideChangeTransitionStart: function(){
            $this.changOptation(this.activeIndex)
          }
        },
        pagination: {
          el: '#Official-Announcement',
          type: 'bullets',
          clickable :true,
//          dynamicBullets:true
        },
      })

    }
  }
</script>
<style lang="scss">
  .Official-Announcement{
    width: 100%;
    padding: 70px 0;
    background: #F9F9F9;
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
    .Official-swiper-box{
      width: 100%;
      overflow: hidden;
    }
    .Official-swiper{
      width: 746px;
      margin: 0 auto;
      .swiper-container{
        overflow: visible;
      }
      .s-box{
        width: 746px;
        .left{
          float: left;
          width: 559px;
          height: 250px;
          padding: 50px 35px 35px;
          background: #fff;
          box-sizing: border-box;
          h4{
            margin-bottom: 10px;
            a{
              color: #333;
              font-size: 18px;
              font-weight: 400;
            }
          }
          .time{
            font-size: 14px;
            color: #999;
            margin-bottom: 10px;
          }
          .line{
            width: 40px;
            margin-bottom: 10px;
            height: 1px;
            background: #3166D2;
          }
          .text{
            font-size: 14px;
            color: #999;
            margin-bottom: 25px;
            height: 3.2em;
            line-height: 1.6em;
            white-space:normal;
            overflow:hidden;
            text-overflow:ellipsis;
          }
          .button{

          }
        }
        .right{
          float: right;
          width: 187px;
          height: 250px;
          background: url("/static/img/pic-01.jpg");
        }
      }
      .pagination-Announcement{
        width: 100%;
        margin-top: 50px;
        height: 19px;
        #Official-Announcement{
          position: static;
          span{
            margin: 0 10px;
          }
        }
      }
    }
  }
</style>
