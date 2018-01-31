<template>
  <div>
    <HeaderSwiper/>
    <LatestMarket/>
    <BlockchainCalculator/>
    <ChooseUs/>
    <OfficialAnnouncement/>
    <OfficialNews/>
  </div>
</template>
<script>
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
    }
  }
</script>
<style lang="scss">

</style>
