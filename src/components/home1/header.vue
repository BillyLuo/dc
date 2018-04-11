<template>
    <div class="header" :style="height">
        <Menu ref="main_menu" class="header-menu" mode="horizontal" @on-select="route" :active-name="activeName">
            <MenuItem v-for="(value,index) in menu"  :key="value.name + index" :name="value.name">
                {{value.text}}
            </MenuItem>
        </Menu>
        <div class="login">
            <Button class="log-in-out">登录</Button>or<Button class="log-in-out">注册</Button>
            <img src="/static/img/language.png" alt="">
        </div>
    </div>
</template>
<script>
    let menu = [
        {name:'home',text:'首页'},
        {name:'trading',text:'交易中心'},
        {name:'assets',text:'数字资产'},
        {name:'user',text:'个人中心'},
        {name:'market',text:'行情中心'},
    ]
    import { Menu,MenuItem,Row,Col } from 'iview';
    import cookies from 'cookies-js';
    export default {
        components:{
            Menu,
            MenuItem,
            Row,
            Col
        },
        data() {
          return {
              menu,
              activeName:"home",
              menu_style:"position: absolute;",
              height:"",
              username:""
          }
        },
        watch:{
            "$route":"getPath", // 监听事件
        },
        mounted(){
           this.username = cookies.get("name");
        },
        methods:{
            route(name){
                console.log(cookies.get("name"))
                this.$router.push(name)
                if(!cookies.get("name") && name!="home" && name!="login" && name!="register"){
                    this.$Modal.info({
                        content:'请您先登录'
                    });
                    this.$router.push("login");
                    this.$refs.main_menu.currentActiveName = "home"
                    return false
                }
            },
            getPath(){
                let path = this.$route.path;
                console.log(path)
                if(path !='/' && path!="/home" && path!="/login" && path!="/register"){
                    this.height = "height:80px;background:#333;"
                }else{
                    this.height = "";
                }
                
            }
        }
    }
</script>
<style lang="scss">
.header{
    position: relative;
    .header-menu{
        position: absolute;
        top:0;
        left: 0;
        padding-left:140px;
        background: none;
        &:before{
            content: "";
            display: block;
            width:34px;
            height:39px;
            position: absolute;
            left:70px;
            top:50%;
            margin-top: -19.5px;
            text-align: center;
            background: url('/static/img/logo.png') no-repeat;
        }
        .ivu-menu-item{
            color:#fff;
            font-size:16px;
            border-bottom: 0px solid transparent !important;
        }
        .ivu-menu-item:hover{
            color: #2d8cf0 !important;
            border-bottom:none !important;
        }
    }
    .ivu-menu-horizontal {
        height: 80px;
        line-height: 80px;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item-active{
        color: #2d8cf0 !important;
        border-bottom: none !important;
    }
    .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item{
        color:#fff;
    }
    .header-menu:after{
        height:0px !important;
    }
    .login{
        position: absolute;
        top:0;
        right:40px;
        line-height: 80px;
        height:80px;
        color:#fff;
        z-index:9;
        .log-in-out{
            border:none;
            background: none;
            color:#fff;
        }
        .ivu-btn:focus {
            -webkit-box-shadow: none;
            box-shadow: none;
        }
        img{
            width: 21px;
            height: 21px;
            display: inline-block;
            vertical-align: middle;
        }
    }
}
    
        
</style>
