<template>
  <div class="title-wrapper">
    <div class="title-inner">
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  props:[
    'text'
  ],
  data () {
    console.log(this);
    return {
      
    }
  }
}
</script>

<style lang="scss">
  .title-wrapper {
    background:#2a2a2a;
    box-shadow:0 2px 4px 0 rgba(0,0,0,0.50);
    height:72px;
    line-height: 72px;
    color: #fff;
    font-size: 18px;
    .title-inner {
      padding: 0 10px;
    }
  }
</style>
