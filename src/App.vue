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
    <div class="contact-us"></div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from './components/Header';
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
  .contact-us {
      position: fixed;
      width: 40px;
      height: 40px;
      background-image: url('/static/img/contact_us.png');
      background-repeat: no-repeat;
      // background-color: #fff;
      background-size: contain;
      z-index: 100;
      bottom: 100px;
      right: 32px;
      cursor: pointer;
  }
</style>
