<template>
  <div class="coin-address">
    <div style="background:#2a2a2a;box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);height:72px;line-height: 72px;color: #fff;padding: 0 20px;font-size: 16px;">
      提币地址管理
    </div>
    <div class="fund-account-inner">
      <Row>
        <Col span="4">
          <span>币种</span>
        </Col>
        <Col span="8">
          <span>提币地址</span>
        </Col>
        <Col span="8">
          <span>备注</span>
        </Col>
        <Col span="4"> </Col>
      </Row>
      <Row>
      <Col span="4">
          <Select v-model="fund_account_active" :class="'dark-mode'" size="large" @on-change="changeFundAccount">
            <Option v-for="(item) in fund_account_lists" :value="item.currencyname" :key="item.currencyname"></Option>
          </Select>
        </Col>
        <Col span="8">
          <input class="account-input" v-model="adress" placeholder="提币地址"/>
        </Col>
        <Col span="8">
          <input class="account-input" v-model="remark"  placeholder="备注"/>
        </Col>
        <Col span="4">
          <Button size="large" class="btn-block" type="primary" @click="address">添加</Button>
        </Col>
      </Row>
    </div>
    <div style="background:#2a2a2a;box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);height:72px;line-height: 72px;color: #fff;padding: 0 20px;font-size: 16px;">
      地址列表
    </div>
    <Table :class="'no-border-table dark-mode'" :columns="addressColumns" :data="addresslist"></Table>
    <Modal
        v-model="addmodal"
        width="400"
        title="添加地址"
        @on-cancel="canclemodal('formValidate')">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
          <FormItem label="提现地址" prop="adress">
              <Input v-model="formValidate.adress" placeholder=""></Input>
          </FormItem>
          <FormItem v-if="fund_account_active !='ETH' " label="公钥" prop="pub">
              <Input v-model="formValidate.pub" placeholder=""></Input>
          </FormItem>
          <FormItem label="备注" prop="remark">
              <Input v-model="formValidate.remark" placeholder=""></Input>
          </FormItem>
          <FormItem label="交易密码" prop="transckcode">
              <Input type="password" v-model="formValidate.transckcode"  placeholder=""></Input>
          </FormItem>
          <FormItem label="验证码：" prop="msgcheckcode">
            <Input v-model="formValidate.msgcheckcode" placeholder="验证码" type="text">
              <a href="javascript:;" style="color: #333;" slot="append" @click="sendSetTrade">{{setTradeText}}</a>
            </Input>
          </FormItem>
          
          <div class="error_msg">
            {{ err_msg }}
          </div>
      </Form>
        <div slot="footer">
          <Button :class="'btn-block'" slot="footer" @click="handleSubmit('formValidate')" type="primary" >确定</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import { Page, Form, FormItem } from 'iview';
