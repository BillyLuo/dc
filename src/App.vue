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
    <div class="contact-us" @click="contact"></div>
    <BackTop></BackTop>
  </div>
</template>

<script>
import Header from './components/Header';
import Footer from './components/footer';
// import TitleScroll from './components/TitleScroll';
import TitleScroll from './components/home/titlescroll';
import Announcement from './components/Announcement'
import store from 'store';
import cookies from 'cookies-js';
import Vue from 'vue';
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
    this.getLang();
  },
  watch:{
    '$i18n.locale':'getLang'
  },
  methods:{
    contact () {
      if (!cookies.get('name')) {
        this.$router.push({
          path:'/login'
        })
        return;
      }
      this.$router.push({
        path:'/assets/cashrecharge'
      })
    },
    getLang(){
      var locale = this.$i18n.locale;
      this.lang = this.$i18n.messages[locale];
      Vue.prototype.lang = this.lang;
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
