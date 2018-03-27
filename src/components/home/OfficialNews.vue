<template>
  <div class="office-news">
    <div class="center">
      <div class="left-img">
      </div>
      <div class="right-text">
        <div class="title">
          <h3>{{titleNewsText}}</h3>
          <Button type="ghost" shape="circle" @click="titleNewsChange('官方新闻')">官方新闻</Button>
          <Button type="ghost" shape="circle" @click="titleNewsChange('媒体报道')">媒体报道</Button>
          <Button type="ghost" shape="circle" @click="titleNewsChange('资料库')">资料库</Button>
        </div>
        <div class="swiper-text">
          <div class="swiper-container News-swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="(Array,index) in Arrays" :key="index">
                <div class="s1">
                  <div class="left">
                    <p>01.{{index+1}}</p>
                    <div>2018</div>
                  </div>
                  <div class="right">
                    <h3>富币停机维护公告</h3>
                    <p>尊敬的用户您好：富币将于2018年1月24日20点停机维护90分钟，维护内容如下：1、升级服务器性能；2、提高APP稳定性。请用户提前做好准备，给您带来不便请谅解！     富币  International team 2018.1.24...</p>
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
      let Arrays = [];
      for(let i = 0; i<20;i++){
        Arrays.push(i)
      }
      return{
        Arrays:Arrays,
        titleNewsText:'官方新闻'
      }
    },
    methods:{
      titleNewsChange(text){
        this.titleNewsText = text
      }
    },
    mounted(){
      let mySwiper = new Swiper('.News-swiper-container', {
        autoplay: false,//可选选项，自动滑动
        direction : 'vertical',
        initialSlide:0,
        slidesPerView:3,
        spaceBetween:35,
      })
    }
  }
</script>
<style lang="scss">
  .office-news{
    width: 100%;
    background: #fff;
    .center{
      width:1200px;
      margin: 0 auto;
      padding: 70px 0;
      height: 682px;
      position: relative;
      .left-img{
        width: 925px;
        height: 535px;
        background: url("/static/img/bg-index-03.jpg");
        background-size: 100% 100%;
        position: absolute;
        top: 70px;
        left: -100px;
      }
      .right-text{
        width: 617px;
        height: 535px;
        position: absolute;
        top: 70px;
        right: 0;
        padding: 0 15px;
        box-sizing: border-box;
        .title{
          width: 100%;
          height: 60px;
          margin-bottom: 50px;
          border-bottom: 1px solid #ebebeb;
          h3{
            font-size: 20px;
            color: #333;
            font-weight: 400;
            float: left;
          }
          button{
            float: right;
            font-size: 14px;
            line-height: 17px;
            height: 30px;
            margin-left: 20px;
          }
        }
        .swiper-text{
          width: 100%;
          height: 400px;
          .swiper-wrapper{
            height: 400px;
          }
          .s1{
            width: 100%;
            height: 100px;
            position: relative;
            .left{
              width: 70px;
              height: 100px;
              float: left;
              border-right: 1px solid #ebebeb;
              p{
                font-size: 16px;
                color: #3166d2;
              }
              div{
                font-size: 18px;
                color: #333;
              }
            }
            .right{
              width: 100%;
              height: 100px;
              box-sizing: border-box;
              position: absolute;
              top: 0;
              left: 0;
              padding-left: 90px;
              h3{
                font-size: 18px;
                margin-bottom: 10px;
                font-weight: 400;
                a{
                  color: #333;
                }
              }
              p{
                font-size: 14px;
                color: #999;
                height: 4.8em;
                line-height: 1.6em;
                -webkit-line-clamp: 3;
              }
            }
          }
        }
      }
    }
  }

</style>
