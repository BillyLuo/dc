
<template>
    <div style="height:29px;">
        <div id="wrapper">
            <div id="scroller">
                <ul>
                    <li v-for="data in dataArry" :key="data" :class="{down:data%2==0?true:false}">
                        <span class="s1">TNT:$</span>
                        <span class="s2">{{data+1}}</span>
                        <span class="s3"></span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    
    
</template>

<script>
    export default {
        data() {
            const dataArrys = [];
            for (let i = 0; i < 27; i ++){
                dataArrys.push(i)
            }
            return{
                dataArry:dataArrys,
            }
        },
        mounted(){
            let sss = new IScroll("#wrapper", { 
                    scrollX: true, scrollY: false, mouseWheel: true
                })
        },
        methods:{

        }
    }
</script>
<style lang="scss">
#wrapper {
	position: fixed;
	z-index: 999;
	top: 0;
	// bottom: 48px;
	left: 0;
    width: 100%;
    height:29px;
	// background: #ccc;
    overflow: hidden;
    min-width: 1200px;
}
#scroller {
	position: absolute;
	z-index: 1;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	width: 4000px;
    height: 29px;
    background: #353535;
	// background-color: #a00;
	-webkit-transform: translateZ(0);
	-moz-transform: translateZ(0);
	-ms-transform: translateZ(0);
	-o-transform: translateZ(0);
	transform: translateZ(0);
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	-webkit-text-size-adjust: none;
	-moz-text-size-adjust: none;
	-ms-text-size-adjust: none;
	-o-text-size-adjust: none;
	text-size-adjust: none;
}
#scroller ul {
	list-style: none;
	padding: 0;
	margin: 0;
	width: 100%;
	height: 29px;
	text-align: center;
}
#scroller li {
	display: block;
	float: left;
	padding:0 25.5px;
	height: 100%;
    font-size: 14px;
    line-height: 29px;
    
    .s1{
        color: #fff;
        padding-right: 10px;
        vertical-align: middle;
    }
    .s2{
        color: #f00;
        padding-right: 10px;
        vertical-align: middle;
    }
    .s3{
        display: inline-block;
        width: 15px;
        height: 15px;
        background: url("/static/img/icon-arrow.png");
        background-position: 0px 0px;
        vertical-align: middle;
    }
}
</style>