export default {
  components:{
    Page,Form,FormItem
  },
  data () {
    return {
      adress:'',
      remark:'',
      fund_account_active: 'ETH',
      fund_account_lists: [],
      addmodal:false,
      err_msg:"",
      formValidate: {
          adress: '',
          remark: '',
          transckcode: '',
          msgcheckcode:"",
          pub:''
      },
      addressColumns:[
        {title:'币种',key:'coin'},
        {title:'提币地址',key:'adress'},
        {title:'备注',key:'remark'},
        {title:'操作',key:'operation',render:(h,obj) => {
          let that = this;
          obj = obj.row;
          return h('div',[h('button', {
              'class': {
                'delete-address-btn': true
              },
              domProps: {
                innerHTML: '删除'
              },
              on: {
                click: this.deleteaddress.bind(this,obj.walletAdressId)
              }
            })
          ])
        }}
      ],
      sendmessage :true,
      ruleValidate: {
        adress: [
            { required: true, message: '请输入地址', trigger: 'blur' },
            {type:'string',pattern:/^\w{2,42}$/,max:42,message:'提现地址不应超过42位，且不包含特殊字符',trigger:'blur'}
        ],
        transckcode: [
            { required: true, message: '请输入交易密码', trigger: 'blur' }
        ],
        msgcheckcode: [
            { required: true, message: '请输入短信验证码', trigger: 'blur' }
        ],
        remark:[
          {type:'string',max:200,message:'备注不应超过200位',trigger:'blur'}
        ],
        pub:[
          { required: true, message: '请输入地址', trigger: 'blur' },
        ]
      },
      setTradeText:'发送验证码',
      addresslist:[],
      sendTradeTimer:true,
    }
  },
  mounted (){
    this.getCurrency();
  },
  methods:{
    getCurrency(){
      let that=this;
      this.$ajax({
        method:"post",
        url:"/trade/tps/pbfct.do",
        data:{
          reqresource:1
        }
      }).then((res)=>{
        console.log(res)
        if(res.data.currencys && res.data.err_code == "1" && res.data){
          console.log(res.data.currencys)
          that.fund_account_lists = res.data.currencys
        }
      }).catch((err)=>{

      })
    },
    canclemodal(name){
      this.$refs[name].resetFields();
      this.adress = '';
      this.remark = '';
      this.setTradeText = "发送验证码";
      this.sendmessage = true;
      clearInterval(this.sendTradeTimer);
    },
    deleteaddress(value){//删除地址
      let that=this;
      console.log("deleteaddress======",value)
      this.$Modal.confirm({
          title: '确认删除',
          content: '<p>是否删除该地址？</p>',
          loading: true,
          onOk: () => {
            console.log("onOK")
              that.$ajax({
                method: "post",
                url:"/trade/tps/pbwam.do",
                data:{
                  reqresource:1,
                  walletAdressId:value
                }
              }).then((res)=>{
                  if (res.status == 200 && res.data && res.data.err_code == '1') {
                    this.$Modal.remove();
                    that.$Message.success("删除成功");
                    that.selectaddress();
                  }else {
                    that.$Message.error("删除失败");
                  }
              })
              
              
          }
      });
    },
    handleSubmit (name) {//添加地址
        console.log("name======",name)
        let that = this;
        console.log(that.formValidate)
        that.formValidate['coin'] = that.fund_account_active;
        that.formValidate['reqresource'] =1;
        console.log(that.formValidate)
        this.$refs[name].validate((valid) => {
          if (valid) {
              that.$ajax({
                method:"post",
                url:"/trade/tps/pbwam.do",
                data:that.formValidate
              }).then((data)=>{
                if(data.data && data.data.err_code=="1"){
                  that.addmodal = false;
                  that.$Message.success("添加成功");
                  that.selectaddress()
                  that.$refs.formValidate.resetFields();
                  that.remark = '';
                  that.adress = '';
                }else{
                  that.err_msg = data.data.msg
                }
                  
              })
          } else {
            return false;
              // this.$Message.error('Fail!');
          }
        })
    },
    sendSetTrade(){//短信验证码
      let that = this;
      let num = 60;
      if(this.sendmessage){
        this.sendmessage = false;
        that.sendTradeTimer = setInterval(function () {
          if (num > 1) {
            num -- ;
            that.setTradeText = num + 's后重新获取';
          }else {
            that.setTradeText = '发送验证码';
            clearInterval(that.sendTradeTimer);
            that.sendmessage = true;
          }
        },1000);
      }else{
        console.log("多次点击 ==========")
        return false;
      }

      this.$ajax.post('/trade/tps/pbscs.do',{
        reqresource:1
      }).then((res) => {
        console.log('短信验证',res);
        if (res.status == 200 && res.data && res.data.err_code == '1') {
          that.$Message.success('短信已发送');
        }else {
          that.$Message.warning('短信发送失败，请稍后重试。');
          that.err_msg =  res.data.msg;
        }
      }).catch((err) => {
        console.log(err);
        that.$Message.success('短信发送失败，请稍后重试。');
      })
      
      
    },
    address(){//点击添加地址
      this.addmodal = true;
      this.formValidate.adress = this.adress;
      this.formValidate.remark = this.remark;
      this.err_msg = "";
    },
    changeFundAccount(value) {//选择币种
      this.fund_account_active = value;
      console.log("a---click",value)
      console.log(this.fund_account_active)
      this.selectaddress()
    },
    selectaddress() {//查询地址
      let that=this;
      this.$ajax({
          method:"post",
          url:"/trade/tps/pbqwa.do",
          data:{
            reqresource:1,
            coin:that.fund_account_active
          }
        }).then((data)=>{
          console.log('address---list---',data)
          if(data.data && data.data.err_code == "1"){
            that.addresslist = data.data.walletAdress
          }
        })
    },
  }
}
</script>

<style lang="scss">
  .fund-account-inner {
    color: #666;
  }
</style>
