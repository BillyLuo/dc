<template>
  <div class="asset-detail">
    <h3><span>我的财务管理</span></h3>
    <div class="financial-management">
      <div>
        <span style="color:#666;">起始时间：</span>
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
        <span style="color:#666">操作类型：</span>
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
  </div>
</template>

<script>
import { DatePicker, Page } from 'iview';
import { pageSizeOpts } from '../constant/constant';
import moment from 'moment';
export default {
  data () {
    return {
      pageSizeOpts,
      detailPageNo:1,
      detailPageSize:10,
      detailPageTotal:0,
      startDate:'',
      endDate:new Date(),
      setDayActive:7,
      dateErr:'',
      operation_type: '1',
      typeList: [
        {
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
      account_detail_column: [
        {
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
    }
  },
  components:{
    DatePicker,Page
  },
  methods:{
    chooseStartDate(value) {
      this.startDate = value;
    },
    changeType(value) {
      console.log(value);
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
    change(value){
      this.detailPageNo = value;
      this.getAssetsDetail();
    },
    pageSizeChange(value) {
      this.detailPageSize = value;
      this.getAssetsDetail();
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
  }
}
</script>

<style lang="scss">
  .asset-detail h3 {
    background: rgb(42, 42, 42);
    box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 4px 0px;
    height: 72px;
    line-height: 72px;
    color: rgb(255, 255, 255);
    padding: 0px 20px;
    font-size: 16px;
    margin-bottom: 20px;
  }
</style>
