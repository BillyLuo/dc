<template>
  <div id="app">
    <!--<Header />-->
    <div id="main">
      <router-view/>
    </div>
    <Footer />
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/footer';
import store from 'store';
export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  created(){
    console.log('app created');
  }
}
</script>

<style lang="scss">
  @import './index.scss';
  #main {
    // padding-top: 70px;
  }
</style>
