<template>
    <div>
        <div class="jiantou btn-style-1 btn-special-1">{{ first }}</div>
        <div class="jiantou btn-style-2 btn-special-1">{{ second }}</div>
        <div class="jiantou btn-style-3 btn-special-1">{{ third }}</div>
    </div>
</template>

<script>
    export default {
        props:["step"],
        data() {
            return {
                first: this.step[0],
                second: this.step[1],
                third: this.step[2]
            }
        },
        mounted () {
            console.log(this.step)
            
        }
    }
</script>

<style lang="scss">
    .jiantou{
            margin-top: 11px;
            line-height: 32px;
            width:105px;
            height:32px;
            text-align: center;
            position: relative;
            float: left;
        }
        .btn-style-1{
            background: #80A4ED;
            color: #fff;
        }
        .btn-style-2{
            background: #C0D0F0;
            color: #fff;
        }
        .btn-special-1{
            overflow: visible;
            margin-right: 10px;
            margin-left: 10px;
        }
        .btn-special-1:after, .btn-special-1:before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            -webkit-transition: all .6s linear;
            -moz-transition: all .6s linear;
            -ms-transition: all .6s linear;
            transition: all .6s linear;
        }
        .btn-special-1:after, .btn-special-1:before {
            border-left: 20px solid transparent;
            border-top: 16px solid transparent;
            border-bottom: 16px solid transparent;
        }
        .btn-style-1.btn-special-1:before {
            border-bottom-color: #80A4ED;
            border-top-color: #80A4ED;
        }
        .btn-special-1:before {
            right: 100%;
        }
        .btn-special-1:after {
            border-left-color: #80A4ED;
        }
        .btn-special-1:after {
            left: 100%;
        }
        .btn-style-2.btn-special-1:before {
            border-bottom-color: #C0D0F0;
            border-top-color: #C0D0F0;
        }
        .btn-style-2.btn-special-1:after {
            border-left-color: #C0D0F0;
        }
        .btn-style-3 {
            color: #a0b3da;
            background-color: #EAF0FC;
        }
        .btn-style-3.btn-special-1:before {
            border-bottom-color: #EAF0FC;
            border-top-color: #EAF0FC;
        }
        .btn-style-3.btn-special-1:after {
            border-left-color: #EAF0FC;
        }
</style>
