<template>
<div>
    <div class="banner">
        <div class="img-banner">
            <img src="/static/img/banner1.png" alt="">
            <!-- <Menu ref="main_menu" class="header-menu" mode="horizontal" @on-select="route" :active-name="activeName">
                <MenuItem v-for="(value,index) in menu" :name="value.name" :key="value.name + index">
                    {{value.text}}
                </MenuItem>
            </Menu> -->
            <!-- <div class="login">
                <Button class="log-in-out">登录</Button>or<Button class="log-in-out">注册</Button>
                <img src="/static/img/language.png" alt="">
            </div> -->
            <div class="text">
                <h1 class='h1'>币邦</h1>
                <p class='p1'>Type somethingType somethingType somethingType something</p>
                <!-- <p class="p_button"><Button class="button1">PRESSED</Button></p> -->
            </div>
        </div>
    </div>
    <List/>
    <Calculator/>
    <Foot/>
</div>
    
</template>

<script>
import List from "./list";
import Calculator from './Calculator';
import Foot from './footer';
    export default {
        components:{
            List,Calculator,Foot
        },
        data() {
          return {
              activeName:"home"
          }
        },
        mounted(){
           
        },
        methods:{
            route(name){
                // console.log(name)
            }
        }
    }
</script>
<style lang="scss">
    .banner{
        width:100%;
        position: relative;
        min-height: 400px;
        .img-banner img{
            width:100%;
            display: block;
        }
        // .header-menu{
        //     position: absolute;
        //     top:0;
        //     left: 140px;
        //     background: none;
        //     &:before{
        //         content: "";
        //         display: block;
        //         width:34px;
        //         height:39px;
        //         position: absolute;
        //         left:-50px;
        //         top:50%;
        //         margin-top: -19.5px;
        //         text-align: center;
        //         background: url('/static/img/logo.png') no-repeat;
        //     }
        //     .ivu-menu-item{
        //         color:#fff;
        //         font-size:16px;
        //         border-bottom: 0px solid transparent;
        //     }
        //     .ivu-menu-item:hover{
        //         border-bottom:none;
        //     }
        // }
        // .ivu-menu-horizontal {
        //     height: 80px;
        //     line-height: 80px;
        // }
        // .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
        //     color: #2d8cf0;
        //     border-bottom: none;
        // }
        // .header-menu:after{
        //     height:0px;
        // }
        // .login{
        //     position: absolute;
        //     top:0;
        //     right:40px;
        //     line-height: 80px;
        //     height:80px;
        //     color:#fff;
        //     .log-in-out{
        //         border:none;
        //         background: none;
        //         color:#fff;
        //     }
        //     .ivu-btn:focus {
        //         -webkit-box-shadow: none;
        //         box-shadow: none;
        //     }
        //     img{
        //         width: 21px;
        //         height: 21px;
        //         display: inline-block;
        //         vertical-align: middle;
        //     }
        // }
        .text{
            position: absolute;
            width:100%;
            height:100%;
            color:#fff;
            top:0;
            left:0;
           
            .h1{
                height:90px;
                font-family:PingFangSC-Semibold;
                font-size:64px;
                color:#ffffff;
                letter-spacing:0;
                text-align:center;
                margin-top:230px;
                font-weight:400;
            }
             @media screen and (min-width:1440px) {
                .h1{
                    margin-top:20%;
                }
            }
            .p1{
                text-align: center;
                margin-top: 17px;
                font-size: 17px;
            }
            .p_button{
                text-align: center;
                .button1{
                    background-image:linear-gradient(-180deg, #3fc67c 0%, #009688 100%);
                    border-radius:5px;
                    width:216px;
                    height:38px;
                    border:none;
                    margin-top:27px;
                    color:#fff;
                    font-size:14px;
                }
                .ivu-btn:focus {
                    -webkit-box-shadow: none;
                    box-shadow: none;
                }
            }
            
        }
    }
</style>

