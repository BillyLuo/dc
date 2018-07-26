<template>
  <div class="stockdetail">
    <div>
      <Quotation />
    </div>
  </div>
</template>

<script>
import Quotation from '../market/Quotation';
export default {
  name: 'stockDetail',
  components: {
    Quotation
  },
  data () {
    return {

    }
  }
}
</script>

<style>

</style>
