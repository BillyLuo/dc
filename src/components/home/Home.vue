<template>
  <div>
    <HeaderSwiper/>
    <LatestMarket/>
    <BlockchainCalculator/>
    <ChooseUs/>
    <OfficialAnnouncement/>
  </div>
</template>
<script>
  import HeaderSwiper from './headerSwiper';
  import LatestMarket from './LatestMarket';
  import BlockchainCalculator from './BlockchainCalculator'
  import ChooseUs from './chooseUs.vue'
  import OfficialAnnouncement from './OfficialAnnouncement'
  export default {
    data(){
      return{}
    },
    components : {
      HeaderSwiper,
      LatestMarket,
      BlockchainCalculator,
      ChooseUs,
      OfficialAnnouncement
    }
  }
</script>
<style lang="scss">

</style>
