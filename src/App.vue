<template>
  <div id="app">
    <Header />
    <div id="main">
      <div class="main-inner">
        <router-view/>
      </div>
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
    padding-top: 70px;
    .main-inner {
      padding: 20px 0;
    }
  }
</style>
