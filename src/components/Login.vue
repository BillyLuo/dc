<template>
  <div>
    <div class="wallet-box">
      <div id="particles-js"></div>
      <div class="login-box-background">
        <Card style="width:100%" :class="'login-card'">
          <div style="text-align:center">
            <img src="../../static/img/coin/icon-eth.png">
            <h3>登录蜂巢链-fclink</h3>
          </div>
        </Card>
        <Form ref="formInline" :model="formInline" :rules="ruleInline" inline :class="'login-form-all'">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" placeholder="Username" :class="'login-input'">
              <Icon type="ios-person-outline" slot="prepend" :class="'login-input-icon'"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" placeholder="Password">
            <Icon type="ios-locked-outline" slot="prepend" :class="'login-input-icon'"></Icon>
            </Input>
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
            opacity: 1,
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
            { required: true, message: 'Please fill in the user name', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'Please fill in the password.', trigger: 'blur' },
            { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
          ]
        },
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        })
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
    background: linear-gradient(to right,blue,#fff);
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
    height: 450px;
    z-index: 1
  }
  .login-form-all>.ivu-form-item{
    width:100%;
    margin: 25px 0;
  }
  .login-input>.ivu-input-group-prepend{
    height: 50px;
  }
  .login-input-icon{
    font-size: 20px;
    font-weight: 600;
  }
  .login-input>.ivu-input{
    height:50px;
  }
  .login-form-button{
    width: 100%;
    height: 35px;
  }
  .login-card{
    background: #ffffff69;
    border: none;
  }
</style>
