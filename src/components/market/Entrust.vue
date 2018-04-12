<template>
    <div>
        <div class="trade-time">
            <Button @click="revoke">一键撤销</Button>
        </div>
        <div class="trade-table">
            <!-- <img class='wujilu' src='/static/img/icon-wujilu.png'/><br/> -->
            <Table height="350" :loading="loading" :data="order_record_data2" no-data-text="<span class='tishixinxi'>您暂时没有订单记录</span>" :columns="order_record_cloumns" stripe></Table>
            <div style="margin: 10px;overflow:hidden">
                <div style="float: right;line-height:  40px;height: 40px;">
                    <Page :page-size-opts='[10,20,30,40,50]' :total="total" show-sizer show-elevator show-total placement='top' :page-size='pagesize' :current="pageno" @on-change="changePage2" @on-page-size-change='pagesizes2'></Page>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import {Table,Page} from 'iview';
import bus from '../../bus/bus';
    export default {
        components:{
            Table,Page
        },
        data() {
            return {
                loading:false,
                order_record_data2:[],
                total:0,
                pagesize:10,
                pageno:1,
                order_record_cloumns:[],
                jichubizhong:"",
                jijiabizhong:"",
            }
        },
        created(){
            let that=this;
            bus.$on('vl_currency', (val) => { //Hub接收事件
                if(val){
                    that.jichubizhong = val.currency;
                    that.jijiabizhong = val.bizhong;
                    if(val.wtcx){
                        that.query_entrust2();
                    }
                }
            });
            this.total=0;
            this.pagesize=10;
            this.pageno=1;
        },
        mounted(){
            this.wt_title();
            
        },
        methods:{
            revoke(){//一键撤销
                let that = this;
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>是否确认一键撤销？</p>',
                    onOk: () => {
                        console.log("onOK")
                        that.$ajax({
                            method: "post",
                            url:"/trade/tps/pbceos.do",
                            data:{
                                currencytype:that.jichubizhong,
                                tradecurrency:that.jijiabizhong,
                                reqresource:1
                            }
                        }).then((res)=>{
                            if(res.data && res.data.err_code == "1"){
                                setTimeout(() => {
                                     this.$Modal.success({
                                        content: "撤单成功"
                                    })
                                },300)
                                that.query_entrust2();
                                 bus.$emit("chexiao",{"chexiaowancheng":true})
                            }else {
                                setTimeout(() => {
                                     this.$Modal.error({
                                        content: "撤单失败，"+res.data.msg
                                    })
                                },300)
                            }
                        })
                    }
                });
                
            },
            changePage2(pageno){
                this.loading = true;
                this.pageno = pageno;
                this.query_entrust2();
            },
            pagesizes2(pagesize){
                this.loading = true;
                this.pageno = 1;
                this.pagesize=pagesize;
                this.query_entrust2();
            },
            query_entrust2(currencycode,starttime,endtime){
                this.order_record_data2 = [];
                let that = this;
                this.$ajax({
                    method: 'post',
                    url: '/trade/tps/pbets.do',
                    data: {
                        "currencytype":currencycode ? currencycode : that.jichubizhong,//币种
                        "starttime":starttime ? starttime : "",
                        "endtime":endtime ? endtime:"",
                        "pageno":that.pageno,
                        "pagesize":that.pagesize,
                        "tradecurrency": that.jijiabizhong,
                        "reqresource":"1",
                        "status":"0,3"
                    }
                })
                .then((response) => {
                    if(response.data  && response.data.dealManage ){
                        that.order_record_data2 = response.data.dealManage;
                    }
                    if(response.data && response.data.page && response.data.page.sum){
                        that.total = Number(response.data.page.sum);
                    }
                    that.loading = false;
                })
            },
            wt_title(){
                this.order_record_cloumns =[
                    {
                            title: "委托时间",
                            key: "entrusttime",
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
                            title: "操作",
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
            },
            show(row){//撤单
                console.log(row);
                let that= this;
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '<p>是否确认撤销？</p>',
                    onOk: () => {
                    console.log("onOK")
                        that.$ajax({
                            method: "post",
                            url:"/trade/tps/pbceo.do",
                            data:{
                                "id":row.tradeid,
                                "reqresource":"1"
                            }
                        }).then((res)=>{
                            if (res.status == 200 && res.data && res.data.err_code == '1') {
                                setTimeout(() => {
                                     this.$Modal.success({
                                        content: "撤单成功"
                                    })
                                },300)
                                this.query_entrust2();
                               bus.$emit("chexiao",{"chexiaowancheng":true})
                            }else {
                                setTimeout(() => {
                                     this.$Modal.error({
                                        content: "撤单失败"
                                    })
                                },300)
                            }
                        })
                        
                        
                    }
                });
            },
        }
    }
</script>

<style lang="scss">
    
</style>
