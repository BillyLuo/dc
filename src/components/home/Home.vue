<template>
  <div>
    <HeaderSwiper/>
    <LatestMarket/>
    <!-- <BlockchainCalculator/> -->
    <ChooseUs/>
    <OfficialAnnouncement/>
    <OfficialNews/>
  </div>
</template>
<script>
  import bus from '../../bus/bus.js';
  import HeaderSwiper from './headerSwiper';
  import LatestMarket from './LatestMarket';
  import BlockchainCalculator from './BlockchainCalculator'
  import ChooseUs from './chooseUs.vue'
  import OfficialAnnouncement from './OfficialAnnouncement'
  import OfficialNews from './OfficialNews.vue'
  export default {
    data(){
      return{}
    },
    components : {
      HeaderSwiper,
      LatestMarket,
      BlockchainCalculator,
      ChooseUs,
      OfficialAnnouncement,
      OfficialNews
    },
    mounted(){
      console.log(this.$route);
      let isLogined = this.$route.params.isLogined;
      bus.$emit('login',isLogined);
    }
  }
</script>
<style lang="scss">

</style>
