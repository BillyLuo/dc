<template>
  <div id="app">
    <!-- <TitleScroll /> -->
    <Header />
    <!-- <div style="margin-top: 100px"></div> -->
    <!-- <div> -->
      <!-- <Announcement/> -->
    <!-- </div> -->
    <div id="main">
      <div class="main-inner">
        <router-view/>
      </div>
    </div>
    <!-- <Footer /> -->
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from './components/header';
import Footer from './components/footer';
// import TitleScroll from './components/TitleScroll';
import TitleScroll from './components/home1/titlescroll';
import Announcement from './components/Announcement'
import store from 'store';
import cookies from 'cookies-js';
export default {
  name: 'App',
  components:{
    Header,
    Footer,
    TitleScroll,
    Announcement
  },
  created(){
    // console.log('app created');
    if (cookies.get('name')) {
      this.$store.dispatch('getUserInfo');
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
