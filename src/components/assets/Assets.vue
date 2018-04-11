<template>
  <div id="assets" class="">
    <!-- <user-info></user-info> -->
    <div class="account-manage">
      <Tabs :class="'vertical-tab'" v-model="currentTab" :animated="false" @on-click="tabClick">
        <TabPane :label="label1" name="accountAssets">
          <router-view></router-view>
        </TabPane>
        <TabPane :label="label2" name="accountDetail">
          <h3><span>我的财务管理</span></h3>
          <div class="financial-management">
            <div>
              <span>起始时间：</span>
              <DatePicker v-model="startDate" @on-change="chooseStartDate" :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
              <span style="margin: 0 20px;"> ~ </span>
              <DatePicker v-model="endDate" @on-change="chooseEndDate" :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker>
              <!-- <Button size="small" @click="chooseDate(0)" :type="setDayActive == 0 ? 'primary' : 'ghost'">今天</Button>
              <Button size="small" @click="chooseDate(7)" :type="setDayActive == 7 ? 'primary' : 'ghost'">7天</Button>
              <Button size="small" @click="chooseDate(15)" :type="setDayActive == 15 ? 'primary' : 'ghost'">15天</Button>
              <Button size="small" @click="chooseDate(30)" :type="setDayActive == 30 ? 'primary' : 'ghost'">30天</Button> -->
              <div style="padding:4px 0;font-size:12px;color: #f00;">{{dateErr}}</div>
            </div>
            <div>
              <span>操作类型：</span>
              <Select @on-change="changeType" :filterable="true" v-model="operation_type" style="width:200px;margin: 30px 0;">
                <Option v-for="item in typeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
              <Button type="primary" :style="{width: '100px',fontSize:'14px',marginLeft:'20px'}" @click="getAssetsDetail">查询</Button>
            </div>
            <Table :class="'no-border-table dark-mode'" stripe :columns="account_detail_column" :data="account_detail_data" />
            <div class="pager">
              <div class="pager-inner">
                <Page  
                  :total="detailPageTotal" 
                  show-total
                  placement="top"
                  :page-size-opts="pageSizeOpts"
                  @on-change="change"
                  @on-page-size-change="pageSizeChange" 
                  show-sizer
                  show-elevator
                />
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane :label="label3" name="fundAccount">
          <div class="fund_account">
            <a href="javascript:;" :class="{active:fund_account_active == item.currencyname}" v-for="(item) in fund_account_lists" :key="item.currencyname" @click="changeFundAccount(item.currencyname)">
              <span>{{item.currencyname}} 提现管理</span>
            </a>
          </div>
          <div class="address_add">
            <div class="address_list">
              <div class="showaddress" v-for="(item) in addresslist" :key="item.name">
                <div class="icon-text">
                  <span class="icon-trash" @click="deleteaddress(item.walletAdressId );"><Icon type="trash-a"></Icon></span>
                  <span class="address-text">{{ item.adress }}</span>
                </div>
                
              </div>
            </div>
            <div class="address" @click="address">
              <img src="/static/img/blank-img-01.png" alt="">
              <p>添加地址</p>
            </div>
          </div>
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
        </TabPane>
        <!-- <TabPane :label="label4" name="fundsManagement">
          <h3><span>我的资产管理</span></h3>
        </TabPane>-->
        <!-- <TabPane label="我的COINS" name="myCoin">
          <myCoin></myCoin>
        </TabPane> -->
      </Tabs>
    </div>
  </div>
</template>

