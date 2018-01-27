<template>
  <div id="app">
    <Header />
    <div id="main">
      <router-view/>
    </div>
    <Footer />
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from './components/header/Header';
import Footer from './components/footer';
import store from 'store';
export default {
  name: 'App',
  components:{
    Header,
    Footer
  }
}
</script>

<style lang="scss">
  @import './index.scss';
  #main {
    // padding-top: 70px;
  }
</style>
