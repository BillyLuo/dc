<template>
  <div id="app">
    <Header />
    <div id="main">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/footer.vue';
import store from 'store'
console.log('this is store',store);
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="scss">
  @import url(./index.scss);
  #main {
    padding-top: 20px;
  }
</style>
