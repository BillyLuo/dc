<template>
<div>
	<div class="blockchain-calculator">
	<div class="center">
		<div class="calculator">
		<img src="/static/img/device-01.png" alt="">
		<div class="box">
			<h3>区块链商品计算器 <RadioGroup v-model="jijia">
				<Radio label="USDT"></Radio>
			</RadioGroup></h3>
			<div class="conversion">
			<ul>
				<li class="li-input">
				<Select v-model="model1" style="width:100%">
					<Option v-for="item in cityList" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname }}</Option>
				</Select>
				</li>
				<li class="li-input">
				<input v-model="value" @input="inputBuyPrice($event,'value')"  class="input-number" style="width: 100%;height:100%; border:none;padding-left:5px;"/>
				<!-- <Input :number="true" v-model="value" placeholder="" style="width: 100%"></Input> -->
				</li>
				<li class="li-icon">
				≈
				</li>
				<li class="li-input">
				<Select v-model="model2" style="width:100%">
					<Option v-for="item in cityList" :value="item.currencyname" :key="item.currencyname">{{ item.currencyname }}</Option>
				</Select>
				</li>
				<li class="li-input">
				<Input v-model="value1" disabled placeholder="" style="width: 100%"></Input>
				</li>
				<li class="li-button">
				<Button @click="zhuanhuan" type="primary">立即转换</Button>
				</li>
			</ul>
			</div>
		</div>
		</div>
	</div>
	<div class="reliable">
		<div class="title">
		<h3>可信赖的区块链商品交易网站</h3>
		<div class="line"></div>
		</div>
		<div class="classification">
		<ul>
			<li>
			<div class="box l1">
				<div class="top">
				<img src="/static/img/aqbz.png" alt="">
				</div>
				<div class="text">
				<h3>安全保障</h3>
				<p>超过10年金融风控经验团队 全方位可定制的安全策略体系</p>
				</div>
			</div>
			</li>
			<li>
			<div class="box l2">
				<div class="top">
				<img src="/static/img/gqkg.png" alt="">
				</div>
				<div class="text">
				<h3>安全保障</h3>
				<p>超过10年金融风控经验团队 全方位可定制的安全策略体系</p>
				</div>
			</div>
			</li>
			<li>
			<div class="box l3">
				<div class="top">
				<img src="/static/img/yhzs.png" alt="">
				</div>
				<div class="text">
				<h3>安全保障</h3>
				<p>超过10年金融风控经验团队 全方位可定制的安全策略体系</p>
				</div>
			</div>
			</li>
			<li>
			<div class="box l4">
				<div class="top">
				<img src="/static/img/zycz.png" alt="">
				</div>
				<div class="text">
				<h3>安全保障</h3>
				<p>超过10年金融风控经验团队 全方位可定制的安全策略体系</p>
				</div>
			</div>
			</li>
		</ul>
		</div>
	</div>
	</div>
</div>
</template>
<script>
var numReg = function (m,n) {
        // m=m.toString();
        // n=n.toString();
        if (!m) {
            m = 15;
        }else if(!m.match(/^[1-9]\d*$/)) {
            m = 15;
        }
        if (!n) {
            n = 10;
        }else if (!n.match(/^[1-9]\d*$/)) {
            n = 10;
        }
        return new RegExp('^(((0(\\.\\d{0,' + n + '})?))|([1-9]\\d{0,'+(m-1)+'}(\\.\\d{0,'+n+'})?))$');
    }
    let i=0;
    var reg = numReg('8','2');
