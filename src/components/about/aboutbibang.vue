<template>
    <div class="wrapper about-bibang">
        <about></about>
    </div>
</template>

<style lang="scss">
    .about-bibang{
        width: 1000px;
        color:#fff;
        line-height: 30px;
    }
</style>

<script>
import about from './about.md'
    export default {
        components:{
            about
        },
        data() {
            return {
            }
        }
    }
</script>