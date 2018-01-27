<template>
  <div>
    <div class="expected-return">
      <div class="expected-return-top">
        预期收益
      </div>
      <div class="expected-return-text">
        您可通过ZeuSNet分享包括CPU/GPU/硬盘/网络等闲置资源并获得相应的回报
      </div>
      <div class="expected-return-line">
      </div>
      <div class="slider-change-box clearfix">
        <div class="left float">
          <p class="upload">
            上传速度
          </p>
          <div class="slider">
            <div class="slider-div-all">
              <div v-for="item in items">
                <div :class="item.className" :style="item.style">
                  <div class="slider-div-children-change" :style="item.styleChildren" ></div>
                </div>
              </div>
            </div>
            <div class="expected-slider-ivu">
              <Slider v-model="valueSpeed"  :tip-format="uploadSpeed" @on-input="changeHeight" ></Slider>
            </div>
          </div>
          <p class="upload upload-time">
            上传时间
          </p>
          <div class="upload-time-slider">
            <div class="expected-slider-ivu">
              <Slider v-model="valueTime" :tip-format="uploadTime"></Slider>
            </div>
          </div>
        </div>
        <div class="center float">
          <div class="center-box center-upload-speed">
            326.00 &nbsp; Mbps
          </div>
          <div class="center-box center-upload-time">
            8 &nbsp; 小时
          </div>
        </div>
        <div class="right float">
          <div class="right-box-children">
            <p>每日收益</p>
            <p class="p-num p-color">$ 17.19</p>
          </div>
          <div class="right-box-children margin">
            <p>每周收益</p>
            <p class="p-num">$120.33</p>
          </div>
          <div class="right-box-children margin">
            <p>每月收益</p>
            <p class="p-num">$532.89</p>
          </div>
        </div>
      </div>
      <div class="expected-bottom">
        预计收益是基于每GB ¥0.3费率， ZeuSNet不保障这个费率及任何收益。此预期收益是基于有利的市场条件的估计。
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      const items = [];
      for (let i = 0; i < 25; i++) {
        items.push(
          {
            className:"slider-div-children div-" + i,
            style:'left:'+ i*21 + 'px;height:'+ (0.22*(Math.pow(i,2)) + i + 6.5) + 'px',
            styleChildren:'height:0px'
          }
        )
      }
      return {
        valueSpeed: 0,
        valueTime: 0,
        items:items,
        sliderLong:[],
      }
    },
    methods:{
      uploadSpeed(value){
        return value*10
      },
      uploadTime(){
        return null
      },
      changeHeight(){
        let num = parseInt(this.valueSpeed/4) == 25 ? 24 :parseInt(this.valueSpeed/4);
        this.sliderLong.push(num);
        if(this.sliderLong.length >1){
          if(this.sliderLong[this.sliderLong.length-1] >= this.sliderLong[this.sliderLong.length-2]){
            for (let i = 0; i < num+1; i++){
              this.items[i].styleChildren = 'height:' + (0.22*(Math.pow(i,2)) + i + 6.5) + 'px';
            }
          }else{
            for (let i = this.sliderLong[this.sliderLong.length-1]; i < this.sliderLong[this.sliderLong.length-2]; i++){
              this.items[i+1].styleChildren = 'height: 0px'
            }
          }
        }else if(this.sliderLong.length = 1){
          for (let i = 0; i < num+1; i++){
            this.items[i].styleChildren = 'height:' + (0.22*(Math.pow(i,2)) + i + 6.5) + 'px';
          }
        }
      }
    }
  }
</script>
<style lang="scss">
  $theme-color:#ffb900;
  $text-color:#8b8b8b;
  .clearfix:before,
  .container:after {
    content: "";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  .expected-return{
    width: 100%;
    background: #000;
    .expected-return-top{
      width: 100%;

      padding-top: 122px;
      font-size: 33px;
      color: $theme-color;
      text-align: center;
      font-weight: 600;
    }
    .expected-return-text{
      width: 100%;
      padding-top: 20px;
      font-size: 18px;
      color: $text-color;
      text-align: center;
    }
    .expected-return-line{
      width: 70px;
      border-top: 2px solid $theme-color;
      margin: 20px auto;
    }
    .slider-change-box{
      width: 100%;
      height: 600px;
      padding: 30px 0;
      .float{
        float: left;
        height: 550px;
        box-sizing: border-box;
      }
      .left{
        width: 45%;
        .slider{
          width: 530px;
          height: 250px;
          margin: 0 auto;
          padding: 25px 0;
          .slider-div-all{
            width: 100%;
            height: 170px;
            position: relative;
            .slider-div-children{
              position: absolute;
              bottom: 0;
              width: 10px;
              background: #3d3d3d;
            }
            .slider-div-children-change{
              position: absolute;
              bottom: 0;
              width: 100%;
              background: $theme-color;
              transition: all 0.3s ease-in-out;
              /* Firefox 4 */
              -moz-transition:all 0.3s ease-in-out;
              /* Safari and Chrome */
              -webkit-transition:all 0.3s ease-in-out;
              /* Opera */
              -o-transition:all 0.3s ease-in-out;
            }
          }
        }
        .upload-time{
          margin-top: 30px;
        }
        .upload-time-slider{
          width: 530px;
          margin: 0 auto;
          margin-top: 40px;
        }
      }
      .center{
        width: 15%;
        .center-box{
          width: 200px;
          height: 65px;
          border: 2px solid $theme-color;
          text-align: center;
          line-height: 65px;
          font-size: 18px;
          color: $theme-color;
          font-weight: 600;
          margin: 0 auto;
        }
        .center-upload-speed{
          margin-top: 110px;
        }
        .center-upload-time{
          margin-top: 250px;
        }
      }
      .right{
        width: 40%;
        .right-box-children{
          width: 390px;
          height: 160px;
          margin: 0 auto;
          background: rgb(49,49,49);
          text-align: center;
          color: #fff;
          box-sizing: border-box;
          border: 1px solid rgb(49,49,49);
          font-size: 18px;
          p{
            margin-top: 40px;
          }
          .p-num{
            font-size: 23px;
            font-weight: 600;
            margin-top: 35px;
          }
          .p-color{
            color: $theme-color;
          }
        }
        .margin{
          margin-top: 30px;
        }
      }
      .upload{
        width: 100%;
        color: $theme-color;
        font-size: 18px;
        text-align: center;
        font-weight: 600;
        padding: 20px 0;
      }
      .expected-slider-ivu{
        width: 97%;
        .ivu-slider-bar{
          height: 10px;
        }
        .ivu-slider-wrap{
          height: 10px;
        }
        .ivu-slider-button-wrap{
          top: -3px;
        }
        .ivu-slider-button{
          width: 16px;
          height: 16px;
        }
      }
    }
    .expected-bottom{
      width: 100%;
      height: 180px;
      text-align: center;
      color: #fff;
      line-height: 130px;
      font-size: 16px;
    }
  }
</style>