<script>
  import { pageSizeOpts } from '../constant/constant';
  import {Message} from '../../utils/message';
  import myCoin from './myCoin';
  import userInfo from '../user/userBaseInfo';
  import { Tabs,TabPane,DatePicker,Table,Form,Page, FormItem } from 'iview';
  import moment from 'moment';
  var telReg = /^1[34578]\d{9}$/;
  export default {
    components: {
      Table,
      DatePicker,
      Tabs,
      myCoin,
      TabPane,
      Form, FormItem,
      Page,
      'user-info': userInfo
    },
    data() {
      return {
        currentTab:'accountAssets',
        pageSizeOpts,
        detailPageNo:1,
        detailPageSize:10,
        detailPageTotal:0,
        operation_type: '1',
        addmodal:false,
        err_msg:"",
        formValidate: {
            adress: '',
            remark: '',
            transckcode: '',
            msgcheckcode:"",
            pub:''
        },
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
        label1: (h) => {
          return h('div', [
            h('span', '账户资产')
          ])
        },
        label2: (h) => {
          return h('div', [
            h('span', '账户明细')
          ])
        },
        label3: (h) => {
          return h('div', [
            h('span', '资金账号')
          ])
        },
        label4: (h) => {
          return h('div', [
            h('span', '资金管理')
          ])
        },
        typeList: [{
            label: 'BTC提现',
            value: '1'
          },
          {
            label: 'ETH提现',
            value: '2'
          },
          {
            label: 'BHC提现',
            value: '3'
          }
        ],
        account_list_data: [
  
        ],
        account_detail_column: [{
            title: '交易时间',
            key: 'tradetime',
            sortable: true
          },
          {
            title: '类型',
            key: 'tradetype',
            sortable: true,
            render: (h,param) =>{
              console.log(param.row)
              if(param.row.tradetype == "1"){
                return h("span","买入")
              }else if(param.row.tradetype == "2"){
                return h("span","卖出")
              }
            }
          },
          {
            title: '金额',
            key: 'amount',
            sortable: true,
            sortMethod(a,b,type){
              if (type == 'asc') {
                return a - b;
              }else {
                return b - a;
              }
            },
            render: (h,param) =>{
              return h("span",Number(param.row.amount).toFixed(6))
            }
          },
          {
            title: '手续费',
            key: 'servicecharge',
            sortable: true,
            sortMethod(a,b,type){
              if (type == 'asc') {
                return a - b;
              }else {
                return b - a;
              }
            },
            render: (h,param) =>{
              return h("span",Number(param.row.servicecharge).toFixed(6))
            }
          },
          {
            title: '状态',
            key: 'status',
            sortable: true,
            render: (h,params) =>{
                // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                if(params.row.status == "1"){
                    return h("span","已成交")
                }else if(params.row.status == "3" ){
                   return h("span","部分成交")
                    
                }else if(params.row.status == "0" ){
                   return h("span","已提交")
                }else if(params.row.status == "2"){
                    return h("span","已撤销")
                }else if(params.row.status == "4"){
                    return  h('span', "部分成交撤销");
                }
            }
          },
        ],
        account_detail_data: [
  
        ],
        fund_account_active: 'ETH',
        fund_account_lists: [
        ],
        startDate:'',
        endDate:new Date(),
        setDayActive:7,
        dateErr:'',
        addresslist:[
         
        ],
        sendTradeTimer:true,
      }
    },
    mounted(){
      this.getAssetsDetail();
      this.getCurrency();
    },
    methods: {
      change(value){
        this.detailPageNo = value;
        this.getAssetsDetail();
      },
      pageSizeChange(value) {
        this.detailPageSize = value;
        this.getAssetsDetail();
      },
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
        console.log("============",this.fund_account_active)
        this.addmodal = true;
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
            console.log(data)
            if(data.data && data.data.err_code == "1"){
              that.addresslist = data.data.walletAdress
            }
          })
      },
      changeType(value) {
        console.log(value);
      },
      chooseStartDate(value) {
        this.startDate = value;
      },
      chooseEndDate(value) {
        console.log(value);
        this.endDate = value;
      },
      chooseDate(value) {
        this.setDayActive = value;
        var endDate = this.endDate;
        endDate = new Date();
        this.endDate = endDate;
        if (value == 0 ) {
          this.startDate = this.endDate;
          console.log(this.startDate);
        }else if (value) {
          var day = moment(endDate).subtract(value, 'days').toDate();
          this.startDate = day;
        }
      },
      tabClick(name) {//点击侧菜单
        // console.log('name---',name,this.currentTab);
        let that =this;
        if (name == 'accountAssets') {
          this.$router.push({
            path:'/assets'
          })
        }

        if(name == "fundAccount"){
          this.selectaddress()
        }
        if(name=='accountDetail'){
          this.getAssetsDetail();
        }
      },
      getAssetsDetail(){
        var pageno = this.detailPageNo;
        var pagesize = this.detailPageSize;
        let that =this;
        let startDate = this.startDate;
        let endDate = this.endDate;
        let operation = this.operation_type;
        if (startDate) {
          startDate = moment(this.startDate).format('YYYY-MM-DD');
        }else {
          startDate = '';
        } 
        if (endDate) {
          endDate = moment(this.endDate).format('YYYY-MM-DD');
        }else {
          // this.endDate = new Date();
          // endDate = moment().format('YYYY-MM-DD');
          this.endDate = ""
        }
        console.log({
          operation,
          startDate,
          endDate
        });
        this.dateErr = '';
        if (startDate && endDate) {
          if (moment(endDate).isBefore(startDate)) {
            this.dateErr = '查询开始时间应小于结束时间';
            return false;
          }
        }
        this.$ajax.post('/trade/tps/pblad.do',{
          operation,
          startDate,
          endDate,
          reqresource:1,
          pageno,
          pagesize
        }).then((res)=>{
          console.log('-----detail',res.data.accountDetail);
          if (res.status == 200 && res.data.err_code == '1') {
            if (res.data && res.data.page) {
              that.detailPageTotal = res.data.page.sum*1 ? res.data.page.sum*1 : 0 ;
            }
            if(res.data.accountDetail && res.data.accountDetail.length){
              that.account_detail_data = res.data.accountDetail
            }else {
              
            }
          }else {
            Message.warning('获取资产详情失败,请稍后重试');
          }
        }).catch((err)=>{
          console.warn('获取资产详情失败');
          Message.warning('获取资产详情失败,请稍后重试');
        })
      }
    },
    filters: {
      'formatmoney' (value) {
        value = value.toString();
        if (!value) {
          return '';
        } else {
          return '$' + value;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import '../../my-theme/mixin.scss';
  #assets{
    width:1200px;
    margin: 0 auto;
    margin-top:80px;
  }
  #assets {
    background: #2C2D2F;
  }
  .account-manage {
    padding-top:20px;
    .ivu-tabs-tabpane {
      &>h3 {
        font-weight: 400;
        padding-left: 20px;
        span {
          display: inline-block;
          padding-bottom: 10px;
          border-bottom: 2px solid $primary-color;
        }
      }
    }
    .ivu-tabs-nav-wrap {
      margin-bottom: 0;
    }
    .ivu-tabs {
      .ivu-tabs-ink-bar {
        display: none !important;
      }
      .ivu-tabs-bar {
        border: none;
        float: left;
        font-size: 16px;
        font-weight: 400;
        width: 170px;
        position: absolute;
        top: 0;
        bottom:-16px;
        z-index: 10;
        background: #353535;
      }
      .ivu-tabs-nav {
        background: #353535;
        width: 100%;
      }
      .ivu-tabs-content {
        width: 1020px;
        padding: 20px;
        float: right;
        min-height: 400px;
        background: #353535;
      }
      .ivu-tabs-tab {
        color: #596980;
        display: block;
        padding: 20px 50px;
        margin: 0;
        border-bottom: 1px solid #414448;
        &:hover {
          color:#fff;
        }
      }
      .ivu-tabs-tab-active {
        border-right: 0;
        border-bottom-color: #4CB2F9;
        color: #fff;
        font-size: 16px;
      }
    }
    .no-border-table.ivu-table-wrapper {
      border-left: 0;
      .ivu-table::after {
        height: 0;
      }
    }
  }
  
  .account-list {
    h3 {}
  }
  
  .account-options {
    button {
      width: 54px;
      height: 22px;
      border: 0;
      border-radius: 4px;
      margin: 4px;
      color: #fff;
      outline: none;
      opacity: 0.85;
      cursor: pointer;
    }
    button:hover {
      opacity: 1;
    }
    .account-in {
      background:#566670;
    }
    .account-out {
      background: #4CB2F9;
    }
  }
  
  //财务管理
  .financial-management {
    padding: 20px;
    button {
      margin: 0 6px;
    }
  }
  
  //资金账号
  .fund_account {
    a {
      display: inline-block;
      span {
        color: #495060;
        font-size: 16px;
      }
      padding: 10px 0;
      margin: 0 20px;
      opacity: 0.6;
      transition: 0.2s;
    }
    a:hover,
    a.active {
      position: relative;
      opacity: 1;
    }
    a:hover::after,
    a.active::after {
        content:"";
        display:"inline-block";
        width:100%;
        height:2px;
        position: absolute;
        bottom:0;
        left:0;
        background: #2d8cf0;
    }
  }
  .address_add{
    .address{
      text-align: center;
      width:400px;
      padding:30px;
      border:1px solid #eee;
      border-radius: 10px;
      margin-top:30px;
      margin-left:10px;
    }
    .address_list{
      margin-top:30px;
    }
    .showaddress{
      width:25%;
      height:60px;
      display: inline-block;
      padding:0px 10px;
      color:#333;
      vertical-align: middle;
      margin-bottom:10px;
      .icon-text{
        padding:10px 30px 10px 10px;
        height:100%;
        border:1px solid #eee;
        border-radius:5px;
        position: relative;
        color: #f1f1f1;
      }
      .icon-trash{
        position: absolute;
        color: #80848f;
        font-size:20px;
        right:10px;
        top:6px;
        padding: 2px;
        &:hover {
          color:#2d8cf0;
          cursor: pointer;
        }
      }
      .address-text{
        display: inline-block;
        width:100%;
        word-wrap:break-word;
      }
      
    }
  }
  .error_msg{
      text-align: center;
      color:#f00;
      font-size:14px;
    }
</style>
