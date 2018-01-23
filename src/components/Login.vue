<template>
  <div>
    <div class="wallet-box">
      <div id="particles-js"></div>
      <div class="login-box-background">
        <Card style="width:100%" :class="'login-card'">
          <div style="text-align:center">
            <img src="/static/img/logo.png">
            <h3>登录蜂巢链-fclink</h3>
          </div>
        </Card>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :class="'login-form-all'">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="输入邮箱/手机号" :class="'login-input'">
              <Icon type="ios-person-outline" slot="prepend" :class="'login-input-icon'"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="密码" :class="'login-input'">
            <Icon type="ios-locked-outline" slot="prepend" :class="'login-input-icon'"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="tel">
            <Input type="text" v-model="formInline.tel" placeholder="手机号" :class="'login-input'">
            <Icon type="ios-telephone-outline" slot="prepend" :class="'login-input-icon'"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="verificationCode">
            <Input type="text" v-model="formInline.verificationCode" placeholder="验证码" :class="'login-input'" style="width: 200px">
            </Input>
            <Button type="primary" :class="'verification-code-button'">获取验证码</Button>
          </FormItem>
          <br />
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" :class="'login-form-button'">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    mounted () {
        particlesJS('particles-js', {
          particles: {
            color: '#fff',
            shape: 'circle', // "circle", "edge" or "triangle"
            opacity: 0.5,
            size: 4,
            size_random: true,
            nb: 150,
            line_linked: {
              enable_auto: true,
              distance: 100,
              color: '#fff',
              opacity: 1,
              width: 1,
              condensed_mode: {
                enable: false,
                rotateX: 600,
                rotateY: 600
              }
            },
            anim: {
              enable: true,
              speed: 1
            }
          },
          interactivity: {
            enable: true,
            mouse: {
              distance: 250
            },
            detect_on: 'canvas', // "canvas" or "window"
            mode: 'grab',
            line_linked: {
              opacity: .5
            },
            events: {
              onclick: {
                enable: true,
                mode: 'push', // "push" or "remove" (particles)
                nb: 4
              }
            }
          },
          /* Retina Display Support */
          retina_detect: true
        });
    },
    data () {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: '请输入邮箱或姓名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码.', trigger: 'blur' },
            { type: 'string', min: 6, message: '密码不能小于6位', trigger: 'blur' }
          ],
          tel: [
            { required: true, message: '请输入手机号.', trigger: 'blur' },
            { type: 'string', min: 11, message: '手机号格式不正确', trigger: 'blur' }
          ],
          verificationCode: [
            { required: true, message: '请输入验证码.', trigger: 'blur' },
          ]
        },
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          console.log("aaa",this.formInline.user,this.formInline.password);

          if (valid) {
            //this.$Message.success('Success!');
            this.timeoutDate()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      timeoutDate(){   //查询数据
        this.handleSpinCustomShow();
        let $this = this;
        let md = this.nodeForge.md.md5.create();
        md.update(this.formInline.password);
        const password = md.digest().toHex();
        this.$ajax({
          method: 'post',
          url: 'bizs/lio/pblin.do?fh=LINLIO0000000J00&resp=bd',
          data: {
            "user_name":this.formInline.user,
            "password":password,
            "login_type":1,
            "menu_type":1
          }
        }).then(function (response) {
          $this.handleSpinCustomClose();
          console.log(response);
        }).catch(function (error) {
          console.log(error);
        });
      },
      handleSpinCustomShow () {
        this.$Spin.show({
          render: (h) => {
            return h('div', [
              h('Icon', {
                'class': 'demo-spin-icon-load',
                props: {
                  type: 'load-c',
                  size: 18
                }
              }),
              h('div', '验证消息中...')
            ])
          }
        });
      },
      handleSpinCustomClose (){
        this.$Spin.hide();
        this.$Message.success('Success!');
      }
    }
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  .wallet-box{
    position: relative;
    width: 100%;
  }
  #particles-js{
    width: 100%;
    height: 450px;
    background: linear-gradient(to right,#afaee866,#d7d6f3,#afaee866,#6486d257,#afaee866,#fff);
    position: absolute;
    z-index: 0
  }
  .login-box-background{
    position: absolute;
    top: 0;
    right: 0;
    width: 400px;
    box-sizing: border-box;
    padding: 45px;
    padding-top: 25px;
    height: 450px;
    z-index: 1
  }
  .login-form-all>.ivu-form-item{
    width:100%;
    margin: 13px 0;
  }
  .login-input>.ivu-input-group-prepend{
    height: 40px;
  }
  .login-input-icon{
    font-size: 20px;
    font-weight: 600;
  }
  .login-input>.ivu-input{
    height:40px;
  }
  .verification-code-button{
    position: absolute;
    top: 0px;
    right: 0px;
    height: 38px;
    border-radius: 0px;
    border-style: none;
  }
  .login-form-button{
    width: 100%;
    height: 35px;
  }
  .login-card{
    background: #ffffff69;
    border: none;
  }
  .demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