export default {
	
	data () {
	let cityList = [];
	for (let i = 0;i<26;i++){
		cityList.push({
		value: 'ETH'+i,
		label:  'ETH'+i
		})
	}
	return {
		cityList:[],
		jijia:'USDT',
		value: '',
		value1: '',
		model1: 'ETH',
		model2: 'USDT'
	}
	},
	mounted(){
		this.selectCurrency()
	},
	methods:{
		inputBuyPrice(e,priceType){
			var value = e.target.value;
			if (!value) {
				this[priceType] = '';
			}else {
				console.log(reg.test(value))
				if (reg.test(value)) {
					this[priceType] = value;
				}else {
					value = value.slice(0,-1);
					console.log(value)
					var matched = value.match(reg);
					console.log(matched)
					if (matched && matched.length) {
						this[priceType] = matched[0];
					}else {
						this[priceType]  = '';
					}
				}
			}
		},
		selectCurrency(){
			this.cityList = [];
			let that=this;
			this.$ajax({
				method:"post",
				url:"/trade/tps/pbfct.do",
				data:{
					reqresource:1
				}
			}).then((res)=>{
				if(res.data.currencys && res.data.err_code == "1" && res.data){
					res.data.currencys.map((item)=>{
						console.log(item)
						that.cityList.push({
							currencyname:item.currencyname
						})
					})
				}
			})
		},
		zhuanhuan(){
			console.log(this.value);
			console.log(this.model1);
			console.log(this.model2);
			console.log(this.jijia);
			let that = this;
			this.$ajax({
				method:"post",
				url:"/trade/tps/pbccp.do",
				data:{
					currency:that.model1, //币种
					exccurrency:that.model2, //需要兑换的币种
					tradecurrency:that.jijia, //计价币种
					currencynum:that.value.toString(),//数量
					reqresource:1
				}
			}).then((data)=>{
				console.log(data)
				if(data.data && data.status==200 && data.data.err_code == "1"){
					that.value1=data.data.price
				}else{
					that.value1 = ""
				}
			}).catch((err)=>{
				console.log(err)
			})
		}
	}
	
}
</script>
<style lang="scss">
.blockchain-calculator{
	width: 100%;
	padding: 160px 0;
	height: 1000px;
	background: url("/static/img/bg-index-01.jpg");
	background-size: 100% 100%;
	.center{
		.ivu-radio-group{
			margin-left:100px;
		}
		.input-number:focus{
			border:none;
			box-shadow: none;
			-webkit-box-shadow:none;
			outline:0;
		}
		width: 1200px;
		margin: 0 auto;
		margin-bottom: 150px;
		.calculator{
			width: 1100px;
			height: 183px;
			background: #fff;
			position: relative;
			border-top-right-radius: 91px;
			border-bottom-right-radius: 91px;
			margin-left: 100px;
			img{
			position: absolute;
			top:-50px;
			left: -50px;
			}
			.box{
				width: 625px;
				height: 115px;
				position: absolute;
				top: 30px;
				left: 480px;
				h3{
					font-size: 22px;
					margin-bottom: 20px;
					font-weight: 400;
					color: #000;
				}
				.conversion{
					width: 625px;
					.ivu-select-selection{
					border:none;
					height: 38px;
					background: #fafafa;
					.ivu-select-placeholder{
						height: 38px;
						line-height: 40px;
					}
					.ivu-select-selected-value{
						height: 38px;
						line-height: 40px;
						padding-left: 15px;
					}
					}
					.ivu-select-visible .ivu-select-selection{
					box-shadow: none;
					}
					.ivu-input-wrapper.ivu-input-type{
					input.ivu-input{
						height: 38px;
						line-height: 40px;
						background: #fafafa;
						border: none;
					}
					&:focus{
						box-shadow: none;
						-webkit-box-shadow:none
					}
					}
					.ivu-btn.ivu-btn-primary{
					height: 42px;
					}
					li{
					float: left;
					}
					.li-input{
					width: 108px;
					height: 42px;
					background: #fafafa;
					border:1px solid #eee;
					}
					.li-icon{
					width: 62px;
					height: 42px;
					text-align: center;
					line-height: 42px;
					}
				}
			}
		}
	}
	.reliable{
		width: 1200px;
		margin: 0 auto;
		.title{
			width: 100%;
			height: 40px;
			text-align: center;
			margin-bottom: 30px;
			h3{
			margin-bottom: 10px;
			font-size: 20px;
			color: #333;
			font-weight: 400;
			}
			.line{
			width: 30px;
			height: 3px;
			margin: 0 auto;
			background-color: #3166D2;
			}
		}
		.classification{
			width: 100%;
			ul{
				li{
					width: 25%;
					float: left;
					.box{
					width: 80%;
					margin: 0 auto;
					padding: 55px 35px 50px 35px;
					background: #fff;
					border-radius: 5px;
					.top{
						width: 100%;
						margin-bottom: 35px;
						text-align: center;
						img{
						width: 96px;
						height: 96px;
						}
					}
					.text{
						text-align: center;
						width: 100%;
						h3{
						font-size: 16px;
						line-height: 1em;
						color: #000000;
						margin-bottom: 5px;
						font-weight: 400;
						}
						p{
						font-size: 12px;
						color: #999;
						height: 4.2em;
						line-height: 1.4em;
						-webkit-line-clamp: 3;
						}
					}
					}
					.l1{
					box-shadow: 0 17px 47px 0 rgba(57,133,236,.09), -17px 17px 0 rgba(255,255,255,.75);
					}
					.l2{
					box-shadow: 0 17px 47px 0 rgba(73,221,94,.09), -17px 17px 0 rgba(255,255,255,.75);
					}
					.l3{
					box-shadow: 0 17px 47px 0 rgba(173,94,223,.09), -17px 17px 0 rgba(255,255,255,.75);
					}
					.l4{
					box-shadow: 0 17px 47px 0 rgba(253,209,26,.09), -17px 17px 0 rgba(255,255,255,.75);
					}
				}
			}
		}
	}
	.ivu-select-item{
		width:100%;
	}
	.ivu-select:focus .ivu-select-selection {
		
		-webkit-box-shadow: none;
		box-shadow:none;
	}
	.ivu-input:focus {
		
		-webkit-box-shadow: none;
		box-shadow: none;
	}
}
</style>
