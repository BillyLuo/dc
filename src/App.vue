<template>
  <div id="app">
    <TitleScroll />
    <Header />
    <div style="margin-top: 150px">
    </div>
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
import TitleScroll from './components/TitleScroll';
import store from 'store';
export default {
  name: 'App',
  components:{
    Header,
    Footer,
    TitleScroll
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
