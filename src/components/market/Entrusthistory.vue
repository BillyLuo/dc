<template>
    <div>
        <div class="trade-time">
            <span>查询日期：</span>
            <DatePicker :value="begintime" format="yyyy-MM-dd" type="daterange"  placeholder="请选择查询日期" @on-change="timeschange" style="width: 200px"></DatePicker>
            <Button @click="weituojilu">刷新统计</Button>
        </div>
        <div class="trade-table">
            <Table :data="weituo_data" :columns="weituo_columns" stripe></Table>
            <Table height="300" :loading="loading" :data="order_record_data" no-data-text="<span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            <div style="margin: 10px;overflow:hidden">
                <div style="float: right;line-height:  40px;height: 40px;">
                    <Page :page-size-opts='[10,20,30,40,50]' :total="total" show-sizer show-elevator show-total placement='top' :page-size='pagesize' :current="pageno" @on-change="changePage" @on-page-size-change='pagesizes'></Page>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {Table,Page,DatePicker} from 'iview';
import bus from '../../bus/bus';
    export default {
        components:{
            Table,Page,DatePicker
        },
        data() {
            return {
                begintime: '',
                loading:false,
                total:0,
                pagesize:10,
                pageno:1,
                jichubizhong:"",
                jijiabizhong:"",
                weituo_data:[],
                weituo_columns: [],
                order_record_data: [],
                order_record_cloumns: [
                   
                ],
            }
        },
        created(){
            let that=this;
            bus.$on('vl_currency', (val) => { //Hub接收事件
                if(val){
                    that.jichubizhong = val.currency;
                    that.jijiabizhong = val.bizhong;
                    if(val.wtls){
                        that.query_entrust();
                    }
                    this.weituolist();
                }
            });
            this.total=0;
            this.pagesize=10
            this.pageno=1;
        },
        mounted(){
            this.wt_title();
            this.weituolist();
           
        },
        methods:{
            timeschange(val){
                this.begintime = val;
            },
            weituojilu () {
                this.total=0;
                this.pagesizes=10;
                this.pageno=1;
                this.loading = true;
                this.query_entrust();
            },
            changePage(pageno){
                this.loading = true;
                this.pageno = pageno;
                this.query_entrust();  
            },
            pagesizes(pagesize){
                this.loading = true;
                this.pageno = 1;
                this.pagesize=pagesize;
                this.query_entrust();
                
            },
            wt_title(){
                this.order_record_cloumns =[
                    {
                            title: "委托时间",
                            key: "entrusttime",
                            width:100,
                        },
                        {
                            title: '类型',
                            key: 'tradetype',
                            render: (h,params) =>{
                                if(params.row.tradetype == "1"){
                                    return h("span","买入")
                                }else  if(params.row.tradetype == "2"){
                                    return h("span","卖出")
                                }
                            }
                        },
                        {
                            title: '数量',
                            key: 'entrustcount',
                            render: (h,params)=>{
                                return h("span",Number(params.row.entrustcount).toFixed(10))
                            }
                        },
                        {
                            title: '价格',
                            key: 'tradeprice',
                            render: (h,params)=>{
                                return h("span",Number(params.row.tradeprice).toFixed(10))
                            }
                        },
                        {
                            title: '金额',
                            key: 'entrustamount',
                            render: (h,params)=>{
                                return h("span",Number(params.row.entrustamount).toFixed(10)) 
                            }
                        },
                        {
                            title: '成交量',
                            key: 'tradecount',
                            render: (h,params)=>{
                                return h("span",Number(params.row.tradecount).toFixed(10))
                            }
                        },
                        {
                            title: '成交金额',
                            key: 'tradeamount',
                            render: (h,params)=>{
                                if (params.row.tradeamount && params.row.tradeamount!="null") return  h("span",Number(params.row.tradeamount).toFixed(10))
                                    else return h("span","")
                            }
                        },
                        {
                            title: '手续费',
                            key: 'charge',
                            render: (h,params)=>{
                                if(this.order_record_cloumns_title != "jiaoyijilu"){
                                    return h("span",Number(params.row.charge))
                                }else{
                                    return h("span",Number(params.row.charge))
                                }
                            }
                        },
                        {
                            title: '平均成交价',
                            key: 'averageprice',
                            width:100,
                            render: (h,params)=>{
                                return h("span",Number(params.row.averageprice).toFixed(10))
                            }
                        },
                        {
                            title: "状态",
                            key: 'status',
                            render: (h,params) =>{
                                // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                                if(params.row.status == "1"){
                                    return h("span","已成交")
                                }else if(params.row.status == "3" || params.row.status == "0"){
                                    return  h('div', [
                                                h('Button', {
                                                    props: {
                                                        type: 'primary',
                                                        size: 'small'
                                                    },
                                                    style: {
                                                        marginRight: '5px'
                                                    },
                                                    on: {
                                                        click: () => {
                                                            this.show(params.row)
                                                        }
                                                    }
                                                }, '撤销')
                                            ]);
                                }else if(params.row.status == "2"){
                                    return h("span","已撤销")
                                }else if(params.row.status == "4"){
                                    return  h('span', "部分成交撤销");
                                }
                            }
                        }
                ]

                // if(this.order_record_cloumns_title != "jiaoyijilu"){
                //     this.order_record_cloumns.push(
                //         {
                //             title: this.order_record_cloumns_title,
                //             key: 'status',
                //             render: (h,params) =>{
                //                 // 0:已提交1:成交,2:撤销,3:部分成交,4:部分成交撤销
                //                 if(params.row.status == "1"){
                //                     return h("span","已成交")
                //                 }else if(params.row.status == "3" || params.row.status == "0"){
                //                     return  h('div', [
                //                                 h('Button', {
                //                                     props: {
                //                                         type: 'primary',
                //                                         size: 'small'
                //                                     },
                //                                     style: {
                //                                         marginRight: '5px'
                //                                     },
                //                                     on: {
                //                                         click: () => {
                //                                             this.show(params.row)
                //                                         }
                //                                     }
                //                                 }, '撤销')
                //                             ]);
                //                 }else if(params.row.status == "2"){
                //                     return h("span","已撤销")
                //                 }else if(params.row.status == "4"){
                //                     return  h('span', "部分成交撤销");
                //                 }
                //             }
                //         }
                //     )
                // }
            },
            // 委托列表表头
            weituolist () {
                this.weituo_columns = [
                    {
                        title:"总买入数("+this.jichubizhong+")",
                        key: "totalbuynum",
                        render (h,row){
                            if(row.row.totalbuynum){
                                return h("span",Number(row.row.totalbuynum).toFixed(10));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(10))
                            }
                            
                        }
                    },
                    {
                        title:"平均买入价("+this.jijiabizhong+")",
                        key: "avebuyprice",
                        render (h,row){
                            if(row.row.avebuyprice){
                                return  h("span",Number(row.row.avebuyprice).toFixed(10));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(10))
                            }
                            
                        }
                    },
                    {
                        title:"总卖出数("+this.jichubizhong+")",
                        key: "totalsellnum",
                        render (h,row){
                            if(row.row.totalsellnum){
                                return  h("span",Number(row.row.totalsellnum).toFixed(10));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(10))
                            }
                            
                        }
                    },
                    {
                        title:"平均卖出价("+this.jijiabizhong+")",
                        key: "avesellprice",
                        render (h,row){
                            if(row.row.avesellprice){
                                return  h("span",Number(row.row.avesellprice).toFixed(10));
                            }else{
                                let numb=0;
                                return  h("span",numb.toFixed(10))
                            }
                            
                        }
                    }
                ]
            },
            query_entrust () {
                let that = this;
                that.weituo_data=[];
                that.order_record_data=[];
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbets.do',
                    data: {
                        "currencytype":that.jichubizhong,//币种
                        "starttime":that.begintime[0] ? that.begintime[0] : "",
                        "endtime":that.begintime[1] ? that.begintime[1] : "",
                        "pageno":that.pageno,
                        "pagesize":that.pagesize,
                        "reqresource":"1",
                        "status":"1,2,4",
                        "tradecurrency": that.jijiabizhong
                    }
                })
                .then((response) => {
                    if( response.data.err_code=="1" && response.data && response.data.dealManage){
                        that.weituo_data = [{
                            avebuyprice : response.data.avebuyprice,
                            avesellprice: response.data.avesellprice,
                            totalbuynum: response.data.totalbuynum,
                            totalsellnum: response.data.totalsellnum
                        }]
                        that.order_record_data = response.data.dealManage;
                        
                    }
                    if(response.data && response.data.page && response.data.page.sum){
                        that.total = Number(response.data.page.sum);
                        
                    }
                    that.loading = false;
                    console.log(that.weituo_data)
                    console.log(that.order_record_data)
                })
            },
        }
    }
</script>

<style lang="scss">
    
</style>
