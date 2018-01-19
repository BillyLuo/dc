<template>
  <div id="app">
    <Header />
    <div id="main">
      <div class="wrapper">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import Header from './components/Header';
import store from 'store'
console.log('this is store',store);
export default {
  name: 'App',
  components:{
    Header
  }
}
</script>

<style lang="scss">
  @import url(./index.scss);
  #main {
    padding-top: 20px;
  }
</style>
