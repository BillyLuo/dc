<template>
  <div class="titlescroll">
    <div class="title-scroll-box" id="scroll-wrapper" >
      <div class="box-margin" id="title-scroll-move-box">
        <ul id="title-scroll-move">
          <li v-for="data in dataArry" :key="data" :class="{down:data%2==0?true:false}">
            <span class="s1">TNT/TNT</span>
            <span class="s2">{{data+1}}</span>
            <span class="s3"></span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
      data (){
        const dataArrys = [];
        for (let i = 0; i < 27; i ++){
          dataArrys.push(i)
        }
        return{
          dataArry:dataArrys,
          left:0,
          scrolling:false,
          timer:null
        }
      },
    methods:{
      // scroll (num) {
      //   var box = document.getElementById('title-scroll-move-box');
      //   this.left = num;        
      //   box.style.transform = 'translate('+num+'px,'+'0px)';
      // },
      // scroller (value) {
      //   var that = this;
      //   console.log(value);
      //   if (value) {
      //     that.timer = setInterval(function () {
      //       var num = that.left;
      //       // console.log(num);
      //       num --;
      //       if (num < -3600) {
      //         num = 0;
      //       }
      //       that.left = num;
      //       that.scroll(num);
      //     },20);
      //   }else if (that.timer){
      //     clearInterval(that.timer);
      //   }
      // }
    },
    created(){
      // console.log("页面加载前");
    },
    mounted(){
      // var that = this;
      // if (!that.timer) {
      //   that.timer = setInterval(function () {
      //     var num = that.left;
      //     // console.log(num);
      //     num --;
      //     if (num < -3600) {
      //       num = 0;
      //     }
      //     that.left = num;
      //     that.scroll(num);
      //   },20);
      // }
      // var myScroll = new IScroll('#scroll-wrapper', { eventPassthrough: true, scrollX: true, scrollY: false,probeType:3, preventDefault: false });
      // myScroll.on('scrollEnd',function () {
      //   var box = document.getElementById('title-scroll-move-box');
      //   box.style.transform = 'translate('+this.x+'px,'+this.y+'px)';
      //   that.left = this.x;
      //   that.scrolling = false;
      //   // that.scroller(true);
      // })
      // myScroll.on('scrollStart',function () {
      //   that.scrolling = true;
      // })
    }
  }
</script>
<style lang="scss">
.titlescroll{
  width:100%;
  overflow: hidden;
}
  .title-scroll-box{
    width: 100%;
    // padding: 5px 0;
    height: 30px;
    background-color: #353535;
    // position: fixed;
    top:0;
    z-index: 999;
    .title-scroll-move {
      width: 100%;
      margin:0;
      padding: 0;
      list-style-type: none;
    }
    .box-margin{
      // width: 4860px;
      height: 30px;
      margin: 0 auto;
      overflow: hidden;
      position: absolute;
      background-color: #353535;
      ul{
        width: 4860px;
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
        // animation: move-right 90s linear 0s infinite normal running;
        // -moz-animation: move-right 90s linear 0s infinite normal running;	
        // -webkit-animation: move-right 90s linear 0s infinite normal running;	
        // -o-animation: move-right 90s linear 0s infinite normal running;	
        li{
          width: 180px;
          height: 30px;
          float: left;
          color: #000;
          font-size: 14px;
          line-height: 30px;
          text-align: center;
          //设置文字不可选中
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          .s1{
            color: #fff;
            padding-right: 10px;
          }
          .s2{
            color: #f00;
            padding-right: 10px;
          }
          .s3{
            display: inline-block;
            width: 15px;
            height: 15px;
            background: url("/static/img/icon-arrow.png");
            background-position: 0px 0px;
          }
        }
        li.down {
          .s3 {
            background-position: 0 -15px;
          }
          .s2 {
            color: #1cd018;
          }
        }
      }
    }
  }
  @mixin keyframes($animationName) {
    @-webkit-keyframes #{$animationName} {
      @content;
    }
    @-moz-keyframes #{$animationName} {
      @content;
    }
    @-o-keyframes #{$animationName} {
      @content;
    }
    @keyframes #{$animationName} {
      @content;
    }
  }

  @include keyframes(move-right) {
    0% {
      left: 0;
    }
    100% {
      left: -3660px;
    }
  }
</style>
