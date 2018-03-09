<template>
  <div class="name-certification level1">
    <div class="clear">
      <div class="float-left">
        重要<span style="color: #2d8cf0;">提示</span>
      </div>
      <div class="float-right">
        <p>您还没有实名认证，请<Button type="ghost" size="small" @click="identify">立即认证身份</Button>。</p>
        <p>
          实名认证一旦成功，不予修改和解除认证，不予变更认证方式。建议您谨慎选择，真实填写。
        </p>
      </div>
    </div>
    <Modal v-model="showModal" title="实名认证" :class="'identify-modal'">
      <Form :label-width="80" style="width: 400px;margin: 0 auto;">
        <FormItem label="真实姓名：">
          <Input placeholder="真实姓名" v-model="realname"/>
          <div style="line-height: 18px;color: #f00;font-size:12px;padding: 10px 0;">
            *请填写真实姓名，认证后不能更改，提现是需要与银行等姓名信息保持一致。
          </div>
        </FormItem>
        <FormItem label="地区/国家：">
          <Select v-model="country">
            <Option value="1">中国大陆(China)</Option>
          </Select>
        </FormItem>
        <FormItem label="证件类型：">
          <Select v-model="identifyType" @on-change="changeType">
            <Option value="1">
              身份证
            </Option>
            <Option value="2">
              港澳台
            </Option>
          </Select>
        </FormItem>
        <FormItem label="证件号码：">
          <Input placeholder="证件号码" v-model="identifyNum"/>
        </FormItem>
        <FormItem>
          <div>
            <Checkbox v-model="idsure">
              <span style="margin-left: 10px">我保证提交的信息实属本人所有，非盗用他人证件</span>
              </Checkbox>
          </div>
        </FormItem>
        <div class="error-msg">{{errorMsg}}</div>
      </Form>
      <div slot="footer">
        <Button type="primary" class="btn-block" @click="submitIdentification">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {Form , FormItem } from 'iview';
export default {
  components:{
    Form,FormItem
  },
  data(){
    return {
      showModal:true,
      realname:'',
      country:'1',
      identifyType:'1',
      identifyNum:'',
      idsure:false,
      errorMsg:''
    }
  },
  methods:{
    identify () {
      this.showModal = true;
    },
    changeType(value) {
      console.log('value',value);
    },
    submitIdentification() {
      let realname = this.realname.trim();
      let region = this.country;
      let certificatetype = this.identifyType;
      let certificateno = this.identifyNum.trim();
      if (realname && realname.match(/^[\u4E00-\u9FA5]{2,8}$/g) ) {
        this.errorMsg = '';
      }else {
        this.errorMsg = '请输入正确的姓名，姓名只能是汉字';
        return false;
      }
      if (certificateno && certificateno.match(/^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/)){
        this.errorMsg = '';
      }else {
        this.errorMsg = '请输入合格的身份证号码';
        return false;
      }
      console.log({realname,region,certificatetype,certificateno});
      this.$ajax.post('/trade/tps/pbvcs.do',{
        realname,region,certificatetype,certificateno
      }).then((res)=>{
        console.log(res,res.data);
      }).catch((err)=>{
        console.log(err);
      })
      // this.showModal = false;
      // this.$emit('levelChange',{level:1});
    }
  }
}
</script>

<style scoped lang="scss">
  .name-certification {
    padding: 20px;
    .float-left {
      font-size: 20px;
      line-height: 60px;
      width: 20%;
    }
    .float-right {
      width: 80%;
      p {
        color: #666;
        line-height: 2em;
        .ivu-btn {
          margin: 0 4px;
          color: #2d8cf0;
        }
      }
    }
  }
  .identify-modal {
    .error-msg {
      font-size: 12px;
      line-height: 18px;
      color: #f00;
      text-align: center;
    }
  }
</style>
