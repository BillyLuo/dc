<template>
  <div>
    <div class="title-scroll-box">
      <div class="box-margin" id="title-scroll-move-box">
        <ul id="title-scroll-move">
          <li v-for="data in dataArry">
            {{data+1}}
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
          dataArry:dataArrys
        }
      },
    methods:{
      move(){
        let move = document.getElementById("title-scroll-move");
        let moveBox = document.getElementById("title-scroll-move-box");
        move.onmousedown = (ev)=>{   // 按下鼠标
          let Event = ev || window.event;
          let left = moveBox.getBoundingClientRect().left + document.documentElement.scrollLeft;   // moveBox距离左侧位置
          document.onmousemove =(ev)=>{   // 鼠标移动
            let e = ev || window.event;
            let moveLeft = window.getComputedStyle(move,null).left;     //  move left值
            let  offsetX = e.clientX;       //  鼠标 距离左侧位置
            let moveLeftNum = parseFloat(moveLeft.replace('px',''));
            Event.preventDefault();
            move.style.left = moveLeftNum + offsetX - left + 'px';
            console.log("move.style.left=====",move,move.style.left);
            console.log(moveLeft,offsetX,left)
          };
          document.onmouseup = ()=>{   // 鼠标抬起  移除事件
            document.onmousemove = null;
            document.onmousedown = null;
          }
        }
      }
    },
    created(){
      console.log("页面加载前");
    },
    mounted(){
        console.log("页面加载后")
      this.move(document.getElementById('title-scroll-move'))
    }
  }
</script>
<style lang="scss">
  .title-scroll-box{
    width: 100%;
    height: 40px;
    color: #f6f6f6;
    margin-bottom: 50px;
    .box-margin{
      width: 1200px;
      height: 40px;
      margin: 0 auto;
      overflow: hidden;
      position: relative;
      ul{
        width: 3240px;
        position: absolute;
        top: 0;
        left: 0;
        cursor: move;
        animation: move-right 30s linear 0s infinite normal running;
        -moz-animation: move-right 30s linear 0s infinite normal running;	/* Firefox */
        -webkit-animation: move-right 30s linear 0s infinite normal running;	/* Safari 和 Chrome */
        -o-animation: move-right 30s linear 0s infinite normal running;	/* Opera */
        li{
          width: 120px;
          height: 40px;
          float: left;
          border:1px solid red;
          color: #000;
          //设置文字不可选中
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -khtml-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        &:hover{
          animation-play-state:paused;
          -moz-animation-play-state:paused;
          -webkit-animation-play-state:paused;
          -o-animation-play-state:paused;
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
      left: -2040px;
    }
  }
</style>
