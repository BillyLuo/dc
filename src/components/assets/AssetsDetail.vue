<template>
  <div class="asset-detail">
    <h3><span>我的财务管理</span></h3>
    <div class="financial-management">
      <div>
        <!-- <span style="color:#666;">起始时间：</span>
        <DatePicker v-model="startDate" @on-change="chooseStartDate" :editable="false" type="date" placeholder="请选择开始时间" style="width: 200px"></DatePicker>
        <span style="margin: 0 20px;"> ~ </span>
        <DatePicker v-model="endDate" @on-change="chooseEndDate" :editable="false" type="date" placeholder="请选择结束时间" style="width: 200px;margin-right:30px;"></DatePicker> -->
        <!-- <Button size="small" @click="chooseDate(0)" :type="setDayActive == 0 ? 'primary' : 'ghost'">今天</Button>
        <Button size="small" @click="chooseDate(7)" :type="setDayActive == 7 ? 'primary' : 'ghost'">7天</Button>
        <Button size="small" @click="chooseDate(15)" :type="setDayActive == 15 ? 'primary' : 'ghost'">15天</Button>
        <Button size="small" @click="chooseDate(30)" :type="setDayActive == 30 ? 'primary' : 'ghost'">30天</Button> -->
        <div style="padding:4px 0;font-size:12px;color: #f00;">{{dateErr}}</div>
      </div>
      <div>
        <span style="color:#666">操作类型：</span>
        <Select :class="'dark-mode'" @on-change="changeType" :filterable="true" v-model="operation_type" style="width:200px;margin: 30px 0;">
          <Option v-for="(item) in typeList" :value="item.value+'-'+item.type" :key="item.value+'-'+item.type">{{ item.label }}</Option>
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
      endDate:"",
      setDayActive:7,
      dateErr:'',
      types:"",
      operation_type: '',
      typeList: [],
      account_detail_column: [
        {
          title: '币种',
          key: 'coin',
          sortable: true
        },
        {
          title: '交易时间',
          key: 'createdTime',
          sortable: true
        },
        {
          title: '类型',
          key: 'operateType',
          sortable: true,
          render: (h,param) =>{
            // console.log(param.row)
            if(param.row.operateType == "1"){
              return h("span","充币")
            }else if(param.row.operateType == "2"){
              return h("span","提币")
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
          key: 'serviceCharge',
          // sortable: true,
          sortMethod(a,b,type){
            if (type == 'asc') {
              return a - b;
            }else {
              return b - a;
            }
          },
          render: (h,param) =>{
            return h("span",Number(param.row.serviceCharge).toFixed(6))
          }
        },
        {
          title: '状态',
          key: 'status',
          // sortable: true,
          render: (h,params) =>{
              // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
              if(params.row.status == "1"){
                  return h("span","充值到账")
              }else if(params.row.status == "2" ){
                  return h("span","提币中")
                  
              }else if(params.row.status == "3" ){
                  return h("span","提币到账")
              }else if(params.row.status == "4"){
                  return h("span","提币失败")
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
  mounted(){
    
    this.getBi();
    this.getAssetsDetail();
  },
  methods:{
    getBi(){
      this.typeList = [];
      let that =this;
      this.$ajax.post('/trade/tps/pblaf.do',{
        reqresource:1,
        pageno:1,
        pagesize:100
      }).then((data) => {
        console.log('success',data);
        let list = (data.data && data.data.accountFund) ? data.data.accountFund : [];
        let formatList1 = list.map((value, index) => {
          let result = {};
          result.label = value.currencyname+"提现";
          result.value = value.currencyname;
          result.type = "2"
          return result;
        });
        let formatList2 = list.map((value,index)=>{
          let result = {};
          result.label = value.currencyname+"充值";
          result.value = value.currencyname;
          result.type = "1"
          return result;
        })
        that.typeList = formatList1.concat(formatList2);
      })
    },
    chooseStartDate(value) {
      this.startDate = value;
    },
    changeType(value) {
      console.log(value);
      // // if(value){
      //   console.log(value.split("-")[1]+"======="+value.split("-")[0])
        this.types = value;
        // this.operation_type = value.split("-")[0]
      // }
      
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
      let starttime = this.startDate;
      let endtime = this.endDate;
      let coin = this.operation_type?this.types.split('-')[0]:"";
      this.account_detail_data=[]
      if (starttime) {
        starttime = moment(this.startDate).format('YYYY-MM-DD 00:00:00');
      }else {
        starttime = '';
      } 
      if (endtime) {
        endtime = moment(this.endDate).format('YYYY-MM-DD 23:59:59');
      }else {
        // this.endDate = new Date();
        // endDate = moment().format('YYYY-MM-DD');
        this.endDate = ""
      }
      console.log({
        coin,
        starttime,
        endtime
      });
      this.dateErr = '';
      if (starttime && endtime) {
        if (moment(endtime).isBefore(starttime)) {
          this.dateErr = '查询开始时间应小于结束时间';
          return false;
        }
      }
      this.$ajax.post('/trade/tps/pbqrw.do',{
        coin,
        // starttime,
        // endtime,
        reqresource:1,
        pageno,
        pagesize
      }).then((res)=>{
        console.log('-----detail',res);
        if (res.status == 200 && res.data.err_code == '1') {
          if(res.data.recordDetail){
            console.log(res.data.recordDetail)
            console.log("------")
            console.log(that.types)
            if(this.types.split('-')[1]){
              console.log("------")
              res.data.recordDetail.map((item)=>{
                if(that.types.split('-')[1] == item.operateType){
                  that.account_detail_data.push(item)
                  console.log(item)
                }
              })
            }else{
              that.account_detail_data = res.data.recordDetail
            }
            
            
            
          }
          // if (res.data && res.data.page) {
          //   that.detailPageTotal = res.data.page.sum*1 ? res.data.page.sum*1 : 0 ;
          // }
          // if(res.data.accountDetail && res.data.accountDetail.length){
          //   that.account_detail_data = res.data.accountDetail
          // }else {
          // }
        }else {
          console.log("----")
          that.$Message.warning('获取资产详情失败,请稍后重试');
        }
      }).catch((err)=>{
        console.warn('获取资产详情失败');
        that.$Message.warning('获取资产详情失败,请稍后重试');
      })
      // this.$ajax.post('/trade/tps/pblad.do',{
      //   operation,
      //   startDate,
      //   endDate,
      //   reqresource:1,
      //   pageno,
      //   pagesize
      // }).then((res)=>{
      //   console.log('-----detail',res.data.accountDetail);
      //   if (res.status == 200 && res.data.err_code == '1') {
      //     if (res.data && res.data.page) {
      //       that.detailPageTotal = res.data.page.sum*1 ? res.data.page.sum*1 : 0 ;
      //     }
      //     if(res.data.accountDetail && res.data.accountDetail.length){
      //       that.account_detail_data = res.data.accountDetail
      //     }else {
            
      //     }
      //   }else {
      //     Message.warning('获取资产详情失败,请稍后重试');
      //   }
      // }).catch((err)=>{
      //   console.warn('获取资产详情失败');
      //   Message.warning('获取资产详情失败,请稍后重试');
      // })
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
  }
</style>
