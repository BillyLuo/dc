<template>
  <div>
    <div class="title-scroll-box">
      <div class="box-margin">
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
    created(){
      console.log("aaaaaaa")
    },
    mounted(){
        console.log("bbbbb")
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
