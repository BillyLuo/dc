<template>
  <div>
    <div class="footer-box">

      <div class="wrapper">
            <div class="wrapper-left">
              <ul>
                <li><a href="javaScript:;">关于我们</a></li>
                <li><a href="javaScript:;">资费说明</a></li>
                <li><a href="javaScript:;">API</a></li>
                <li><a href="javaScript:;">上币申请</a></li>
              </ul>
            </div>
            <div class="wrapper-right">
              <ul>
                <li><a href="javaScript:;">联系我们</a></li>
                <li class="li-email"><a href="javaScript:;"><Icon type="email"></Icon>admin@fclin.com</a></li>
                <li class="li-qq"><a href="javaScript:;"><Icon type="social-tux"></Icon>
                  <img src="/static/img/group.png" alt=""></a></li>
              </ul>
            </div>
      </div>
      <div class="wrapper-bottom">
        <div class="bottom-img">
          <a href="javaScript:;"><img src="/static/img/siteseal.gif" alt=""></a>
          <b>友情链接</b>
          <a href="javaScript:;"><img src="/static/img/BTC123.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/Bitkan.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/8btc.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/ETC.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/ETHFANS.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/AIcoin.png" alt=""></a>
          <a href="javaScript:;"><img src="/static/img/BOTVS.png" alt=""></a>
        </div>
        <div class="bottom-text">
          <!-- Copyright © 2013-2017 - 富币.COM All Rights Reserved -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {

}
</script>

<style lang="scss">
  .footer-box{
    width: 100%;
    height: 355px;
    background: #333;
    .wrapper{
      width: 1200px;
      height: 250px;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 70px 0 50px 0;
      .wrapper-left{
        width: 590px;
        height: 90px;
        box-sizing: border-box;
        padding: 20px 15px 0 15px;
        float: left;
        ul{
          li{
            float: left;
            list-style: none;
            margin-right: 50px;
            margin-bottom: 10px;
            a{
              color: rgba(113,119,134,.56);
            }
          }
        }
      }
      .wrapper-right{
        width: 410px;
        height: 130px;
        padding: 20px 15px 0 15px;
        float: right;
        ul{
          li{
            margin-bottom: 10px;
            a{
              color: rgba(113,119,134,.56);
              img{
                vertical-align: middle;
              }
            }
            i{
              font-size: 30px;
              vertical-align: middle;
              margin-right: 25px;
              color: rgba(113,119,134,.56);
            }
          }
          .li-email{
            padding-top: 25px;
          }
        }
      }
    }
    .wrapper-bottom{
      width: 1200px;
      height: 100px;
      margin: 0 auto;
      border-top: 1px solid #444;
      .bottom-img{
        width: 100%;
        height: 36px;
        padding-top: 10px;
        b{
          color: #444;
          font-size: 16px;
          vertical-align: super;
          margin-left: 150px;
        }
      }
      .bottom-text{
        text-align: center;
        color: #444;
        padding-top: 15px;
        font-size: 15px;
      }
    }
  }
</style>

